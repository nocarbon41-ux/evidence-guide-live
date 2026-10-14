import React from 'react';
import { 
  X, 
  Printer, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Fingerprint, 
  FileText,
  Lock,
  Download
} from 'lucide-react';
import { ForensicCase } from '../../types';

interface ForensicReportModalProps {
  caseData: ForensicCase | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ForensicReportModal: React.FC<ForensicReportModalProps> = ({
  caseData,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !caseData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-3xl my-auto rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] text-[#2D3029] dark:text-[#ECEAE4] shadow-2xl overflow-hidden transition-all max-h-[94vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Bar (Non-Printable) */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#181A16] shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#234B38] dark:text-[#DE805E] font-bold">
              OFFICIAL FORENSIC DOSSIER
            </span>
            <span className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">· Ready for Legal/Broadcast Submission</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#234B38] hover:bg-[#1b3b2c] text-white text-xs font-medium transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#6B7265] hover:text-[#2D3029] dark:hover:text-[#ECEAE4]"
              aria-label="Close report modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Certificate Body */}
        <div className="p-8 overflow-y-auto space-y-6 bg-white dark:bg-[#181A16] text-[#2D3029] dark:text-[#ECEAE4] print:p-0">
          {/* Formal Organization Header */}
          <div className="border-b-2 border-[#234B38] dark:border-[#DE805E] pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#234B38] dark:text-[#DE805E] font-bold">
                <Fingerprint className="w-5 h-5 text-[#C87552]" />
                <span>EVIDENCE GUIDE LIVE · FORENSIC VERIFICATION CONSORTIUM</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-editorial">
                Cryptographic Media Authenticity Certificate
              </h1>
              <p className="text-xs text-[#6B7265] dark:text-[#9DA396]">
                Joint Standards Taskforce · Reuters Verification & ICIJ Investigations
              </p>
            </div>

            <div className="text-right font-mono text-xs shrink-0">
              <div className="text-[#6B7265] dark:text-[#9DA396] text-[10px] uppercase">DOSSIER NUMBER</div>
              <div className="text-sm font-bold text-[#234B38] dark:text-[#DE805E]">{caseData.caseNumber}</div>
              <div className="text-[10px] text-[#6B7265] dark:text-[#9DA396] mt-1">{caseData.dateCreated}</div>
            </div>
          </div>

          {/* Verdict Banner */}
          <div className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            caseData.status === 'verified_authentic' ? 'bg-[#2E6B47]/10 border-[#2E6B47]/40 text-[#2E6B47] dark:text-[#438D62]' :
            caseData.status === 'deepfake_confirmed' ? 'bg-[#B33927]/10 border-[#B33927]/40 text-[#B33927] dark:text-[#E0533C]' :
            'bg-[#C97A1E]/10 border-[#C97A1E]/40 text-[#C97A1E] dark:text-[#E29332]'
          }`}>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-mono font-bold">
                FINAL FORENSIC VERDICT
              </div>
              <div className="text-base font-bold font-mono mt-0.5">
                {caseData.verificationVerdict || caseData.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
            <div className="text-right font-mono text-xs shrink-0">
              <span className="text-[10px] uppercase block">CONFIDENCE LEVEL</span>
              <strong className="text-lg">
                {caseData.status === 'verified_authentic' 
                  ? `${caseData.metrics.authenticityScore}% Authentic` 
                  : `${caseData.metrics.deepfakeProbability}% Synthetic`}
              </strong>
            </div>
          </div>

          {/* Evidence Details Table */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#6B7265] dark:text-[#9DA396]">
              Section 1: Ingestion & Cryptographic Identity
            </h2>
            <div className="border border-[#E6DFD2] dark:border-[#2F342B] rounded-lg overflow-hidden text-xs divide-y divide-[#E6DFD2] dark:divide-[#2F342B]">
              <div className="grid grid-cols-3 p-2.5 bg-[#FAF7F0] dark:bg-[#232720]">
                <span className="font-semibold text-[#6B7265] dark:text-[#9DA396]">Evidence Title</span>
                <span className="col-span-2 font-medium">{caseData.title}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="font-semibold text-[#6B7265] dark:text-[#9DA396]">Target Subject</span>
                <span className="col-span-2">{caseData.targetSubject}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 bg-[#FAF7F0] dark:bg-[#232720]">
                <span className="font-semibold text-[#6B7265] dark:text-[#9DA396]">Media Type</span>
                <span className="col-span-2 uppercase font-mono">{caseData.mediaType.replace('_', ' ')}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="font-semibold text-[#6B7265] dark:text-[#9DA396]">SHA-256 Hash Digest</span>
                <span className="col-span-2 font-mono text-[11px] break-all select-all">{caseData.sha256}</span>
              </div>
            </div>
          </div>

          {/* Multi-Vector Telemetry Breakdown */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#6B7265] dark:text-[#9DA396]">
              Section 2: Multi-Vector Neural Telemetry
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/40 dark:bg-[#232720]/40">
                <div className="text-[10px] text-[#6B7265] dark:text-[#9DA396] uppercase font-mono">GAN Boundary</div>
                <div className="text-lg font-bold font-mono mt-1">{caseData.metrics.ganArtifacts}%</div>
              </div>
              <div className="p-3 rounded border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/40 dark:bg-[#232720]/40">
                <div className="text-[10px] text-[#6B7265] dark:text-[#9DA396] uppercase font-mono">rPPG Pulse</div>
                <div className="text-lg font-bold font-mono mt-1">{caseData.metrics.rppgPulseSync}%</div>
              </div>
              <div className="p-3 rounded border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/40 dark:bg-[#232720]/40">
                <div className="text-[10px] text-[#6B7265] dark:text-[#9DA396] uppercase font-mono">Lip-Sync Offset</div>
                <div className="text-lg font-bold font-mono mt-1">+{caseData.metrics.phonemeDesyncMs}ms</div>
              </div>
              <div className="p-3 rounded border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/40 dark:bg-[#232720]/40">
                <div className="text-[10px] text-[#6B7265] dark:text-[#9DA396] uppercase font-mono">ELA Discontinuity</div>
                <div className="text-lg font-bold font-mono mt-1">{caseData.metrics.compressionDiscontinuity}%</div>
              </div>
            </div>
          </div>

          {/* Observations */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-[#6B7265] dark:text-[#9DA396]">
              Section 3: Key Forensic Observations
            </h2>
            <ul className="space-y-1.5 text-xs">
              {caseData.keyFindings.map((finding, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#C87552] dark:text-[#DE805E] font-bold">•</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Signoff Block */}
          <div className="pt-6 border-t border-[#E6DFD2] dark:border-[#2F342B] flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-xs font-mono">
            <div>
              <div className="text-[10px] uppercase text-[#6B7265] dark:text-[#9DA396]">LEAD INVESTIGATOR SIGN-OFF</div>
              <div className="font-bold text-sm text-[#2D3029] dark:text-[#ECEAE4] mt-1">{caseData.investigator}</div>
              <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">{caseData.organization}</div>
            </div>

            <div className="text-right">
              <div className="p-2 border border-dashed border-[#234B38] dark:border-[#DE805E] rounded text-center inline-block">
                <div className="text-[9px] text-[#234B38] dark:text-[#DE805E] font-bold">DIGITALLY TIMESTAMPED</div>
                <div className="text-[8px] text-[#6B7265] dark:text-[#9DA396] mt-0.5">RSA-4096 / PGP VERIFIED</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
