import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Server, 
  Cpu, 
  Lock, 
  EyeOff, 
  Key, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Trash2,
  HardDrive,
  RefreshCw,
  Terminal,
  FileCheck
} from 'lucide-react';
import { AuditLogItem } from '../../types';
import { INITIAL_AUDIT_LOGS } from '../../data/mockCases';

interface AdminMonitoringViewProps {
  onSendAlert: (title: string, message: string, type: 'alert' | 'warning' | 'info') => void;
}

export const AdminMonitoringView: React.FC<AdminMonitoringViewProps> = ({
  onSendAlert,
}) => {
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  // Privacy toggles
  const [ephemeralBiometrics, setEphemeralBiometrics] = useState(true);
  const [anonymizeLandmarks, setAnonymizeLandmarks] = useState(true);
  const [hsmKeySigning, setHsmKeySigning] = useState(true);
  const [zeroPiiRetention, setZeroPiiRetention] = useState(true);

  const handlePurgeCache = () => {
    onSendAlert(
      'Ephemeral Cache Purged',
      'All temporary biometric frame meshes and audio buffers cleared from volatile memory.',
      'info'
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6DFD2] dark:border-[#2A2E25]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C87552] dark:text-[#DE805E] font-semibold">
            <span>Security Operations & Governance</span>
            <span aria-hidden="true">·</span>
            <span>GDPR & ISO/IEC 30107 Compliance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D3029] dark:text-[#ECEAE4] mt-1 font-editorial">
            Administrator System & Privacy Monitor
          </h1>
          <p className="text-xs text-[#6B7265] dark:text-[#9DA396] mt-0.5">
            Real-time inference cluster health, immutable audit trail, and zero-retention privacy controls.
          </p>
        </div>

        <button
          onClick={handlePurgeCache}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#232720] hover:bg-[#E6DFD2]/60 text-xs font-medium text-[#2D3029] dark:text-[#ECEAE4] transition-colors self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5 text-[#B33927]" />
          <span>Purge Ephemeral Biometrics</span>
        </button>
      </div>

      {/* Cluster Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#6B7265] dark:text-[#9DA396] text-xs font-mono">
            <span>NEURAL INFERENCE CLUSTER</span>
            <Server className="w-4 h-4 text-[#234B38] dark:text-[#3C7054]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#2D3029] dark:text-[#ECEAE4]">
            4 Nodes Active
          </div>
          <div className="text-[11px] text-[#2E6B47] dark:text-[#438D62] font-mono">
            ● 99.98% Uptime · Low Jitter
          </div>
        </div>

        <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#6B7265] dark:text-[#9DA396] text-xs font-mono">
            <span>FRAME PIPELINE LATENCY</span>
            <Cpu className="w-4 h-4 text-[#C87552]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#234B38] dark:text-[#3C7054]">
            18.4ms
          </div>
          <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] font-mono">
            Target &lt;30ms (Real-time HUD)
          </div>
        </div>

        <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#6B7265] dark:text-[#9DA396] text-xs font-mono">
            <span>TOTAL VERIFICATIONS</span>
            <FileCheck className="w-4 h-4 text-[#2E6B47]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#2D3029] dark:text-[#ECEAE4]">
            14,892
          </div>
          <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] font-mono">
            Cryptographically Salted
          </div>
        </div>

        <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[#6B7265] dark:text-[#9DA396] text-xs font-mono">
            <span>PRIVACY ZERO-RETENTION</span>
            <ShieldCheck className="w-4 h-4 text-[#2E6B47] dark:text-[#438D62]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#2E6B47] dark:text-[#438D62]">
            ENFORCED
          </div>
          <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] font-mono">
            Zero Raw Video Persisted
          </div>
        </div>
      </div>

      {/* Privacy Standards & Policy Compliance Card */}
      <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-6 shadow-xs space-y-5">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#2D3029] dark:text-[#ECEAE4]">
            Journalistic Data Privacy & Zero-Knowledge Enforcement
          </h2>
          <p className="text-xs text-[#6B7265] dark:text-[#9DA396] mt-0.5">
            Protects whistleblowers and confidential sources by guaranteeing biometric anonymity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 flex items-center justify-between">
            <div className="space-y-1 pr-4">
              <div className="text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4]">
                Ephemeral Biometric Cache
              </div>
              <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">
                Automatically purges raw facial mesh coordinates and rPPG color buffers after 15 minutes.
              </p>
            </div>
            <input
              type="checkbox"
              checked={ephemeralBiometrics}
              onChange={(e) => setEphemeralBiometrics(e.target.checked)}
              className="w-5 h-5 accent-[#234B38] rounded cursor-pointer shrink-0"
            />
          </div>

          <div className="p-4 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 flex items-center justify-between">
            <div className="space-y-1 pr-4">
              <div className="text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4]">
                Anonymize Facial Landmarks
              </div>
              <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">
                Replaces high-dimensional biometric vectors with mathematical entropy hash in reports.
              </p>
            </div>
            <input
              type="checkbox"
              checked={anonymizeLandmarks}
              onChange={(e) => setAnonymizeLandmarks(e.target.checked)}
              className="w-5 h-5 accent-[#234B38] rounded cursor-pointer shrink-0"
            />
          </div>

          <div className="p-4 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 flex items-center justify-between">
            <div className="space-y-1 pr-4">
              <div className="text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4]">
                HSM Hardware Digital Signature
              </div>
              <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">
                Cryptographically stamps all forensic verdicts with the newsroom verification consortium key.
              </p>
            </div>
            <input
              type="checkbox"
              checked={hsmKeySigning}
              onChange={(e) => setHsmKeySigning(e.target.checked)}
              className="w-5 h-5 accent-[#234B38] rounded cursor-pointer shrink-0"
            />
          </div>

          <div className="p-4 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 flex items-center justify-between">
            <div className="space-y-1 pr-4">
              <div className="text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4]">
                Zero-Retention Audit Ledger
              </div>
              <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">
                Never retains raw interviewee audio recordings; stores only Fourier spectral coefficients.
              </p>
            </div>
            <input
              type="checkbox"
              checked={zeroPiiRetention}
              onChange={(e) => setZeroPiiRetention(e.target.checked)}
              className="w-5 h-5 accent-[#234B38] rounded cursor-pointer shrink-0"
            />
          </div>
        </div>
      </div>

      {/* System Audit Ledger Table */}
      <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E6DFD2] dark:border-[#2F342B] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#2D3029] dark:text-[#ECEAE4]">
              Immutable System Audit Log ({auditLogs.length})
            </h2>
            <p className="text-xs text-[#6B7265] dark:text-[#9DA396] mt-0.5">
              Append-only audit trail recording every evidence access, export, and telemetry trigger
            </p>
          </div>
          <span className="font-mono text-[10px] text-[#234B38] dark:text-[#DE805E] bg-[#FAF7F0] dark:bg-[#232720] border border-[#E6DFD2] dark:border-[#2F342B] px-2 py-1 rounded">
            CRYPTOGRAPHIC LEDGER
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#181A16] text-[#6B7265] dark:text-[#9DA396] font-mono text-[11px] uppercase">
                <th className="py-3 px-4 font-medium">Timestamp</th>
                <th className="py-3 px-4 font-medium">Investigator / Actor</th>
                <th className="py-3 px-4 font-medium">Action</th>
                <th className="py-3 px-4 font-medium">Target Resource</th>
                <th className="py-3 px-4 font-medium">Encrypted Node IP</th>
                <th className="py-3 px-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DFD2]/60 dark:divide-[#2F342B]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#FAF7F0]/60 dark:hover:bg-[#232720]/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#6B7265] dark:text-[#9DA396]">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#2D3029] dark:text-[#ECEAE4]">
                    {log.actor}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#234B38] dark:text-[#DE805E]">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-[#2D3029] dark:text-[#ECEAE4]">
                    {log.targetResource}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#6B7265] dark:text-[#9DA396]">
                    {log.ipAddress}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                      log.status === 'allowed' ? 'bg-[#2E6B47]/10 text-[#2E6B47] dark:text-[#438D62]' :
                      log.status === 'flagged' ? 'bg-[#C97A1E]/10 text-[#C97A1E] dark:text-[#E29332]' :
                      'bg-[#B33927]/10 text-[#B33927] dark:text-[#E0533C]'
                    }`}>
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
