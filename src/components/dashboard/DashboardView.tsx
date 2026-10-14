import React from 'react';
import { 
  Video, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  FileCheck2, 
  Radio, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink,
  Fingerprint,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { ForensicCase } from '../../types';

interface DashboardViewProps {
  cases: ForensicCase[];
  onSelectCase: (c: ForensicCase) => void;
  onNavigateToTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  cases,
  onSelectCase,
  onNavigateToTab,
}) => {
  const deepfakesCount = cases.filter(c => c.status === 'deepfake_confirmed').length;
  const morphedCount = cases.filter(c => c.status === 'morphed_detected').length;
  const verifiedCount = cases.filter(c => c.status === 'verified_authentic').length;
  const activeReviewCount = cases.filter(c => c.status === 'under_investigation').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner: Verification Protocol Overview */}
      <div className="relative overflow-hidden rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-6 lg:p-8 shadow-xs">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#234B38]/5 dark:bg-[#DE805E]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C87552] dark:text-[#DE805E] tracking-wider uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C87552] dark:bg-[#DE805E] animate-ping" />
              Real-time Media Verification Engine · Active Protocol
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2D3029] dark:text-[#ECEAE4] font-editorial">
              Investigative Media Forensics Desk
            </h1>
            <p className="text-sm text-[#6B7265] dark:text-[#9DA396] leading-relaxed">
              Detecting synthetic deepfakes, morphed video calls, and altered documents during live investigative interviews. Powered by biometric microvascular pulse (rPPG), GAN boundary analysis, and cryptographic chain of custody.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateToTab('live_call')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#234B38] hover:bg-[#1b3b2c] text-[#FAF7F0] font-medium text-xs transition-all shadow-xs group"
            >
              <Video className="w-4 h-4 text-[#DE805E]" />
              <span>Launch Live Interview Vet</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FAF7F0]/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={() => onNavigateToTab('media_forensics')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#232720] hover:bg-[#E6DFD2]/50 text-[#2D3029] dark:text-[#ECEAE4] font-medium text-xs transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-[#C87552]" />
              <span>Upload Document/Media</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#6B7265] dark:text-[#9DA396]">
            <span className="text-xs font-mono uppercase tracking-wider">Confirmed Deepfakes</span>
            <div className="p-2 rounded-lg bg-[#B33927]/10 text-[#B33927] dark:text-[#E0533C]">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold font-mono text-[#B33927] dark:text-[#E0533C]">
              {deepfakesCount}
            </div>
            <span className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">
              Immediate Infiltration Risk
            </span>
          </div>
          <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] pt-2 border-t border-[#E6DFD2]/60 dark:border-[#2F342B] flex items-center justify-between">
            <span>Interception rate</span>
            <span className="font-mono font-medium text-[#2D3029] dark:text-[#ECEAE4]">99.4%</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#6B7265] dark:text-[#9DA396]">
            <span className="text-xs font-mono uppercase tracking-wider">Morphed Broadcasts</span>
            <div className="p-2 rounded-lg bg-[#C97A1E]/10 text-[#C97A1E] dark:text-[#E29332]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold font-mono text-[#C97A1E] dark:text-[#E29332]">
              {morphedCount}
            </div>
            <span className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">
              Selective Lip-Sync / Splicing
            </span>
          </div>
          <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] pt-2 border-t border-[#E6DFD2]/60 dark:border-[#2F342B] flex items-center justify-between">
            <span>Avg tampered frames</span>
            <span className="font-mono font-medium text-[#2D3029] dark:text-[#ECEAE4]">394 frs</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#6B7265] dark:text-[#9DA396]">
            <span className="text-xs font-mono uppercase tracking-wider">Verified Authentic</span>
            <div className="p-2 rounded-lg bg-[#2E6B47]/10 text-[#2E6B47] dark:text-[#438D62]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold font-mono text-[#2E6B47] dark:text-[#438D62]">
              {verifiedCount}
            </div>
            <span className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">
              Cleared For Syndication
            </span>
          </div>
          <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] pt-2 border-t border-[#E6DFD2]/60 dark:border-[#2F342B] flex items-center justify-between">
            <span>PRNU Sensor Noise Match</span>
            <span className="font-mono font-medium text-[#2D3029] dark:text-[#ECEAE4]">98.2%</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#6B7265] dark:text-[#9DA396]">
            <span className="text-xs font-mono uppercase tracking-wider">Model Inference Speed</span>
            <div className="p-2 rounded-lg bg-[#234B38]/10 text-[#234B38] dark:text-[#3C7054]">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <div className="text-3xl font-bold font-mono text-[#234B38] dark:text-[#3C7054]">
              18<span className="text-base font-normal">ms</span>
            </div>
            <span className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">
              Zero Frame Drops
            </span>
          </div>
          <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] pt-2 border-t border-[#E6DFD2]/60 dark:border-[#2F342B] flex items-center justify-between">
            <span>Neural Cluster</span>
            <span className="font-mono font-medium text-[#2E6B47] dark:text-[#438D62]">4 Nodes Sync</span>
          </div>
        </div>
      </div>

      {/* Central Visualizations & Forensic Vectors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Real-Time Verification Methodology & Forensic Vectors */}
        <div className="lg:col-span-2 rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#E6DFD2]/80 dark:border-[#2F342B] pb-4">
            <div>
              <h2 className="text-sm font-bold text-[#2D3029] dark:text-[#ECEAE4] uppercase tracking-wider font-mono">
                Multi-Spectral Biometric & Tamper Vectors
              </h2>
              <p className="text-xs text-[#6B7265] dark:text-[#9DA396] mt-0.5">
                Evaluated simultaneously on every video frame and media upload
              </p>
            </div>
            <span className="text-xs font-mono text-[#234B38] dark:text-[#DE805E] bg-[#FAF7F0] dark:bg-[#232720] border border-[#E6DFD2] dark:border-[#2F342B] px-2.5 py-1 rounded">
              ISO/IEC 30107 Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vector 1 */}
            <div className="p-4 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#C87552]" />
                  rPPG Vascular Micro-Flush
                </span>
                <span className="text-[11px] font-mono text-[#2E6B47] dark:text-[#438D62] font-semibold">94% Active</span>
              </div>
              <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396] leading-relaxed">
                Extracts imperceptible color fluctuations on interviewee forehead and cheeks caused by heart ventricular contractions. Deepfakes generate zero genuine cardiac pulse.
              </p>
              <div className="w-full bg-[#E6DFD2] dark:bg-[#2F342B] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#234B38] dark:bg-[#3C7054] h-full rounded-full" style={{ width: '94%' }} />
              </div>
            </div>

            {/* Vector 2 */}
            <div className="p-4 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4] flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#234B38] dark:text-[#3C7054]" />
                  Phoneme-Labial Sync (ms)
                </span>
                <span className="text-[11px] font-mono text-[#C97A1E] dark:text-[#E29332] font-semibold">±12ms Bounds</span>
              </div>
              <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396] leading-relaxed">
                Tracks phonetic voice formants against lip aperture and tongue movement. Morphing models typically incur 80ms–160ms lag during plosive consonants (/p/, /b/, /t/).
              </p>
              <div className="w-full bg-[#E6DFD2] dark:bg-[#2F342B] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#C97A1E] dark:bg-[#E29332] h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            {/* Vector 3 */}
            <div className="p-4 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4] flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5 text-[#234B38] dark:text-[#3C7054]" />
                  GAN Boundary & Spectral Noise
                </span>
                <span className="text-[11px] font-mono text-[#B33927] dark:text-[#E0533C] font-semibold">91% Alert</span>
              </div>
              <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396] leading-relaxed">
                2D Fourier transform inspection detects latent upsampling lattices and boundary gradient halos where synthetic faces are composited onto background collars.
              </p>
              <div className="w-full bg-[#E6DFD2] dark:bg-[#2F342B] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#B33927] dark:bg-[#E0533C] h-full rounded-full" style={{ width: '91%' }} />
              </div>
            </div>

            {/* Vector 4 */}
            <div className="p-4 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4] flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#C87552]" />
                  Document Micro-Kerning & EXIF
                </span>
                <span className="text-[11px] font-mono text-[#2E6B47] dark:text-[#438D62] font-semibold">Verified</span>
              </div>
              <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396] leading-relaxed">
                Dissects PDF incremental objects, font metric anomalies, signature pixel duplicate matrices, and ExifTool timestamp tampering on leaked war memos and treaties.
              </p>
              <div className="w-full bg-[#E6DFD2] dark:bg-[#2F342B] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#2E6B47] dark:bg-[#438D62] h-full rounded-full" style={{ width: '88%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Live Alert Feed */}
        <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD2]/80 dark:border-[#2F342B]">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#C87552] animate-pulse" />
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-[#2D3029] dark:text-[#ECEAE4]">
                  Live Interception Wire
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#6B7265] dark:text-[#9DA396]">Realtime</span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-lg border border-[#B33927]/30 bg-[#B33927]/5 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-[#B33927] dark:text-[#E0533C]">
                  <span>SYNTHETIC INTERVIEW BLOCKED</span>
                  <span className="text-[10px] font-mono">04:25 UTC</span>
                </div>
                <p className="text-[11px] text-[#2D3029] dark:text-[#ECEAE4] leading-tight">
                  Purported defense contractor video call failed pupil reflection test. Deepfake probability: 94%.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#C97A1E]/30 bg-[#C97A1E]/5 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-[#C97A1E] dark:text-[#E29332]">
                  <span>LIP RE-SYNC DETECTED</span>
                  <span className="text-[10px] font-mono">19:15 UTC</span>
                </div>
                <p className="text-[11px] text-[#2D3029] dark:text-[#ECEAE4] leading-tight">
                  Finance Minister viral clip has 420 spliced mouth cavity frames. Sourced from 2024 archive.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[#2E6B47]/30 bg-[#2E6B47]/5 text-xs space-y-1">
                <div className="flex items-center justify-between font-semibold text-[#2E6B47] dark:text-[#438D62]">
                  <span>WAR CORRESPONDENT CLEARED</span>
                  <span className="text-[10px] font-mono">09:15 UTC</span>
                </div>
                <p className="text-[11px] text-[#2D3029] dark:text-[#ECEAE4] leading-tight">
                  PRNU sensor noise and solar shadow azimuth verify footage as genuine. Cleared for newsrooms.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#FAF7F0] dark:bg-[#232720] border border-[#E6DFD2] dark:border-[#2F342B] text-[11px] text-[#6B7265] dark:text-[#9DA396] flex items-center justify-between">
            <span>Active Investigative Nodes:</span>
            <span className="font-mono font-semibold text-[#2D3029] dark:text-[#ECEAE4]">12 Verified Desks</span>
          </div>
        </div>
      </div>

      {/* Recent Investigation Cases Table */}
      <div className="rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E6DFD2] dark:border-[#2F342B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-[#2D3029] dark:text-[#ECEAE4]">
              Priority Verification Dossiers ({cases.length})
            </h2>
            <p className="text-xs text-[#6B7265] dark:text-[#9DA396] mt-0.5">
              Cryptographically timestamped evidence with immutable SHA-256 chain of custody
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('cases')}
            className="text-xs font-semibold text-[#234B38] dark:text-[#DE805E] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Evidence Dossiers</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#181A16] text-[#6B7265] dark:text-[#9DA396] font-mono text-[11px] uppercase">
                <th className="py-3 px-4 font-medium">Case ID</th>
                <th className="py-3 px-4 font-medium">Evidence Subject & Claim</th>
                <th className="py-3 px-4 font-medium">Type</th>
                <th className="py-3 px-4 font-medium">Forensic Verdict</th>
                <th className="py-3 px-4 font-medium">Confidence</th>
                <th className="py-3 px-4 font-medium">Investigator</th>
                <th className="py-3 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DFD2]/60 dark:divide-[#2F342B]">
              {cases.slice(0, 5).map((item) => (
                <tr 
                  key={item.id}
                  onClick={() => onSelectCase(item)}
                  className="hover:bg-[#FAF7F0]/70 dark:hover:bg-[#232720]/70 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-4 font-mono font-medium text-[#234B38] dark:text-[#DE805E]">
                    {item.caseNumber}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-[#2D3029] dark:text-[#ECEAE4] truncate group-hover:text-[#234B38] dark:group-hover:text-[#DE805E] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] truncate mt-0.5">
                      Subject: {item.targetSubject}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[10px] uppercase text-[#6B7265] dark:text-[#9DA396] bg-[#FAF7F0] dark:bg-[#232720] border border-[#E6DFD2] dark:border-[#2F342B] px-1.5 py-0.5 rounded">
                      {item.mediaType.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      {item.status === 'verified_authentic' && (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6B47] dark:text-[#438D62] shrink-0" />
                          <span className="font-medium text-[#2E6B47] dark:text-[#438D62]">Authentic</span>
                        </>
                      )}
                      {item.status === 'deepfake_confirmed' && (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-[#B33927] dark:text-[#E0533C] shrink-0" />
                          <span className="font-medium text-[#B33927] dark:text-[#E0533C]">Deepfake</span>
                        </>
                      )}
                      {item.status === 'morphed_detected' && (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5 text-[#C97A1E] dark:text-[#E29332] shrink-0" />
                          <span className="font-medium text-[#C97A1E] dark:text-[#E29332]">Morphed Clip</span>
                        </>
                      )}
                      {item.status === 'under_investigation' && (
                        <>
                          <Clock className="w-3.5 h-3.5 text-[#6B7265] dark:text-[#9DA396] shrink-0" />
                          <span className="font-medium text-[#6B7265] dark:text-[#9DA396]">In Review</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium">
                    <span className={item.metrics.deepfakeProbability > 60 ? 'text-[#B33927] dark:text-[#E0533C]' : 'text-[#2E6B47] dark:text-[#438D62]'}>
                      {item.metrics.deepfakeProbability}% Fake
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#6B7265] dark:text-[#9DA396]">
                    {item.investigator}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-xs font-semibold text-[#234B38] dark:text-[#DE805E] group-hover:underline">
                      Examine Dossier &rarr;
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
