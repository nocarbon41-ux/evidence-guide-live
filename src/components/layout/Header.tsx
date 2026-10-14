import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  PlusCircle, 
  Shield, 
  Activity, 
  X,
  FileCheck2
} from 'lucide-react';
import { UserProfile, SystemNotification, ForensicCase } from '../../types';

interface HeaderProps {
  onOpenMobileNav: () => void;
  onOpenNotifications: () => void;
  notifications: SystemNotification[];
  currentUser: UserProfile;
  onQuickScan: () => void;
  cases: ForensicCase[];
  onSelectCase: (c: ForensicCase) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileNav,
  onOpenNotifications,
  notifications,
  currentUser,
  onQuickScan,
  cases,
  onSelectCase,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredCases = searchQuery.trim() 
    ? cases.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.targetSubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.sha256.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3.5 border-b border-[#E6DFD2] dark:border-[#2A2E25] bg-[#FAF7F0]/90 dark:bg-[#131512]/90 backdrop-blur-md transition-colors">
      {/* Left: Mobile Nav Button + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden p-2 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] text-[#2D3029] dark:text-[#ECEAE4]"
          aria-label="Open navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative flex-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] focus-within:border-[#234B38] dark:focus-within:border-[#DE805E] focus-within:ring-2 focus-within:ring-[#234B38]/15 dark:focus-within:ring-[#DE805E]/20 transition-all shadow-2xs">
            <Search className="w-4 h-4 text-[#6B7265] dark:text-[#9DA396] shrink-0" />
            <input
              type="text"
              placeholder="Search evidence by Case ID, Subject, or SHA-256 hash..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(true);
              }}
              onFocus={() => setIsSearching(true)}
              className="w-full bg-transparent text-xs text-[#2D3029] dark:text-[#ECEAE4] placeholder-[#6B7265] dark:placeholder-[#9DA396] outline-hidden"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-[#6B7265] hover:text-[#2D3029] dark:hover:text-[#ECEAE4]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isSearching && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-1.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] shadow-lg p-2 z-50">
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#6B7265] dark:text-[#9DA396] px-2 py-1">
                Matching Case Files ({filteredCases.length})
              </div>
              {filteredCases.length === 0 ? (
                <div className="p-3 text-center text-xs text-[#6B7265] dark:text-[#9DA396]">
                  No matching evidence dossiers found for "{searchQuery}"
                </div>
              ) : (
                <div className="divide-y divide-[#E6DFD2]/60 dark:divide-[#2F342B]">
                  {filteredCases.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCase(c);
                        setIsSearching(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left p-2 rounded hover:bg-[#FAF7F0] dark:hover:bg-[#232720] transition-colors flex items-center justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-[#234B38] dark:text-[#DE805E] font-medium">{c.caseNumber}</span>
                          <span className="text-xs font-medium text-[#2D3029] dark:text-[#ECEAE4] truncate">{c.title}</span>
                        </div>
                        <div className="text-[10px] text-[#6B7265] dark:text-[#9DA396] flex items-center gap-2 mt-0.5">
                          <span>{c.targetSubject}</span>
                          <span aria-hidden="true">·</span>
                          <span>Hash: {c.sha256.substring(0, 10)}...</span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono shrink-0 ml-2 ${
                        c.status === 'verified_authentic' ? 'text-[#2E6B47] dark:text-[#438D62]' :
                        c.status === 'deepfake_confirmed' ? 'text-[#B33927] dark:text-[#E0533C]' :
                        'text-[#C97A1E] dark:text-[#E29332]'
                      }`}>
                        {c.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: Telemetry Badge + Quick Scan + Notifications */}
      <div className="flex items-center gap-3">
        {/* Live Forensic Engine Status */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] text-[11px] text-[#2D3029] dark:text-[#ECEAE4]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="font-mono text-[10px] text-[#6B7265] dark:text-[#9DA396]">SCANNER:</span>
          <span className="font-medium text-[#234B38] dark:text-[#3C7054]">ONLINE · 18ms</span>
        </div>

        {/* Security Clearance Pill-free indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] text-[11px]">
          <Shield className="w-3.5 h-3.5 text-[#C87552] dark:text-[#DE805E]" />
          <span className="text-[#6B7265] dark:text-[#9DA396] font-mono text-[10px]">
            {currentUser.securityClearance.split(' - ')[0]}
          </span>
        </div>

        {/* Quick New Scan Button */}
        <button
          onClick={onQuickScan}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#234B38] hover:bg-[#1b3b2c] text-[#FAF7F0] font-medium text-xs transition-colors shadow-xs active:scale-98"
          title="Start Media Deepfake Scan"
        >
          <PlusCircle className="w-4 h-4 text-[#DE805E]" />
          <span className="hidden sm:inline">New Forensic Scan</span>
          <span className="sm:hidden">Scan</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] hover:bg-[#FAF7F0] dark:hover:bg-[#232720] text-[#2D3029] dark:text-[#ECEAE4] transition-colors"
          aria-label={`Open notifications (${unreadCount} unread)`}
        >
          <Bell className="w-4 h-4 text-[#6B7265] dark:text-[#9DA396]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C87552] text-white text-[9px] font-bold flex items-center justify-center font-mono">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
