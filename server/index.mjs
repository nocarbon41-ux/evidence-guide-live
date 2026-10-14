import 'dotenv/config';
import { createHmac, randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { ExpressPeerServer } from 'peer';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const app = express();
const server = createServer(app);
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';
const peerMountPath = normalizePath(process.env.PEER_MOUNT_PATH || '/peer');
const staticDirectory = resolve(projectRoot, 'dist');
const turnUrls = (process.env.TURN_URLS || '').split(',').map((url) => url.trim()).filter(Boolean);
const turnSharedSecret = process.env.TURN_SHARED_SECRET || '';
const configuredTtl = Number.parseInt(process.env.TURN_CREDENTIAL_TTL_SECONDS || '600', 10);
const credentialTtlSeconds = Number.isFinite(configuredTtl) ? Math.min(3600, Math.max(60, configuredTtl)) : 600;

function normalizePath(value) {
  const trimmed = value.trim().replace(/^\/+|\/+$/g, '');
  if (!trimmed || trimmed.includes('..') || trimmed.includes('?') || trimmed.includes('#')) {
    throw new Error('PEER_MOUNT_PATH must be a simple non-root path such as /peer.');
  }
  return `/${trimmed}`;
}

if (turnUrls.length && !turnSharedSecret) {
  throw new Error('TURN_URLS is set but TURN_SHARED_SECRET is missing. Use your TURN provider shared secret.');
}

app.disable('x-powered-by');
app.get('/healthz', (_req, res) => res.status(200).json({ status: 'ok' }));
app.get('/api/rtc-config', (_req, res) => {
  res.set('Cache-Control', 'no-store, private');
  const iceServers = [{ urls: (process.env.STUN_URLS || 'stun:stun.l.google.com:19302').split(',').map((url) => url.trim()).filter(Boolean) }];

  if (turnUrls.length) {
    const expiresAt = Math.floor(Date.now() / 1000) + credentialTtlSeconds;
    const username = `${expiresAt}:${randomUUID()}`;
    const credential = createHmac('sha1', turnSharedSecret).update(username).digest('base64');
    iceServers.push({ urls: turnUrls, username, credential });
  }

  res.json({ peerPath: peerMountPath, iceServers });
});

const peerServer = ExpressPeerServer(server, {
  path: '/',
  allow_discovery: false,
  concurrent_limit: Number.parseInt(process.env.PEER_CONCURRENT_LIMIT || '250', 10),
  proxied: process.env.PEER_TRUST_PROXY === 'true',
});
app.use(peerMountPath, peerServer);

app.use(express.static(staticDirectory, { index: false, fallthrough: true, maxAge: '1h' }));
app.get('*', (_req, res) => {
  res.sendFile(resolve(staticDirectory, 'index.html'), (error) => {
    if (error && !res.headersSent) res.status(503).send('Frontend build is missing. Run npm run build first.');
  });
});

server.listen(port, host, () => {
  console.log(`Evidence Guide Live signaling and web server listening on ${host}:${port}`);
  console.log(`PeerJS signaling mounted at ${peerMountPath}; TURN ${turnUrls.length ? 'enabled' : 'not configured (STUN only)'}`);
});

const shutdown = () => server.close(() => process.exit(0));
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
