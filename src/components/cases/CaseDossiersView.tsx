import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  Radio, 
  ExternalLink,
  Shield,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { ForensicCase, CaseStatus, MediaType } from '../../types';

interface CaseDossiersViewProps {
  cases: ForensicCase[];
  onSelectCase: (c: ForensicCase) => void;
  onNewScan: () => void;
}

export const CaseDossiersView: React.FC<CaseDossiersViewProps> = ({
  cases,
  onSelectCase,
  onNewScan,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [mediaFilter, setMediaFilter] = useState<string>('all');

  const filteredCases = cases.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.targetSubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sha256.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesMedia = mediaFilter === 'all' || c.mediaType === mediaFilter;

    return matchesSearch && matchesStatus && matchesMedia;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6DFD2] dark:border-[#2A2E25]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C87552] dark:text-[#DE805E] font-semibold">
            <span>Cryptographic Evidence Vault</span>
            <span aria-hidden="true">·</span>
            <span>Chain of Custody Archive</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D3029] dark:text-[#ECEAE4] mt-1 font-editorial">
            Investigation Case Dossiers
          </h1>
          <p className="text-xs text-[#6B7265] dark:text-[#9DA396] mt-0.5">
            Full forensic chain of custody, SHA-256 evidence digests, and peer review logs.
          </p>
        </div>

        <button
          onClick={onNewScan}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#234B38] hover:bg-[#1b3b2c] text-white font-medium text-xs transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#DE805E]" />
          <span>New Evidence Dossier</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6B7265] dark:text-[#9DA396] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by subject, case ID, or SHA-256 hash..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] text-xs text-[#2D3029] dark:text-[#ECEAE4] outline-hidden focus:border-[#234B38] dark:focus:border-[#DE805E]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter Tabs */}
          <div className="flex items-center p-1 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19]">
            {[
              { id: 'all', label: 'All Statuses' },
              { id: 'deepfake_confirmed', label: 'Deepfakes' },
              { id: 'morphed_detected', label: 'Morphed' },
              { id: 'verified_authentic', label: 'Authentic' },
              { id: 'under_investigation', label: 'In Review' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-[#234B38] text-white shadow-2xs'
                    : 'text-[#6B7265] dark:text-[#9DA396] hover:text-[#2D3029] dark:hover:text-[#ECEAE4]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Media Format Select */}
          <select
            value={mediaFilter}
            onChange={(e) => setMediaFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] text-xs text-[#2D3029] dark:text-[#ECEAE4] outline-hidden cursor-pointer"
          >
            <option value="all">All Media Formats</option>
            <option value="live_stream">Live Streams</option>
            <option value="video">Videos</option>
            <option value="image">Images</option>
            <option value="pdf">PDF Documents</option>
            <option value="docx">Word DOCX</option>
          </select>
        </div>
      </div>

      {/* Case Grid */}
      {filteredCases.length === 0 ? (
        <div className="p-12 rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] text-center space-y-3">
          <FolderArchive className="w-10 h-10 text-[#6B7265] dark:text-[#9DA396] mx-auto" />
          <h3 className="text-sm font-bold text-[#2D3029] dark:text-[#ECEAE4]">
            No matching case dossiers found
          </h3>
          <p className="text-xs text-[#6B7265] dark:text-[#9DA396] max-w-sm mx-auto">
            Try adjusting your search criteria or create a new forensic scan to append new evidence.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectCase(c)}
              className="cursor-pointer rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] hover:border-[#234B38] dark:hover:border-[#DE805E] bg-[#FFFEFA] dark:bg-[#1C1E19] shadow-xs overflow-hidden transition-all hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                {/* Image Header with Badge Overlay */}
                <div className="relative aspect-video w-full bg-[#10120F] overflow-hidden">
                  <img
                    src={c.thumbnailUrl}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-white">
                    <span>{c.caseNumber}</span>
                  </div>

                  <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 shadow-md ${
                    c.status === 'verified_authentic' ? 'bg-[#2E6B47] text-white' :
                    c.status === 'deepfake_confirmed' ? 'bg-[#B33927] text-white' :
                    'bg-[#C97A1E] text-white'
                  }`}>
                    {c.status === 'verified_authentic' && <CheckCircle2 className="w-3 h-3" />}
                    {c.status === 'deepfake_confirmed' && <XCircle className="w-3 h-3" />}
                    {c.status === 'morphed_detected' && <AlertTriangle className="w-3 h-3" />}
                    <span>{c.status.replace('_', ' ').toUpperCase()}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-[10px] text-[#6B7265] dark:text-[#9DA396] font-mono">
                    <span className="uppercase">{c.mediaType.replace('_', ' ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{c.dateCreated.substring(0, 10)}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#2D3029] dark:text-[#ECEAE4] group-hover:text-[#234B38] dark:group-hover:text-[#DE805E] transition-colors line-clamp-2 leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-xs text-[#6B7265] dark:text-[#9DA396] line-clamp-2 leading-relaxed">
                    Subject: {c.targetSubject}
                  </p>

                  {/* Forensic Telemetry Bar */}
                  <div className="pt-2 border-t border-[#E6DFD2]/60 dark:border-[#2F342B] space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#6B7265] dark:text-[#9DA396]">Deepfake Risk:</span>
                      <span className={`font-mono font-bold ${c.metrics.deepfakeProbability > 60 ? 'text-[#B33927] dark:text-[#E0533C]' : 'text-[#2E6B47] dark:text-[#438D62]'}`}>
                        {c.metrics.deepfakeProbability}%
                      </span>
                    </div>
                    <div className="w-full bg-[#E6DFD2] dark:bg-[#2F342B] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${c.metrics.deepfakeProbability > 60 ? 'bg-[#B33927]' : 'bg-[#2E6B47]'}`}
                        style={{ width: `${c.metrics.deepfakeProbability}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-[#FAF7F0] dark:bg-[#181A16] border-t border-[#E6DFD2] dark:border-[#2F342B] flex items-center justify-between text-[11px] text-[#6B7265] dark:text-[#9DA396]">
                <span className="truncate">{c.investigator}</span>
                <span className="text-xs font-semibold text-[#234B38] dark:text-[#DE805E] group-hover:underline flex items-center gap-1">
                  Examine &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
