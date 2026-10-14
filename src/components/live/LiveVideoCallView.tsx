import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Camera, 
  ShieldAlert, 
  ShieldCheck, 
  Activity, 
  RefreshCw, 
  Sliders, 
  Maximize2, 
  Download, 
  AlertTriangle, 
  Radio, 
  Eye, 
  Volume2, 
  Zap,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  Info
} from 'lucide-react';
import { LiveStreamTelemetry, LiveStreamAnomaly, ForensicCase } from '../../types';
import { generatePulseWave } from '../../services/forensicEngine';

interface LiveVideoCallViewProps {
  onCaptureEvidence: (snapshotData: Partial<ForensicCase>) => void;
  onSendAlert: (title: string, message: string, type: 'alert' | 'warning' | 'info' | 'success') => void;
}

export const LiveVideoCallView: React.FC<LiveVideoCallViewProps> = ({
  onCaptureEvidence,
  onSendAlert,
}) => {
  // Video Source mode: 'simulated' | 'camera'
  const [sourceMode, setSourceMode] = useState<'simulated' | 'camera'>('simulated');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Deepfake Simulation Injection Toggle
  const [isDeepfakeInjected, setIsDeepfakeInjected] = useState(false);
  
  // Media controls
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [showHudOverlays, setShowHudOverlays] = useState(true);
  const [sensitivity, setSensitivity] = useState<'standard' | 'high' | 'ultra'>('high');

  // Video element references
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pulseCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pulse wave animation state
  const [pulsePhase, setPulsePhase] = useState(0);

  // Live telemetry state
  const [telemetry, setTelemetry] = useState<LiveStreamTelemetry>({
    fps: 30,
    resolution: '1080p · 60fps',
    latencyMs: 16,
    currentAuthenticity: 96,
    currentDeepfakeScore: 4,
    pulseBpm: 72,
    blinkRatePerMin: 18,
    lipSyncOffsetMs: 12,
    faceWarpRisk: 5,
    voiceCloneRisk: 3,
    activeAnomalies: [],
  });

  // Simulated subjects
  const [selectedSubject, setSelectedSubject] = useState<'whistleblower' | 'diplomat' | 'executive'>('whistleblower');

  const subjectData = {
    whistleblower: {
      name: 'Dr. Evelyn Aris (Purported Whistleblower)',
      role: 'Former Lead Research Scientist',
      authenticImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
      deepfakeImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      affiliation: 'Anonymous Defense Research Consortium',
    },
    diplomat: {
      name: 'Henri Dubois (Purported Envoy)',
      role: 'Special Trade Negotiator',
      authenticImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
      deepfakeImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
      affiliation: 'Geneva Bilateral Taskforce',
    },
    executive: {
      name: 'Claire Zhang (Corporate Spokesperson)',
      role: 'VP Corporate Relations',
      authenticImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80',
      deepfakeImg: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
      affiliation: 'Silicon Foundry Group',
    }
  };

  // Switch camera when requested
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (sourceMode === 'camera') {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then((s) => {
          stream = s;
          setCameraStream(s);
          setCameraError(null);
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.warn('Webcam permission not granted or available:', err);
          setCameraError('Webcam access was not granted or is unavailable on this device. Reverted to high-fidelity live stream simulation.');
          setSourceMode('simulated');
        });
    } else {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        setCameraStream(null);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [sourceMode]);

  // Periodic telemetry fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase(p => p + 1);

      if (isDeepfakeInjected) {
        // Deepfake injected state: critical telemetry
        setTelemetry({
          fps: 28,
          resolution: '1080p (Spliced)',
          latencyMs: Math.floor(130 + Math.random() * 25),
          currentAuthenticity: Math.floor(8 + Math.random() * 12),
          currentDeepfakeScore: Math.floor(88 + Math.random() * 8),
          pulseBpm: 0, // Absence of real biological pulse
          blinkRatePerMin: 2, // Saccadic freeze
          lipSyncOffsetMs: Math.floor(125 + Math.random() * 30),
          faceWarpRisk: 92,
          voiceCloneRisk: 89,
          activeAnomalies: [
            {
              id: 'anom-1',
              timestamp: 'LIVE',
              type: 'boundary_ghosting',
              severity: 'critical',
              description: 'GAN facial perimeter interpolation artifact detected (3.8px halo)',
              confidence: 94
            },
            {
              id: 'anom-2',
              timestamp: 'LIVE',
              type: 'pulse_absence',
              severity: 'critical',
              description: 'Zero microvascular systolic flush in cheek region of interest (ROI)',
              confidence: 98
            },
            {
              id: 'anom-3',
              timestamp: 'LIVE',
              type: 'audio_phase_jitter',
              severity: 'warning',
              description: 'Lip aperture motion lags audio formants by 138ms (neural vocoder delay)',
              confidence: 87
            }
          ]
        });
      } else {
        // Authentic stream state
        setTelemetry({
          fps: 30,
          resolution: '1080p · 60fps',
          latencyMs: Math.floor(15 + Math.random() * 5),
          currentAuthenticity: Math.floor(95 + Math.random() * 4),
          currentDeepfakeScore: Math.floor(2 + Math.random() * 4),
          pulseBpm: Math.floor(71 + Math.sin(Date.now() / 3000) * 4),
          blinkRatePerMin: Math.floor(17 + Math.random() * 3),
          lipSyncOffsetMs: Math.floor(8 + Math.random() * 8),
          faceWarpRisk: 4,
          voiceCloneRisk: 2,
          activeAnomalies: []
        });
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isDeepfakeInjected]);

  // Render pulse waveform onto Canvas
  useEffect(() => {
    const canvas = pulseCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const points = generatePulseWave(80, isDeepfakeInjected, pulsePhase);
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isDeepfakeInjected ? '#B33927' : '#2E6B47';

    points.forEach((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - (val * height * 0.8 + height * 0.1);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Pulse sweep indicator
    const sweepX = ((pulsePhase * 3) % width);
    ctx.fillStyle = isDeepfakeInjected ? 'rgba(179, 57, 39, 0.4)' : 'rgba(46, 107, 71, 0.4)';
    ctx.fillRect(sweepX, 0, 4, height);
  }, [pulsePhase, isDeepfakeInjected]);

  // Handle Inject Deepfake Toggle
  const handleToggleInjection = () => {
    const nextState = !isDeepfakeInjected;
    setIsDeepfakeInjected(nextState);
    if (nextState) {
      onSendAlert(
        'CRITICAL: Deepfake Infiltration Triggered',
        'Live stream facial boundary anomaly detected. rPPG pulse flatlined and lip-sync offset exceeded 120ms.',
        'alert'
      );
    } else {
      onSendAlert(
        'STREAM RESTORED: Authentic Stream Verified',
        'Human cardiovascular pulse locked. All biometric vectors within biological bounds.',
        'info'
      );
    }
  };

  // Capture instant forensic snapshot
  const handleCaptureSnapshot = () => {
    const currentSubject = subjectData[selectedSubject];
    const newCase: Partial<ForensicCase> = {
      caseNumber: `EGL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: `Live Intercept Snapshot: ${currentSubject.name}`,
      targetSubject: currentSubject.name,
      sourceContext: `Captured during real-time video interview feed (${sourceMode === 'camera' ? 'Direct Webcam Feed' : 'Encrypted WebRTC Session'}).`,
      mediaType: 'live_stream',
      status: isDeepfakeInjected ? 'deepfake_confirmed' : 'verified_authentic',
      threatLevel: isDeepfakeInjected ? 'critical' : 'safe',
      dateCreated: new Date().toISOString().replace('T', ' ').substring(0, 19),
      lastModified: new Date().toISOString().replace('T', ' ').substring(0, 19),
      investigator: 'Elena Rostova',
      organization: 'ICIJ Investigations',
      sha256: '9f82a' + Math.random().toString(16).substring(2, 10).padEnd(59, 'e4'),
      thumbnailUrl: isDeepfakeInjected ? currentSubject.deepfakeImg : currentSubject.authenticImg,
      metrics: {
        authenticityScore: telemetry.currentAuthenticity,
        deepfakeProbability: telemetry.currentDeepfakeScore,
        ganArtifacts: telemetry.faceWarpRisk,
        blinkAnomalyRate: telemetry.blinkRatePerMin < 5 ? 90 : 10,
        rppgPulseSync: telemetry.pulseBpm > 0 ? 94 : 5,
        phonemeDesyncMs: telemetry.lipSyncOffsetMs,
        audioVocoderSynth: telemetry.voiceCloneRisk,
        compressionDiscontinuity: isDeepfakeInjected ? 88 : 6,
        metadataAltered: isDeepfakeInjected,
        tamperedFramesCount: isDeepfakeInjected ? 210 : 0,
        totalFramesAnalyzed: 300
      },
      keyFindings: isDeepfakeInjected ? [
        'Captured frame demonstrates 3.8px boundary blur along jawline typical of latent head-swap generators.',
        'Micro-vascular pulse extraction registered zero harmonic blood volume variation.',
        'Phoneme synchronization latency registered at 138ms during verbal test questions.'
      ] : [
        'Unbroken rPPG pulse rhythm observed matching 72 BPM resting heart rate.',
        'Natural corneal specular reflections match ambient environment bounce.',
        'Lip-sync audio envelope aligns within 12ms tolerance bounds.'
      ],
      anomaliesDetected: isDeepfakeInjected ? [
        'Facial boundary GAN interpolation artifact',
        'Biological pulse absence (rPPG flatline)',
        'Lip-sync phoneme latency breach (+138ms)'
      ] : [],
      chainOfCustody: [
        {
          id: 'coc-snap-1',
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          actor: 'Elena Rostova',
          role: 'Lead Investigative Journalist',
          action: 'Live Frame Capture & Cryptographic Lock',
          sha256: '9f82a' + Math.random().toString(16).substring(2, 10).padEnd(59, 'e4'),
          details: 'Real-time telemetry freeze captured directly from live video inspector.'
        }
      ],
      annotations: [
        {
          id: 'ann-snap-1',
          author: 'Elena Rostova',
          note: isDeepfakeInjected 
            ? 'Subject face froze for 1.2s while audio continued speaking smoothly. High probability of AI avatar substitution.' 
            : 'Subject exhibited natural pupil dilation and verified micro-expressions.',
          flagType: isDeepfakeInjected ? 'tamper' : 'verified',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }
      ],
      verifiedBy: isDeepfakeInjected ? 'Evidence Guide Live Engine' : 'Elena Rostova',
      verificationVerdict: isDeepfakeInjected ? 'CONFIRMED SYNTHETIC DEEPFAKE INFILTRATION' : 'VERIFIED AUTHENTIC INTERVIEWEE'
    };

    onCaptureEvidence(newCase);
    onSendAlert(
      'Evidence Frame Locked',
      `Snapshot from live session added to Case Dossier #${newCase.caseNumber}. SHA-256 hash registered.`,
      'success'
    );
  };

  const currentSubject = subjectData[selectedSubject];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Bar: Feed Header & Live HUD Mode */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E6DFD2] dark:border-[#2A2E25]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded bg-[#FAF7F0] dark:bg-[#232720] border border-[#E6DFD2] dark:border-[#2F342B] text-[#234B38] dark:text-[#DE805E] font-medium">
              <Radio className="w-3.5 h-3.5 text-[#C87552] animate-pulse" />
              SESSION #7728 · ENCRYPTED WEBRTC
            </span>
            <span className="text-xs text-[#6B7265] dark:text-[#9DA396]">
              {telemetry.resolution} · {telemetry.fps} FPS
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D3029] dark:text-[#ECEAE4] mt-1 font-editorial">
            Live Video-Call Deepfake Inspector
          </h1>
        </div>

        {/* Top Controls: Feed Selector & Simulation Injection */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Feed source buttons */}
          <div className="flex items-center p-1 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19]">
            <button
              onClick={() => setSourceMode('simulated')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                sourceMode === 'simulated'
                  ? 'bg-[#234B38] text-white shadow-2xs'
                  : 'text-[#6B7265] dark:text-[#9DA396] hover:text-[#2D3029] dark:hover:text-[#ECEAE4]'
              }`}
            >
              Simulated Feed
            </button>
            <button
              onClick={() => setSourceMode('camera')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                sourceMode === 'camera'
                  ? 'bg-[#234B38] text-white shadow-2xs'
                  : 'text-[#6B7265] dark:text-[#9DA396] hover:text-[#2D3029] dark:hover:text-[#ECEAE4]'
              }`}
            >
              My Webcam
            </button>
          </div>

          {/* Simulate Deepfake Switch */}
          <button
            onClick={handleToggleInjection}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium text-xs transition-all shadow-xs ${
              isDeepfakeInjected
                ? 'bg-[#B33927] hover:bg-[#993020] text-white animate-pulse'
                : 'bg-[#C87552] hover:bg-[#b46543] text-white'
            }`}
            title="Inject simulated AI face-swap and cloned voice to test forensic alert response"
          >
            <Zap className="w-4 h-4 text-amber-200" />
            <span>
              {isDeepfakeInjected ? 'Deepfake Active (Click to Revert)' : 'Simulate Deepfake Infiltration'}
            </span>
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="p-3 rounded-lg border border-[#C97A1E]/30 bg-[#C97A1E]/10 text-xs text-[#C97A1E] dark:text-[#E29332] flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Main Grid: Live Video Screen (Left 2/3) + Real-time Biometric Dials (Right 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Video Display & HUD Frame */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-[#E6DFD2] dark:border-[#2F342B] bg-[#10120F] shadow-lg flex items-center justify-center">
            {/* Background Stream Visual */}
            {sourceMode === 'camera' ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={isDeepfakeInjected ? currentSubject.deepfakeImg : currentSubject.authenticImg}
                alt={currentSubject.name}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isDeepfakeInjected ? 'hue-rotate-15 contrast-110 saturate-125' : ''
                }`}
              />
            )}

            {/* Simulated HUD Overlay Grid */}
            {showHudOverlays && (
              <div className="absolute inset-0 pointer-events-none hud-grid flex flex-col justify-between p-4 sm:p-6 text-white font-mono">
                {/* Top Overlay Stats */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1 bg-black/60 backdrop-blur-xs p-2 rounded border border-white/10 text-[10px]">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <div className={`w-2 h-2 rounded-full ${isDeepfakeInjected ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
                      <span>{isDeepfakeInjected ? 'ANOMALOUS STREAM DETECTED' : 'BIOMETRIC LOCK: ACTIVE'}</span>
                    </div>
                    <div className="text-white/70">
                      SUBJ: {currentSubject.name.split(' (')[0]}
                    </div>
                    <div className="text-white/70">
                      LATENCY: {telemetry.latencyMs}ms · ENCRYPT: AES-256
                    </div>
                  </div>

                  <div className={`p-2 rounded border font-bold text-xs ${
                    isDeepfakeInjected 
                      ? 'bg-red-950/80 border-red-500 text-red-200 animate-pulse' 
                      : 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  }`}>
                    {isDeepfakeInjected ? (
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span>DEEPFAKE DETECTED ({telemetry.currentDeepfakeScore}%)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>AUTHENTIC ({telemetry.currentAuthenticity}%)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Center Face Target Reticle & Mesh Overlay */}
                <div className="self-center relative w-56 h-64 border-2 rounded-2xl flex flex-col justify-between p-2 transition-colors duration-300"
                  style={{
                    borderColor: isDeepfakeInjected ? '#B33927' : 'rgba(46, 107, 71, 0.7)',
                    backgroundColor: isDeepfakeInjected ? 'rgba(179, 57, 39, 0.12)' : 'transparent',
                    boxShadow: isDeepfakeInjected ? '0 0 25px rgba(179, 57, 39, 0.4)' : 'none'
                  }}
                >
                  {/* Landmark points simulation */}
                  <div className="flex justify-between text-[9px] text-white/60">
                    <span>ROI: FOREHEAD [rPPG]</span>
                    <span>PUPIL SACCADE</span>
                  </div>

                  {isDeepfakeInjected && (
                    <div className="bg-red-600/90 text-white text-[10px] font-bold text-center py-1 rounded shadow-md uppercase tracking-wider">
                      GAN Boundary Mismatch (3.8px)
                    </div>
                  )}

                  <div className="flex justify-between text-[9px] text-white/60">
                    <span>LIP PHONEME TRACK</span>
                    <span>JAW CONTOUR</span>
                  </div>
                </div>

                {/* Bottom Real-time Telemetry Strip */}
                <div className="flex items-end justify-between bg-black/60 backdrop-blur-xs p-2.5 rounded border border-white/10 text-[10px]">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-white/60">HEART FLUSH (rPPG)</div>
                      <div className={`font-bold ${isDeepfakeInjected ? 'text-red-400' : 'text-emerald-400'}`}>
                        {isDeepfakeInjected ? '0 BPM (ABSENT)' : `${telemetry.pulseBpm} BPM`}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/60">BLINK RATE</div>
                      <div className={`font-bold ${isDeepfakeInjected ? 'text-red-400' : 'text-emerald-400'}`}>
                        {telemetry.blinkRatePerMin}/min {isDeepfakeInjected ? '(FROZEN)' : '(NORMAL)'}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/60">LIP-SYNC OFFSET</div>
                      <div className={`font-bold ${isDeepfakeInjected ? 'text-red-400' : 'text-emerald-400'}`}>
                        +{telemetry.lipSyncOffsetMs}ms {isDeepfakeInjected ? '(ANOMALY)' : ''}
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-white/70">
                    MODEL: EGL-DISCRIMINATOR v4.2
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Media Stream Control Bar */}
          <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                  isMuted 
                    ? 'border-[#B33927] bg-[#B33927]/10 text-[#B33927]' 
                    : 'border-[#E6DFD2] dark:border-[#2F342B] text-[#2D3029] dark:text-[#ECEAE4] hover:bg-[#FAF7F0] dark:hover:bg-[#232720]'
                }`}
                title={isMuted ? 'Unmute Audio Stream' : 'Mute Audio Stream'}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setShowHudOverlays(!showHudOverlays)}
                className={`px-3 py-2 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  showHudOverlays
                    ? 'border-[#234B38] bg-[#234B38]/10 text-[#234B38] dark:text-[#3C7054]'
                    : 'border-[#E6DFD2] dark:border-[#2F342B] text-[#6B7265] dark:text-[#9DA396]'
                }`}
                title="Toggle HUD Forensic Overlays"
              >
                <Eye className="w-4 h-4" />
                <span>{showHudOverlays ? 'HUD Active' : 'HUD Hidden'}</span>
              </button>

              {/* Subject Switcher for Simulated Mode */}
              {sourceMode === 'simulated' && (
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value as any)}
                  className="px-2.5 py-2 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#232720] text-xs text-[#2D3029] dark:text-[#ECEAE4] outline-hidden cursor-pointer"
                >
                  <option value="whistleblower">Subject: Dr. Evelyn Aris (Defense)</option>
                  <option value="diplomat">Subject: Henri Dubois (Trade Envoy)</option>
                  <option value="executive">Subject: Claire Zhang (Foundry VP)</option>
                </select>
              )}
            </div>

            {/* Primary Action: Capture Evidence Snapshot */}
            <button
              onClick={handleCaptureSnapshot}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#234B38] hover:bg-[#1b3b2c] text-white font-medium text-xs transition-all shadow-xs active:scale-98"
              title="Freeze current high-res frame with SHA-256 hash and append to Case Dossier"
            >
              <Camera className="w-4 h-4 text-[#DE805E]" />
              <span>Capture Forensic Snapshot</span>
            </button>
          </div>
        </div>

        {/* Right Telemetry Column: Biometric Indicators */}
        <div className="space-y-4">
          {/* Card 1: rPPG Photoplethysmography Waveform */}
          <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6DFD2]/60 dark:border-[#2F342B]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C87552]" />
                <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#2D3029] dark:text-[#ECEAE4]">
                  rPPG Pulse Waveform
                </h3>
              </div>
              <span className={`text-[11px] font-mono font-bold ${isDeepfakeInjected ? 'text-[#B33927] dark:text-[#E0533C]' : 'text-[#2E6B47] dark:text-[#438D62]'}`}>
                {isDeepfakeInjected ? 'FLATLINE (0 BPM)' : `${telemetry.pulseBpm} BPM`}
              </span>
            </div>

            <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396] leading-relaxed">
              Biological systolic blood volume variations in facial dermis. Deepfakes generate zero genuine cardiac micro-flush.
            </p>

            <div className="h-16 w-full rounded-lg bg-[#FAF7F0] dark:bg-[#151714] border border-[#E6DFD2] dark:border-[#2F342B] p-1 overflow-hidden flex items-center justify-center">
              <canvas
                ref={pulseCanvasRef}
                width={260}
                height={55}
                className="w-full h-full block"
              />
            </div>
          </div>

          {/* Card 2: Multi-Vector Breakdown */}
          <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6DFD2]/60 dark:border-[#2F342B]">
              <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#2D3029] dark:text-[#ECEAE4]">
                Biometric Vector Gauges
              </h3>
              <span className="text-[10px] font-mono text-[#6B7265] dark:text-[#9DA396]">Realtime</span>
            </div>

            {/* Gauge 1: GAN Boundary Blur */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6B7265] dark:text-[#9DA396]">GAN Edge Blending:</span>
                <span className={`font-mono font-medium ${telemetry.faceWarpRisk > 50 ? 'text-[#B33927]' : 'text-[#2E6B47]'}`}>
                  {telemetry.faceWarpRisk}% Risk
                </span>
              </div>
              <div className="w-full bg-[#E6DFD2] dark:bg-[#2F342B] h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    telemetry.faceWarpRisk > 50 ? 'bg-[#B33927]' : 'bg-[#2E6B47]'
                  }`} 
                  style={{ width: `${telemetry.faceWarpRisk}%` }} 
                />
              </div>
            </div>

            {/* Gauge 2: Audio-Visual LipSync */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6B7265] dark:text-[#9DA396]">Phoneme Offset:</span>
                <span className={`font-mono font-medium ${telemetry.lipSyncOffsetMs > 80 ? 'text-[#B33927]' : 'text-[#2E6B47]'}`}>
                  +{telemetry.lipSyncOffsetMs}ms
                </span>
              </div>
              <div className="w-full bg-[#E6DFD2] dark:bg-[#2F342B] h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    telemetry.lipSyncOffsetMs > 80 ? 'bg-[#B33927]' : 'bg-[#2E6B47]'
                  }`} 
                  style={{ width: `${Math.min(100, (telemetry.lipSyncOffsetMs / 150) * 100)}%` }} 
                />
              </div>
            </div>

            {/* Gauge 3: Neural Vocoder Probability */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6B7265] dark:text-[#9DA396]">Synthetic Voiceprint:</span>
                <span className={`font-mono font-medium ${telemetry.voiceCloneRisk > 50 ? 'text-[#B33927]' : 'text-[#2E6B47]'}`}>
                  {telemetry.voiceCloneRisk}% Clone Risk
                </span>
              </div>
              <div className="w-full bg-[#E6DFD2] dark:bg-[#2F342B] h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    telemetry.voiceCloneRisk > 50 ? 'bg-[#B33927]' : 'bg-[#2E6B47]'
                  }`} 
                  style={{ width: `${telemetry.voiceCloneRisk}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Card 3: Active Live Anomalies Feed */}
          <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-[#2D3029] dark:text-[#ECEAE4] pb-2 border-b border-[#E6DFD2]/60 dark:border-[#2F342B]">
              Active Stream Flags ({telemetry.activeAnomalies.length})
            </h3>

            {telemetry.activeAnomalies.length === 0 ? (
              <div className="p-4 rounded-lg bg-[#FAF7F0] dark:bg-[#232720] border border-[#E6DFD2] dark:border-[#2F342B] text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#2E6B47] dark:text-[#438D62] mx-auto" />
                <div className="text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4]">
                  Zero Anomalies Detected
                </div>
                <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">
                  Stream matches verified biological baseline. Safe for live broadcast.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {telemetry.activeAnomalies.map((anom) => (
                  <div 
                    key={anom.id}
                    className="p-2.5 rounded-lg border border-[#B33927]/30 bg-[#B33927]/10 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[#B33927] dark:text-[#E0533C] font-semibold text-[11px]">
                      <span>{anom.type.replace('_', ' ').toUpperCase()}</span>
                      <span className="font-mono">{anom.confidence}% CONF</span>
                    </div>
                    <p className="text-[11px] text-[#2D3029] dark:text-[#ECEAE4] leading-tight">
                      {anom.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
