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

## Validate and build

```bash
npm run lint
npm run build
```

The production build is written to `dist/`.

## Configuration

The provided `.env.example` documents the original Gemini and app URL placeholders. Never commit live credentials. Copy only variables required by your own deployment into an ignored `.env.local` file; the repository's `.gitignore` excludes environment files.

## Included features

- Forensic analysis dashboard and case dossiers
- Media upload and live-call evidence capture workflows
- Case reports, notifications, and admin monitoring views
- Light and dark themes
