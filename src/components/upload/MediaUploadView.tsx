import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  FileSearch, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Layers, 
  Fingerprint, 
  Eye, 
  Sparkles, 
  Cpu, 
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Download,
  Sliders,
  RotateCw
} from 'lucide-react';
import { MediaType, ForensicCase } from '../../types';
import { analyzeUploadedMedia, computeSha256, AnalysisResult } from '../../services/forensicEngine';

interface MediaUploadViewProps {
  onSaveToCases: (newCase: ForensicCase) => void;
  onSendAlert: (title: string, message: string, type: 'alert' | 'warning' | 'info' | 'success') => void;
  onOpenReport: (c: ForensicCase) => void;
}

export const MediaUploadView: React.FC<MediaUploadViewProps> = ({
  onSaveToCases,
  onSendAlert,
  onOpenReport,
}) => {
  const [selectedMediaType, setSelectedMediaType] = useState<MediaType>('image');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeAnalysis, setActiveAnalysis] = useState<{
    fileName: string;
    fileSize: string;
    mediaType: MediaType;
    previewUrl?: string;
    result: AnalysisResult;
  } | null>(null);

  // ELA (Error Level Analysis) simulation toggle for images
  const [elaIntensity, setElaIntensity] = useState<number>(65);
  const [showElaLayer, setShowElaLayer] = useState<boolean>(false);
  const elaCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Video scrubber state
  const [scrubberFrame, setScrubberFrame] = useState(184);

  // Pre-loaded sample items for immediate testing without user files
  const curatedSamples = [
    {
      title: 'Morphed Diplomat Press Video',
      type: 'video' as MediaType,
      fileName: 'diplomat_speech_morphed_wav2lip.mp4',
      size: '24.2 MB',
      previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      description: 'Selective mouth-cavity replacement over authentic 2024 EU briefing.'
    },
    {
      title: 'AI Face-Swapped Whistleblower Photo',
      type: 'image' as MediaType,
      fileName: 'whistleblower_defense_fake_photo.jpg',
      size: '3.8 MB',
      previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      description: 'Latent diffusion face swap with inconsistent corneal lighting.'
    },
    {
      title: 'Forged Pipeline Treaty (PDF)',
      type: 'pdf' as MediaType,
      fileName: 'concession_treaty_forged_signature.pdf',
      size: '1.4 MB',
      previewUrl: 'https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=600&q=80',
      description: 'Cloned ministerial signature vector and font metric substitution on Page 4.'
    },
    {
      title: 'Authentic War Correspondent Footage',
      type: 'video' as MediaType,
      fileName: 'frontline_dispatch_raw_authentic_camera.mp4',
      size: '142 MB',
      previewUrl: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=600&q=80',
      description: 'Raw PRNU camera sensor noise and uninterrupted biometric pulse.'
    },
    {
      title: 'Fabricated Internal QC Memo (DOCX)',
      type: 'docx' as MediaType,
      fileName: 'semiconductor_defect_coverup_fake_memo.docx',
      size: '850 KB',
      previewUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
      description: 'Synthetic phrasing perplexity spike and XML author metadata mismatch.'
    }
  ];

  // Run analysis workflow
  const executeAnalysis = async (fileInfo: { fileName: string; size: string; type: MediaType; previewUrl?: string }) => {
    setIsAnalyzing(true);
    setAnalysisProgress(10);
    setActiveAnalysis(null);

    // Simulate multi-stage neural inspection progress
    const p1 = setTimeout(() => setAnalysisProgress(35), 250);
    const p2 = setTimeout(() => setAnalysisProgress(65), 550);
    const p3 = setTimeout(() => setAnalysisProgress(88), 850);

    const result = await analyzeUploadedMedia(
      { name: fileInfo.fileName, size: 1024 * 1024, type: fileInfo.type },
      fileInfo.type
    );

    setTimeout(() => {
      setAnalysisProgress(100);
      setIsAnalyzing(false);
      setActiveAnalysis({
        fileName: fileInfo.fileName,
        fileSize: fileInfo.size,
        mediaType: fileInfo.type,
        previewUrl: fileInfo.previewUrl,
        result
      });

      if (result.verdict === 'deepfake_confirmed' || result.verdict === 'morphed_detected') {
        onSendAlert(
          'Tampered Media Detected',
          `Analysis of ${fileInfo.fileName} revealed ${result.summaryVerdict}.`,
          'alert'
        );
      } else {
        onSendAlert(
          'Media Cleared Authentic',
          `Verification complete for ${fileInfo.fileName}. PRNU and cryptographic checks passed.`,
          'success'
        );
      }
    }, 1100);
  };

  // Handle actual file drop or upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let detectedType: MediaType = 'image';
    if (file.type.includes('video')) detectedType = 'video';
    else if (file.name.endsWith('.pdf')) detectedType = 'pdf';
    else if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) detectedType = 'docx';

    const preview = file.type.startsWith('image') ? URL.createObjectURL(file) : undefined;
    executeAnalysis({
      fileName: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: detectedType,
      previewUrl: preview
    });
  };

  // Convert current analysis into a permanent Case Dossier
  const handlePromoteToCase = () => {
    if (!activeAnalysis) return;

    const newCase: ForensicCase = {
      id: `case-${Date.now()}`,
      caseNumber: `EGL-2026-${Math.floor(2000 + Math.random() * 8000)}`,
      title: `Forensic Examination: ${activeAnalysis.fileName}`,
      targetSubject: activeAnalysis.fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      sourceContext: `Uploaded to Evidence Guide Live Media Forensics Lab for multi-spectral verification.`,
      mediaType: activeAnalysis.mediaType,
      status: activeAnalysis.result.verdict,
      threatLevel: activeAnalysis.result.threatLevel,
      dateCreated: new Date().toISOString().replace('T', ' ').substring(0, 19),
      lastModified: new Date().toISOString().replace('T', ' ').substring(0, 19),
      investigator: 'Elena Rostova',
      organization: 'ICIJ Investigations',
      sha256: activeAnalysis.result.sha256,
      thumbnailUrl: activeAnalysis.previewUrl || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80',
      metrics: activeAnalysis.result.metrics,
      keyFindings: activeAnalysis.result.keyFindings,
      anomaliesDetected: activeAnalysis.result.anomaliesDetected,
      chainOfCustody: [
        {
          id: `coc-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          actor: 'Elena Rostova',
          role: 'Lead Investigative Journalist',
          action: 'Media File Ingestion & Cryptographic Registration',
          sha256: activeAnalysis.result.sha256,
          details: `Uploaded ${activeAnalysis.fileName} (${activeAnalysis.fileSize}) into secure analysis workspace.`
        }
      ],
      annotations: [
        {
          id: `ann-${Date.now()}`,
          author: 'Forensic Lab Engine',
          note: activeAnalysis.result.summaryVerdict,
          flagType: activeAnalysis.result.verdict === 'verified_authentic' ? 'verified' : 'tamper',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
        }
      ],
      verifiedBy: 'Elena Rostova & Digital Verification Lab',
      verificationVerdict: activeAnalysis.result.summaryVerdict
    };

    onSaveToCases(newCase);
    onSendAlert(
      'Case Dossier Created',
      `File promoted to permanent case #${newCase.caseNumber}.`,
      'success'
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E6DFD2] dark:border-[#2A2E25]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C87552] dark:text-[#DE805E] font-semibold">
            <span>Multi-Format Media Verification</span>
            <span aria-hidden="true">·</span>
            <span>PRNU & ELA Spectral Engine</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D3029] dark:text-[#ECEAE4] mt-1 font-editorial">
            Media Forensics & Tamper Lab
          </h1>
          <p className="text-xs text-[#6B7265] dark:text-[#9DA396] mt-0.5">
            Ingest images, broadcast videos, leaked PDFs, and DOCX memos for deep neural authenticity vetting.
          </p>
        </div>

        {/* Media Format Filter Tabs */}
        <div className="flex items-center p-1 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] self-start md:self-auto">
          {[
            { id: 'image', label: 'Images (JPG/PNG)', icon: ImageIcon },
            { id: 'video', label: 'Videos (MP4/MOV)', icon: Video },
            { id: 'pdf', label: 'PDF Documents', icon: FileText },
            { id: 'docx', label: 'Word (DOCX)', icon: FileSearch }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = selectedMediaType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedMediaType(tab.id as MediaType)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  isSel
                    ? 'bg-[#234B38] text-white shadow-2xs'
                    : 'text-[#6B7265] dark:text-[#9DA396] hover:text-[#2D3029] dark:hover:text-[#ECEAE4]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Upload Dropzone & Sample Picker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Drag & Drop Zone */}
        <div className="lg:col-span-2 space-y-4">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) {
                let dType: MediaType = 'image';
                if (file.type.includes('video')) dType = 'video';
                else if (file.name.endsWith('.pdf')) dType = 'pdf';
                else if (file.name.endsWith('.docx')) dType = 'docx';
                executeAnalysis({
                  fileName: file.name,
                  size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
                  type: dType,
                  previewUrl: file.type.startsWith('image') ? URL.createObjectURL(file) : undefined
                });
              }
            }}
            className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all flex flex-col items-center justify-center min-h-[220px] bg-[#FFFEFA] dark:bg-[#1C1E19]
              ${isDragging 
                ? 'border-[#234B38] bg-[#234B38]/5 scale-[0.99]' 
                : 'border-[#E6DFD2] dark:border-[#2F342B] hover:border-[#234B38]/60 dark:hover:border-[#DE805E]/60'
              }`}
          >
            <div className="w-12 h-12 rounded-xl bg-[#FAF7F0] dark:bg-[#232720] border border-[#E6DFD2] dark:border-[#2F342B] flex items-center justify-center text-[#234B38] dark:text-[#DE805E] mb-3 shadow-2xs">
              <UploadCloud className="w-6 h-6" />
            </div>

            <h3 className="text-sm font-bold text-[#2D3029] dark:text-[#ECEAE4]">
              Drag and drop investigative file to inspect
            </h3>
            <p className="text-xs text-[#6B7265] dark:text-[#9DA396] mt-1 max-w-md">
              Supports JPEG, PNG, MP4, MOV, PDF, and DOCX files. Files are analyzed locally with zero external data leaks.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <label className="cursor-pointer px-4 py-2 rounded-lg bg-[#234B38] hover:bg-[#1b3b2c] text-white font-medium text-xs transition-colors shadow-xs">
                Browse Local Files
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,video/*,.pdf,.docx,.doc"
                />
              </label>
              <span className="text-xs text-[#6B7265] dark:text-[#9DA396] font-mono">or pick test sample below</span>
            </div>
          </div>

          {/* Analysis In Progress Indicator */}
          {isAnalyzing && (
            <div className="p-5 rounded-xl border border-[#234B38]/30 bg-[#FFFEFA] dark:bg-[#1C1E19] shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#2D3029] dark:text-[#ECEAE4] flex items-center gap-2">
                  <RotateCw className="w-4 h-4 text-[#C87552] animate-spin" />
                  Running Neural Inspection Pipeline...
                </span>
                <span className="font-mono text-[#234B38] dark:text-[#DE805E] font-medium">{analysisProgress}%</span>
              </div>
              <div className="w-full bg-[#E6DFD2] dark:bg-[#2F342B] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-[#234B38] dark:bg-[#3C7054] h-full rounded-full transition-all duration-300"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
              <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] font-mono flex items-center justify-between">
                <span>STAGE: Discrete Cosine Transform & PRNU noise extraction</span>
                <span>SHA-256 HASH LOCK</span>
              </div>
            </div>
          )}

          {/* Detailed Forensic Results Card (When Analysis Completes) */}
          {activeAnalysis && !isAnalyzing && (
            <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-6 shadow-xs space-y-5">
              {/* Verdict Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E6DFD2] dark:border-[#2F342B]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#6B7265] dark:text-[#9DA396]">{activeAnalysis.fileName}</span>
                    <span className="text-[10px] text-[#6B7265] dark:text-[#9DA396]">({activeAnalysis.fileSize})</span>
                  </div>
                  <h2 className="text-base font-bold text-[#2D3029] dark:text-[#ECEAE4] mt-0.5">
                    {activeAnalysis.result.summaryVerdict}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePromoteToCase}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#234B38] hover:bg-[#1b3b2c] text-white text-xs font-medium transition-colors shadow-2xs"
                  >
                    <span>Save to Case Dossiers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* SHA-256 Fingerprint */}
              <div className="p-3 rounded-lg bg-[#FAF7F0] dark:bg-[#232720] border border-[#E6DFD2] dark:border-[#2F342B] font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[#6B7265] dark:text-[#9DA396] uppercase text-[10px]">SHA-256 Digest:</span>
                <span className="text-[#2D3029] dark:text-[#ECEAE4] select-all truncate text-[11px] font-medium">
                  {activeAnalysis.result.sha256}
                </span>
              </div>

              {/* Special Tool: ELA Canvas for Image Analysis */}
              {activeAnalysis.mediaType === 'image' && (
                <div className="rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] p-4 bg-[#FAF7F0]/40 dark:bg-[#232720]/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#C87552]" />
                      <span className="text-xs font-bold font-mono uppercase text-[#2D3029] dark:text-[#ECEAE4]">
                        Error Level Analysis (ELA) Quantization Filter
                      </span>
                    </div>
                    <button
                      onClick={() => setShowElaLayer(!showElaLayer)}
                      className={`px-2.5 py-1 text-[11px] rounded font-medium border transition-colors ${
                        showElaLayer 
                          ? 'bg-[#234B38] text-white border-[#234B38]' 
                          : 'border-[#E6DFD2] dark:border-[#2F342B] text-[#6B7265] dark:text-[#9DA396]'
                      }`}
                    >
                      {showElaLayer ? 'ELA Inverted View' : 'Original Photo View'}
                    </button>
                  </div>

                  <div className="relative aspect-video max-h-72 w-full rounded-lg overflow-hidden border border-[#E6DFD2] dark:border-[#2F342B] bg-black flex items-center justify-center">
                    {activeAnalysis.previewUrl && (
                      <img
                        src={activeAnalysis.previewUrl}
                        alt="Analyzed subject"
                        className={`w-full h-full object-contain ${
                          showElaLayer ? 'filter invert contrast-200 hue-rotate-180' : ''
                        }`}
                      />
                    )}
                    {showElaLayer && (
                      <div className="absolute top-2 right-2 bg-red-900/90 text-red-200 text-[10px] font-mono px-2 py-1 rounded">
                        DISCONTINUITY LEVEL: {activeAnalysis.result.metrics.compressionDiscontinuity}%
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Key Findings List */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#2D3029] dark:text-[#ECEAE4]">
                  Key Forensic Findings
                </h3>
                <ul className="space-y-1.5">
                  {activeAnalysis.result.keyFindings.map((finding, idx) => (
                    <li key={idx} className="text-xs text-[#2D3029] dark:text-[#ECEAE4] flex items-start gap-2">
                      <span className="text-[#C87552] dark:text-[#DE805E] mt-0.5 font-bold">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Anomalies Detected */}
              {activeAnalysis.result.anomaliesDetected.length > 0 && (
                <div className="p-3 rounded-lg border border-[#B33927]/30 bg-[#B33927]/10 text-xs space-y-1.5">
                  <div className="font-semibold text-[#B33927] dark:text-[#E0533C] flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Suspicious Anomalies Detected ({activeAnalysis.result.anomaliesDetected.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeAnalysis.result.anomaliesDetected.map((anom, i) => (
                      <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-[#1C1E19] border border-[#B33927]/30 text-[#B33927] dark:text-[#E0533C]">
                        {anom}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right 1 Col: Curated Investigation Test Samples */}
        <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-5 shadow-xs space-y-4">
          <div>
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#2D3029] dark:text-[#ECEAE4]">
              Curated Test Evidence Files
            </h3>
            <p className="text-xs text-[#6B7265] dark:text-[#9DA396] mt-0.5">
              Click any sample below to immediately simulate the forensic analysis pipeline
            </p>
          </div>

          <div className="space-y-3">
            {curatedSamples.map((sample, idx) => (
              <div
                key={idx}
                onClick={() => executeAnalysis(sample)}
                className="cursor-pointer rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] hover:border-[#234B38] dark:hover:border-[#DE805E] p-3 transition-all hover:bg-[#FAF7F0] dark:hover:bg-[#232720] group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold text-xs text-[#2D3029] dark:text-[#ECEAE4] group-hover:text-[#234B38] dark:group-hover:text-[#DE805E] transition-colors">
                    {sample.title}
                  </div>
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#FAF7F0] dark:bg-[#1C1E19] border border-[#E6DFD2] dark:border-[#2F342B] text-[#6B7265] dark:text-[#9DA396] shrink-0">
                    {sample.type}
                  </span>
                </div>
                <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] mt-1 line-clamp-2">
                  {sample.description}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-[#6B7265] dark:text-[#9DA396] font-mono">
                  <span>{sample.size}</span>
                  <span className="text-[#234B38] dark:text-[#DE805E] font-medium group-hover:underline">
                    Run Analysis &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
