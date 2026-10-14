import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  Printer, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Plus, 
  Hash, 
  User, 
  Building2,
  Calendar,
  Lock,
  Layers,
  Activity,
  Radio,
  FileCheck2
} from 'lucide-react';
import { ForensicCase, AnnotationItem } from '../../types';

interface CaseDetailModalProps {
  caseData: ForensicCase | null;
  isOpen: boolean;
  onClose: () => void;
  onAddAnnotation: (caseId: string, annotation: AnnotationItem) => void;
  onExportReport: (caseData: ForensicCase) => void;
}

export const CaseDetailModal: React.FC<CaseDetailModalProps> = ({
  caseData,
  isOpen,
  onClose,
  onAddAnnotation,
  onExportReport,
}) => {
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<'anomaly' | 'verified' | 'question' | 'tamper'>('anomaly');

  if (!isOpen || !caseData) return null;

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const annotation: AnnotationItem = {
      id: `ann-${Date.now()}`,
      author: 'Elena Rostova',
      note: newNote.trim(),
      flagType: noteType,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    onAddAnnotation(caseData.id, annotation);
    setNewNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-4xl my-auto rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] text-[#2D3029] dark:text-[#ECEAE4] shadow-2xl overflow-hidden transition-all max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#181A16] shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#234B38] dark:text-[#DE805E] bg-[#FFFEFA] dark:bg-[#232720] border border-[#E6DFD2] dark:border-[#2F342B] px-2 py-0.5 rounded font-bold">
              {caseData.caseNumber}
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-semibold flex items-center gap-1.5 ${
                caseData.status === 'verified_authentic' ? 'text-[#2E6B47] dark:text-[#438D62]' :
                caseData.status === 'deepfake_confirmed' ? 'text-[#B33927] dark:text-[#E0533C]' :
                'text-[#C97A1E] dark:text-[#E29332]'
              }`}>
                {caseData.status === 'verified_authentic' && <CheckCircle2 className="w-4 h-4" />}
                {caseData.status === 'deepfake_confirmed' && <XCircle className="w-4 h-4" />}
                {caseData.status === 'morphed_detected' && <AlertTriangle className="w-4 h-4" />}
                {caseData.status === 'under_investigation' && <Clock className="w-4 h-4" />}
                <span>{caseData.status.replace('_', ' ').toUpperCase()}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onExportReport(caseData)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#234B38] dark:border-[#DE805E] bg-[#234B38] text-white hover:bg-[#1b3b2c] text-xs font-medium transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export Formal Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-[#6B7265] hover:text-[#2D3029] dark:hover:text-[#ECEAE4]"
              aria-label="Close dossier modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Title & Subject Metadata */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D3029] dark:text-[#ECEAE4] font-editorial">
              {caseData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B7265] dark:text-[#9DA396]">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#C87552]" />
                Subject: <strong className="text-[#2D3029] dark:text-[#ECEAE4] font-medium">{caseData.targetSubject}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                {caseData.organization}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {caseData.dateCreated}
              </span>
            </div>
            <p className="text-xs text-[#6B7265] dark:text-[#9DA396] leading-relaxed pt-1">
              {caseData.sourceContext}
            </p>
          </div>

          {/* SHA-256 Hash Strip */}
          <div className="p-3 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#232720] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
            <span className="text-[10px] text-[#6B7265] dark:text-[#9DA396] uppercase flex items-center gap-1">
              <Hash className="w-3.5 h-3.5 text-[#234B38] dark:text-[#DE805E]" />
              Immutable Evidence Digest (SHA-256):
            </span>
            <span className="text-[11px] text-[#2D3029] dark:text-[#ECEAE4] select-all truncate font-medium">
              {caseData.sha256}
            </span>
          </div>

          {/* Biometrics & Forensic Scores Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 space-y-1">
              <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">Deepfake Probability</div>
              <div className={`text-2xl font-bold font-mono ${
                caseData.metrics.deepfakeProbability > 60 ? 'text-[#B33927] dark:text-[#E0533C]' : 'text-[#2E6B47] dark:text-[#438D62]'
              }`}>
                {caseData.metrics.deepfakeProbability}%
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 space-y-1">
              <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">GAN Edge Blending</div>
              <div className="text-2xl font-bold font-mono text-[#2D3029] dark:text-[#ECEAE4]">
                {caseData.metrics.ganArtifacts}%
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 space-y-1">
              <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">rPPG Pulse Sync</div>
              <div className="text-2xl font-bold font-mono text-[#2D3029] dark:text-[#ECEAE4]">
                {caseData.metrics.rppgPulseSync}%
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 space-y-1">
              <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">Phoneme Desync</div>
              <div className="text-2xl font-bold font-mono text-[#2D3029] dark:text-[#ECEAE4]">
                +{caseData.metrics.phonemeDesyncMs}ms
              </div>
            </div>
          </div>

          {/* Key Findings & Anomalies */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#2D3029] dark:text-[#ECEAE4]">
              Investigative Findings & Forensic Observations
            </h3>
            <ul className="space-y-2">
              {caseData.keyFindings.map((finding, idx) => (
                <li key={idx} className="text-xs text-[#2D3029] dark:text-[#ECEAE4] flex items-start gap-2.5">
                  <span className="text-[#C87552] dark:text-[#DE805E] font-bold">•</span>
                  <span className="leading-relaxed">{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Immutable Chain of Custody Audit Log */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#2D3029] dark:text-[#ECEAE4] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#234B38] dark:text-[#DE805E]" />
                Cryptographic Chain of Custody ({caseData.chainOfCustody.length})
              </h3>
              <span className="text-[10px] font-mono text-[#6B7265] dark:text-[#9DA396]">
                Non-Repudiation Verified
              </span>
            </div>

            <div className="divide-y divide-[#E6DFD2]/60 dark:divide-[#2F342B] border border-[#E6DFD2] dark:border-[#2F342B] rounded-lg overflow-hidden bg-[#FAF7F0]/30 dark:bg-[#232720]/30">
              {caseData.chainOfCustody.map((entry) => (
                <div key={entry.id} className="p-3 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#2D3029] dark:text-[#ECEAE4]">
                    <span className="font-semibold">{entry.action}</span>
                    <span className="font-mono text-[10px] text-[#6B7265] dark:text-[#9DA396]">{entry.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] flex items-center gap-2">
                    <span>{entry.actor} ({entry.role})</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">Digest: {entry.sha256.substring(0, 12)}...</span>
                  </div>
                  <p className="text-[11px] text-[#2D3029] dark:text-[#ECEAE4] mt-0.5">
                    {entry.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Annotations & Notes Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#2D3029] dark:text-[#ECEAE4]">
              Investigator Annotations ({caseData.annotations.length})
            </h3>

            <div className="space-y-2">
              {caseData.annotations.map((ann) => (
                <div 
                  key={ann.id}
                  className="p-3 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/40 dark:bg-[#232720]/40 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2D3029] dark:text-[#ECEAE4]">{ann.author}</span>
                    <span className="text-[10px] font-mono text-[#6B7265] dark:text-[#9DA396]">
                      {ann.timestamp ? `Timestamp: ${ann.timestamp} · ` : ''}{ann.createdAt}
                    </span>
                  </div>
                  <p className="text-[#2D3029] dark:text-[#ECEAE4] leading-normal">{ann.note}</p>
                </div>
              ))}
            </div>

            {/* Form to append new note */}
            <form onSubmit={handlePostNote} className="pt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Append formal verification note or question..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#232720] text-xs text-[#2D3029] dark:text-[#ECEAE4] outline-hidden focus:border-[#234B38] dark:focus:border-[#DE805E]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#234B38] hover:bg-[#1b3b2c] text-white text-xs font-medium transition-colors shadow-2xs shrink-0 flex items-center gap-1.5 justify-center"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#181A16] shrink-0 text-xs text-[#6B7265] dark:text-[#9DA396]">
          <span>Lead Investigator: {caseData.investigator}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] text-xs font-medium hover:bg-[#FAF7F0] dark:hover:bg-[#232720] text-[#2D3029] dark:text-[#ECEAE4] transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
