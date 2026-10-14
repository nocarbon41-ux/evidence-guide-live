# Evidence Guide Live

![Evidence Guide Live banner](public/evidence-guide-banner.png)

Real-time deepfake detection and media verification suite for investigative journalists and live interview vetting.

## Run locally

**Prerequisites:** Node.js 22 or newer.

```bash
npm install
npm run dev
```

Vite serves the app at <http://localhost:3000>.

For local WebRTC signaling, start the signaling server in a second terminal:

```bash
npm run dev:server
```

The Vite dev server proxies `/peer` WebSocket traffic and `/api/rtc-config` to that server.

## Validate and build

```bash
npm run lint
npm run build
```

The production build is written to `dist/`.

## Configuration

The provided `.env.example` documents app settings. Never commit live credentials. Copy only variables required by your own deployment into an ignored `.env.local` file; the repository's `.gitignore` excludes environment files.

## Signaling and cross-network calls

The production server serves the frontend, PeerJS signaling, and RTC configuration from the same HTTPS origin. Build and run it with:

```bash
npm ci
npm run build
npm start
```

Or build the provided container with `docker build -t evidence-guide-live .` and run it on a public HTTPS host. Keep `/peer` WebSocket upgrades enabled at any reverse proxy. Set `PORT` to the platform-provided port.

Signaling brokers peer IDs and SDP/ICE messages; video/audio still use WebRTC peer-to-peer. Signaling alone cannot guarantee connectivity through symmetric NATs, VPNs, or restrictive firewalls. For reliable cross-network calls, configure a TURN provider with **static-auth-secret / REST HMAC-SHA1 credentials**: set `TURN_URLS` (comma-separated `turn:` URLs) and `TURN_SHARED_SECRET` only in the private server environment. The server mints short-lived credentials (`TURN_CREDENTIAL_TTL_SECONDS`, 60–3600 seconds; default 600) at `GET /api/rtc-config`. Optional `STUN_URLS` overrides the public default STUN endpoint. Do not expose the TURN shared secret in `VITE_*` variables or ship it to the browser.

## Included features

- Forensic analysis dashboard and case dossiers
- Media upload and live-call evidence capture workflows
- Case reports, notifications, and admin monitoring views
- Light and dark themes

## Live interview calls

Open **Live Interview Vet → New Secure Video Call**, allow camera and microphone access, and copy the generated invitation link. The guest opens the link, enters a display name, and joins from a camera-enabled browser. Invite links are bearer credentials: share them only with the intended participant. Calls use the app's self-hosted PeerJS signaling endpoint and browser WebRTC media. Deployment over HTTPS is required for camera and microphone permissions; cross-network relay setup is described under [Signaling and cross-network calls](#signaling-and-cross-network-calls).

The call section displays the remote participant's video but does **not** run an automated deepfake classifier. Existing forensic scores elsewhere in the demo are simulated and are not a verdict on the call participant.
