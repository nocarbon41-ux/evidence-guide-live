import { ForensicCase, UserProfile, AuditLogItem, SystemNotification } from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr-1',
    name: 'Elena Rostova',
    email: 'e.rostova@icij-investigations.org',
    role: 'lead_journalist',
    organization: 'International Consortium of Investigative Journalists (ICIJ)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    securityClearance: 'Level 2 - Forensic Specialist',
    pgpKeyId: '0x8F94B2C8912A3E4D',
    activeSessions: 2,
    lastLogin: '10 mins ago'
  },
  {
    id: 'usr-2',
    name: 'Dr. Marcus Vance',
    email: 'm.vance@reuters-factcheck.com',
    role: 'forensic_analyst',
    organization: 'Reuters Digital Verification Unit',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    securityClearance: 'Level 3 - Chief Verification Officer',
    pgpKeyId: '0x4D72A1B930FC7E18',
    activeSessions: 1,
    lastLogin: 'Just now'
  },
  {
    id: 'usr-3',
    name: 'Sarah Chen',
    email: 's.chen@pressdefense.net',
    role: 'newsroom_admin',
    organization: 'Global Media Forensic Standards Board',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    securityClearance: 'Level 3 - Chief Verification Officer',
    pgpKeyId: '0x1C88E3992FA044B2',
    activeSessions: 3,
    lastLogin: '25 mins ago'
  }
];

export const INITIAL_CASES: ForensicCase[] = [
  {
    id: 'case-001',
    caseNumber: 'EGL-2026-0842',
    title: 'Live Press Interview: Purported Whistleblower on Autonomous Defense Systems',
    targetSubject: 'Anonymous Ex-Contractor "Vector-7"',
    sourceContext: 'Live Encrypted Video Call arranged via Signal for an exclusive investigative broadcast.',
    mediaType: 'live_stream',
    status: 'deepfake_confirmed',
    threatLevel: 'critical',
    dateCreated: '2026-10-14 04:12:00',
    lastModified: '2026-10-14 05:08:00',
    investigator: 'Elena Rostova',
    organization: 'ICIJ Investigations',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    metrics: {
      authenticityScore: 12,
      deepfakeProbability: 94,
      ganArtifacts: 91,
      blinkAnomalyRate: 88,
      rppgPulseSync: 14,
      phonemeDesyncMs: 142,
      audioVocoderSynth: 89,
      compressionDiscontinuity: 86,
      metadataAltered: true,
      tamperedFramesCount: 1420,
      totalFramesAnalyzed: 1800
    },
    keyFindings: [
      'Facial perimeter boundary reveals 3.4-pixel boundary blur typical of Real-Time Latent Diffusion head-swap models.',
      'Photoplethysmography (rPPG) vascular pulse analysis demonstrates zero correlation with human cardiovascular systolic peak.',
      'Audio analysis isolated phase-vocoder spectral gaps at 3.2 kHz indicative of neural voice synthesis (cloned voiceprint).',
      'Eye-blink saccades are frozen for 38 consecutive seconds, which violates physiological ocular baseline.'
    ],
    anomaliesDetected: [
      'Facial boundary blending artifacts along jawline and earlobe margin.',
      'Severe lip-sync phoneme lag (142ms delay relative to audio envelope).',
      'Absent pupil dilation reflex under dynamic screen illumination change.',
      'Neural vocoder harmonic distortion in sibilant consonants (/s/, /z/).'
    ],
    chainOfCustody: [
      {
        id: 'coc-1',
        timestamp: '2026-10-14 04:12:00',
        actor: 'Elena Rostova',
        role: 'Lead Investigative Journalist',
        action: 'Stream Ingestion & Session Lock',
        sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        details: 'Intercepted raw WebRTC media stream from encrypted peer connection session #7728.'
      },
      {
        id: 'coc-2',
        timestamp: '2026-10-14 04:25:30',
        actor: 'Evidence Guide AI Realtime Engine',
        role: 'Automated Neural Scanner',
        action: 'Telemetry Flag Triggered',
        sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        details: 'Confidence threshold breached: Deepfake probability reached 94% with audio desync.'
      },
      {
        id: 'coc-3',
        timestamp: '2026-10-14 04:45:10',
        actor: 'Dr. Marcus Vance',
        role: 'Forensic Digital Analyst',
        action: 'Manual Spectral Verification',
        sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
        details: 'Confirmed synthesized voice model and spatial blending boundary mismatch. Case flagged as Deepfake Infiltration.'
      }
    ],
    annotations: [
      {
        id: 'ann-1',
        timestamp: '00:03:14',
        author: 'Elena Rostova',
        note: 'When asked about specific base location, interviewee head motion snapped unnaturally by 18 degrees.',
        flagType: 'anomaly',
        createdAt: '2026-10-14 04:30:00'
      },
      {
        id: 'ann-2',
        timestamp: '00:07:42',
        author: 'Dr. Marcus Vance',
        note: 'Spectral fingerprint confirms model architecture corresponds to Open-Voice v2 fine-tuned clone.',
        flagType: 'tamper',
        createdAt: '2026-10-14 04:52:00'
      }
    ],
    verifiedBy: 'Dr. Marcus Vance (Reuters Verification)',
    verificationVerdict: 'CONFIRMED SYNTHETIC DEEPFAKE. DO NOT BROADCAST.'
  },
  {
    id: 'case-002',
    caseNumber: 'EGL-2026-0839',
    title: 'Viral Video Clip: Finance Minister Purported Currency Devaluation Remarks',
    targetSubject: 'Minister Henri Dubois',
    sourceContext: 'Circulated on Telegram channels 2 hours before Asian stock exchange opening.',
    mediaType: 'video',
    status: 'morphed_detected',
    threatLevel: 'high',
    dateCreated: '2026-10-13 18:30:00',
    lastModified: '2026-10-14 02:15:00',
    investigator: 'Dr. Marcus Vance',
    organization: 'Reuters Digital Verification Unit',
    sha256: '3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    metrics: {
      authenticityScore: 28,
      deepfakeProbability: 82,
      ganArtifacts: 79,
      blinkAnomalyRate: 45,
      rppgPulseSync: 65,
      phonemeDesyncMs: 110,
      audioVocoderSynth: 84,
      compressionDiscontinuity: 78,
      metadataAltered: true,
      tamperedFramesCount: 420,
      totalFramesAnalyzed: 1250
    },
    keyFindings: [
      'Original speech from EU summit in Brussels was spliced: mouth cavity and lower jaw were re-rendered using Wav2Lip neural generator.',
      'Upper facial micro-expressions and shoulder movements match the authentic 2024 footage.',
      'Spliced audio features pitch quantization spikes every 250ms.',
      'Temporal frame differencing exposes double-compression macroblocks between seconds 04.2 and 16.8.'
    ],
    anomaliesDetected: [
      'Isolated mouth-region pixel variance incompatible with surrounding cheek texture.',
      'Missing teeth occlusion during labiodental consonants (/f/, /v/).',
      'Micro-flicker on chin contour during rapid phonetic transitions.'
    ],
    chainOfCustody: [
      {
        id: 'coc-201',
        timestamp: '2026-10-13 18:30:00',
        actor: 'Dr. Marcus Vance',
        role: 'Forensic Digital Analyst',
        action: 'Ingestion from OSINT Channel',
        sha256: '3a7bd3e2360a3d29eea436fcfb7e44c735d117c42d1c1835420b6b9942dd4f1b',
        details: 'Downloaded MP4 container from Telegram wire @global_market_leaks.'
      },
      {
        id: 'coc-202',
        timestamp: '2026-10-13 19:15:00',
        actor: 'Dr. Marcus Vance',
        role: 'Forensic Digital Analyst',
        action: 'Frame-by-Frame Optical Flow Decomposition',
        sha256: '2c5a0832f91f32a7620d43a131b79e504e926ae79d67a149c4501a3cfb554b50',
        details: 'Discovered source video match on European Commission Archives recorded May 14, 2024.'
      }
    ],
    annotations: [
      {
        id: 'ann-201',
        timestamp: '00:08:12',
        author: 'Dr. Marcus Vance',
        note: 'Audio altered to say "indefinite freeze on international transfers" over original audio discussing standard interest rate bounds.',
        flagType: 'tamper',
        createdAt: '2026-10-13 19:40:00'
      }
    ],
    verifiedBy: 'Dr. Marcus Vance',
    verificationVerdict: 'SELECTIVE MORPH / DEEPFAKE LIP-SYNC RE-ENACTMENT DETECTED.'
  },
  {
    id: 'case-003',
    caseNumber: 'EGL-2026-0831',
    title: 'Leaked Diplomatic Accord: Disputed Energy Pipeline Concession Treaty',
    targetSubject: 'Ministry of Foreign Affairs & Consortium Execs',
    sourceContext: 'Classified PDF provided to investigative desk claiming secret renegotiation terms.',
    mediaType: 'pdf',
    status: 'morphed_detected',
    threatLevel: 'high',
    dateCreated: '2026-10-12 11:20:00',
    lastModified: '2026-10-13 15:40:00',
    investigator: 'Elena Rostova',
    organization: 'ICIJ Investigations',
    sha256: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    thumbnailUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=600&q=80',
    metrics: {
      authenticityScore: 35,
      deepfakeProbability: 72,
      ganArtifacts: 64,
      blinkAnomalyRate: 0,
      rppgPulseSync: 0,
      phonemeDesyncMs: 0,
      audioVocoderSynth: 0,
      compressionDiscontinuity: 88,
      metadataAltered: true
    },
    keyFindings: [
      'Document structure shows PDF was re-saved in Acrobat Distiller with modified font metrics on Page 4 Paragraph 3.',
      'Ministerial signature vector is a mathematically identical clone of a publicly released 2021 trade pact signature, down to the sub-millimeter stroke noise.',
      'Creation date metadata (2026-10-09) postdates the claimed historic summit by 4 months.',
      'Micro-kerning inconsistencies detect inserted clause with non-standard letter tracking.'
    ],
    anomaliesDetected: [
      'Cloned signature vector bitmap with missing genuine pen pressure velocity gradient.',
      'Hidden incremental PDF revision object containing conflicting earlier text.',
      'ExifTool extracted Creator Tool: "Canva PDF Exporter" masquerading as State Department print driver.'
    ],
    chainOfCustody: [
      {
        id: 'coc-301',
        timestamp: '2026-10-12 11:20:00',
        actor: 'Elena Rostova',
        role: 'Lead Investigative Journalist',
        action: 'Encrypted Drop Ingestion',
        sha256: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
        details: 'Received through SecureDrop portal from whistleblower relay #91.'
      }
    ],
    annotations: [
      {
        id: 'ann-301',
        author: 'Elena Rostova',
        note: 'The clause allocating 40% royalties to shell entity was superimposed over original environmental clause.',
        flagType: 'tamper',
        createdAt: '2026-10-12 14:10:00'
      }
    ],
    verifiedBy: 'Sarah Chen (Standards Board)',
    verificationVerdict: 'FABRICATED DOCUMENT / CLONED SIGNATURE FORGERY.'
  },
  {
    id: 'case-004',
    caseNumber: 'EGL-2026-0825',
    title: 'Frontline War Correspondent Video: Disputed Evacuation Corridor Shelling',
    targetSubject: 'International Red Cross Convoy',
    sourceContext: 'Raw camera memory card direct handoff at border crossing station.',
    mediaType: 'video',
    status: 'verified_authentic',
    threatLevel: 'safe',
    dateCreated: '2026-10-11 09:15:00',
    lastModified: '2026-10-11 14:30:00',
    investigator: 'Dr. Marcus Vance',
    organization: 'Reuters Digital Verification Unit',
    sha256: 'bc94592237a3c3325c2763b0b533f0b2f3d538e1b10a26e84ef24cb1495c2562',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=600&q=80',
    metrics: {
      authenticityScore: 97,
      deepfakeProbability: 3,
      ganArtifacts: 4,
      blinkAnomalyRate: 6,
      rppgPulseSync: 94,
      phonemeDesyncMs: 8,
      audioVocoderSynth: 2,
      compressionDiscontinuity: 5,
      metadataAltered: false,
      tamperedFramesCount: 0,
      totalFramesAnalyzed: 2400
    },
    keyFindings: [
      'Unbroken PRNU (Photo-Response Non-Uniformity) sensor noise fingerprint matches Sony FX6 serial #882103.',
      'Cardiovascular pulse telemetry on visible civilian faces demonstrates natural acute stress elevated heart rate (118 bpm).',
      'Sunlight shadow azimuth angle matches timestamp and GPS coordinates within 0.8 degrees of astronomical model.',
      'No GAN synthesis, temporal warping, or audio splicing found.'
    ],
    anomaliesDetected: [],
    chainOfCustody: [
      {
        id: 'coc-401',
        timestamp: '2026-10-11 09:15:00',
        actor: 'Dr. Marcus Vance',
        role: 'Forensic Digital Analyst',
        action: 'Physical Secure Ingestion',
        sha256: 'bc94592237a3c3325c2763b0b533f0b2f3d538e1b10a26e84ef24cb1495c2562',
        details: 'Hardware write-blocker image created directly from CFexpress card.'
      }
    ],
    annotations: [
      {
        id: 'ann-401',
        timestamp: '00:02:18',
        author: 'Dr. Marcus Vance',
        note: 'Acoustic blast reverberation matches physical buildings visible in background topography.',
        flagType: 'verified',
        createdAt: '2026-10-11 12:00:00'
      }
    ],
    verifiedBy: 'Dr. Marcus Vance',
    verificationVerdict: 'VERIFIED AUTHENTIC FOOTAGE. CLEARED FOR GLOBAL SYNDICATION.'
  },
  {
    id: 'case-005',
    caseNumber: 'EGL-2026-0818',
    title: 'Wire Photograph: Purported Closed-Door Oligarch Defense Pact Meeting',
    targetSubject: 'Three Foreign Envoys & Tech Tycoon',
    sourceContext: 'Shared on social platforms as alleged proof of illicit weapons procurement.',
    mediaType: 'image',
    status: 'deepfake_confirmed',
    threatLevel: 'high',
    dateCreated: '2026-10-09 16:45:00',
    lastModified: '2026-10-10 10:20:00',
    investigator: 'Elena Rostova',
    organization: 'ICIJ Investigations',
    sha256: 'cb8379ac2098aa165029e3938a51da0bcecfc008fd6795f401178647f96c5b34',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
    metrics: {
      authenticityScore: 18,
      deepfakeProbability: 91,
      ganArtifacts: 88,
      blinkAnomalyRate: 0,
      rppgPulseSync: 0,
      phonemeDesyncMs: 0,
      audioVocoderSynth: 0,
      compressionDiscontinuity: 92,
      metadataAltered: true
    },
    keyFindings: [
      'Error Level Analysis (ELA) exhibits extreme quantization gradient disparity around hands and background chandelier.',
      'Sub-surface scattering on skin fails Lambertian reflection model; earlobes show typical diffusion symmetry error.',
      'Reflections in eye corneas show outdoor cloudy daylight, while indoor scene lighting is warm tungsten.',
      'Finger anatomy on secondary figure reveals 6th digit partial generation anomaly.'
    ],
    anomaliesDetected: [
      'Inconsistent lighting reflection vectors in pupil corneal reflections.',
      'High-frequency Fourier transform exposes checkerboard deconvolution artifact.',
      'Anatomical finger deformity typical of Midjourney v6 generation.'
    ],
    chainOfCustody: [
      {
        id: 'coc-501',
        timestamp: '2026-10-09 16:45:00',
        actor: 'Elena Rostova',
        role: 'Lead Investigative Journalist',
        action: 'Web Archive Snapshot',
        sha256: 'cb8379ac2098aa165029e3938a51da0bcecfc008fd6795f401178647f96c5b34',
        details: 'Captured image from viral tweet before deletion.'
      }
    ],
    annotations: [
      {
        id: 'ann-501',
        author: 'Elena Rostova',
        note: 'Pupil reflection proves image is 100% synthetic generation, not taken inside Munich hotel.',
        flagType: 'tamper',
        createdAt: '2026-10-09 17:30:00'
      }
    ],
    verifiedBy: 'Elena Rostova & Dr. Marcus Vance',
    verificationVerdict: 'AI-GENERATED SYNTHETIC FABRICATION (TEXT-TO-IMAGE).'
  },
  {
    id: 'case-006',
    caseNumber: 'EGL-2026-0809',
    title: 'Corporate Whistleblower Memo: Semiconductor Quality Control Coverup (DOCX)',
    targetSubject: 'VP of Global Foundry Operations',
    sourceContext: 'Internal DOCX memo claiming deliberate falsification of chip defect rates.',
    mediaType: 'docx',
    status: 'under_investigation',
    threatLevel: 'medium',
    dateCreated: '2026-10-08 14:00:00',
    lastModified: '2026-10-14 03:00:00',
    investigator: 'Sarah Chen',
    organization: 'Global Media Forensic Standards Board',
    sha256: '49bc20df15e412a64472421e13fe86ff1c5165e18b2afccf160d4d19d817ac2c',
    thumbnailUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    metrics: {
      authenticityScore: 54,
      deepfakeProbability: 46,
      ganArtifacts: 42,
      blinkAnomalyRate: 0,
      rppgPulseSync: 0,
      phonemeDesyncMs: 0,
      audioVocoderSynth: 0,
      compressionDiscontinuity: 48,
      metadataAltered: true
    },
    keyFindings: [
      'XML payload contains author "ChatGPT-User-Dev" inside core.xml metadata properties.',
      'Perplexity distribution analysis highlights synthetic phrasing repetitive density.',
      'Internal table formatting contains styles not present in corporation standard enterprise template.'
    ],
    anomaliesDetected: [
      'Metadata template mismatch with official enterprise GUID.',
      'Elevated linguistic perplexity consistency typical of LLM output.'
    ],
    chainOfCustody: [
      {
        id: 'coc-601',
        timestamp: '2026-10-08 14:00:00',
        actor: 'Sarah Chen',
        role: 'Newsroom Administrator',
        action: 'Intake and Metadata Extraction',
        sha256: '49bc20df15e412a64472421e13fe86ff1c5165e18b2afccf160d4d19d817ac2c',
        details: 'Extracted XML relationships from unpacked docx container.'
      }
    ],
    annotations: [
      {
        id: 'ann-601',
        author: 'Sarah Chen',
        note: 'Seeking corroboration from second engineer before confirming authenticity status.',
        flagType: 'question',
        createdAt: '2026-10-08 15:15:00'
      }
    ],
    verifiedBy: 'Pending Peer Review',
    verificationVerdict: 'PROBABLE LLM HALLUCINATION OR FORGED MEMO. PENDING WITNESS INTERVIEW.'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    timestamp: '2 mins ago',
    title: 'CRITICAL: Live Video Stream Mismatch',
    message: 'Stream #7728 eye blink stagnation & 142ms lip-sync offset breached newsroom broadcast security policy.',
    type: 'alert',
    caseId: 'case-001',
    read: false
  },
  {
    id: 'notif-2',
    timestamp: '18 mins ago',
    title: 'Forensic Audit Complete',
    message: 'SHA-256 verification confirmed uncorrupted chain of custody for Case EGL-2026-0825 (War Correspondent).',
    type: 'success',
    caseId: 'case-004',
    read: false
  },
  {
    id: 'notif-3',
    timestamp: '1 hour ago',
    title: 'Neural Model Cluster Updated',
    message: 'Biometric rPPG & GAN Boundary Discriminator v4.2.1 calibrated. Processing latency: 22ms/frame.',
    type: 'info',
    read: true
  },
  {
    id: 'notif-4',
    timestamp: '3 hours ago',
    title: 'Suspected Viral Morph Alert',
    message: 'Automated wire crawler flagged Finance Minister video for 420 spliced mouth cavity frames.',
    type: 'warning',
    caseId: 'case-002',
    read: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-1',
    timestamp: '2026-10-14 05:14:22',
    actor: 'Dr. Marcus Vance',
    action: 'EXPORT_FORENSIC_CERTIFICATE',
    targetResource: 'Case EGL-2026-0842 (Whistleblower)',
    ipAddress: '194.109.12.84 (Encrypted Wire)',
    status: 'allowed'
  },
  {
    id: 'aud-2',
    timestamp: '2026-10-14 05:02:11',
    actor: 'Elena Rostova',
    action: 'LIVE_STREAM_HUD_INSPECTION',
    targetResource: 'Live Video Session #7728',
    ipAddress: '82.165.197.1 (BXP Node)',
    status: 'allowed'
  },
  {
    id: 'aud-3',
    timestamp: '2026-10-14 04:48:30',
    actor: 'System Autonomous Defense',
    action: 'BLOCK_UNAUTHORIZED_MEDIA_EXFILTRATION',
    targetResource: 'Encrypted Vault #4',
    ipAddress: '45.154.255.91',
    status: 'blocked'
  },
  {
    id: 'aud-4',
    timestamp: '2026-10-14 03:22:04',
    actor: 'Sarah Chen',
    action: 'DATA_RETENTION_PURGE_EXECUTE',
    targetResource: 'Ephemeral Biometric Cache (48 files)',
    ipAddress: '185.220.101.5',
    status: 'allowed'
  }
];
