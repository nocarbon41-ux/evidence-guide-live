export type UserRole = 'lead_journalist' | 'forensic_analyst' | 'newsroom_admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatar: string;
  securityClearance: 'Level 1 - Field' | 'Level 2 - Forensic Specialist' | 'Level 3 - Chief Verification Officer';
  pgpKeyId: string;
  activeSessions: number;
  lastLogin: string;
}

export type ThreatLevel = 'critical' | 'high' | 'medium' | 'low' | 'safe';

export type CaseStatus = 
  | 'under_investigation' 
  | 'verified_authentic' 
  | 'deepfake_confirmed' 
  | 'morphed_detected' 
  | 'inconclusive';

export type MediaType = 'live_stream' | 'video' | 'image' | 'pdf' | 'docx';

export interface ChainOfCustodyEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  sha256: string;
  details: string;
}

export interface AnnotationItem {
  id: string;
  timestamp?: string; // for video/stream
  author: string;
  note: string;
  flagType: 'anomaly' | 'verified' | 'question' | 'tamper';
  createdAt: string;
}

export interface ForensicMetrics {
  authenticityScore: number; // 0 - 100
  deepfakeProbability: number; // 0 - 100
  ganArtifacts: number; // 0 - 100
  blinkAnomalyRate: number; // 0 - 100
  rppgPulseSync: number; // 0 - 100 (microvascular flush match)
  phonemeDesyncMs: number; // in milliseconds (e.g. 15ms authentic, 140ms fake)
  audioVocoderSynth: number; // 0 - 100
  compressionDiscontinuity: number; // 0 - 100 (ELA)
  metadataAltered: boolean;
  tamperedFramesCount?: number;
  totalFramesAnalyzed?: number;
}

export interface ForensicCase {
  id: string;
  caseNumber: string;
  title: string;
  targetSubject: string;
  sourceContext: string;
  mediaType: MediaType;
  status: CaseStatus;
  threatLevel: ThreatLevel;
  dateCreated: string;
  lastModified: string;
  investigator: string;
  organization: string;
  sha256: string;
  thumbnailUrl: string;
  mediaUrl?: string;
  metrics: ForensicMetrics;
  keyFindings: string[];
  anomaliesDetected: string[];
  chainOfCustody: ChainOfCustodyEntry[];
  annotations: AnnotationItem[];
  verifiedBy?: string;
  verificationVerdict?: string;
}

export interface LiveStreamAnomaly {
  id: string;
  timestamp: string;
  type: 'face_warp' | 'blink_stagnation' | 'pulse_absence' | 'audio_phase_jitter' | 'boundary_ghosting' | 'voice_clone';
  severity: 'critical' | 'warning' | 'info';
  description: string;
  confidence: number;
}

export interface LiveStreamTelemetry {
  fps: number;
  resolution: string;
  latencyMs: number;
  currentAuthenticity: number;
  currentDeepfakeScore: number;
  pulseBpm: number;
  blinkRatePerMin: number;
  lipSyncOffsetMs: number;
  faceWarpRisk: number;
  voiceCloneRisk: number;
  activeAnomalies: LiveStreamAnomaly[];
}

export interface SystemNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'alert' | 'warning' | 'info' | 'success';
  caseId?: string;
  read: boolean;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  targetResource: string;
  ipAddress: string;
  status: 'allowed' | 'flagged' | 'blocked';
}
