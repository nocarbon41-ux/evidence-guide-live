import React from 'react';
import { 
  LayoutDashboard, 
  Video, 
  FileSearch, 
  FolderArchive, 
  ShieldCheck, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight,
  Fingerprint,
  Radio,
  UserCheck
} from 'lucide-react';
import { UserProfile } from '../../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  liveCallActive?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  darkMode,
  setDarkMode,
  currentUser,
  onOpenAuth,
  liveCallActive = false,
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Investigation Desk',
      sublabel: 'Overview & Activity',
      icon: LayoutDashboard,
    },
    {
      id: 'live_call',
      label: 'Live Interview Vet',
      sublabel: 'Real-time Deepfake HUD',
      icon: Video,
      badge: liveCallActive ? 'LIVE' : undefined,
    },
    {
      id: 'media_forensics',
      label: 'Media Forensics Lab',
      sublabel: 'Image · Video · PDF · DOCX',
      icon: FileSearch,
    },
    {
      id: 'cases',
      label: 'Evidence Dossiers',
      sublabel: 'Chain of Custody & Hash Archive',
      icon: FolderArchive,
    },
    {
      id: 'admin_monitor',
      label: 'System Monitoring',
      sublabel: 'Audit Ledger & Privacy',
      icon: ShieldCheck,
    },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 h-screen z-50 flex flex-col justify-between transition-all duration-300 ease-in-out border-r
          ${darkMode ? 'bg-[#181A16] border-[#2A2E25]' : 'bg-[#FFFEFA] border-[#E6DFD2]'}
          ${collapsed ? 'w-20' : 'w-72'}
          ${mobileOpen ? 'left-0' : '-left-full md:left-0'}
          shadow-xs`}
        aria-label="Primary Navigation"
      >
        {/* Top Branding Section */}
        <div>
          <div className="flex items-center justify-between px-4 py-5 border-b border-[#E6DFD2] dark:border-[#2A2E25]">
            <div className={`flex items-center gap-3 overflow-hidden ${collapsed ? 'justify-center w-full' : ''}`}>
              <div className="w-10 h-10 rounded-lg bg-[#234B38] dark:bg-[#3C7054] text-[#FAF7F0] flex items-center justify-center shrink-0 shadow-sm">
                <Fingerprint className="w-6 h-6 text-[#DE805E] dark:text-[#E89E82]" />
              </div>
              {!collapsed && (
                <div className="leading-tight">
                  <div className="font-bold tracking-tight text-sm text-[#2D3029] dark:text-[#ECEAE4] flex items-center gap-2">
                    EVIDENCE GUIDE
                    <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-[#FAF7F0] dark:bg-[#232720] border border-[#E6DFD2] dark:border-[#2F342B] text-[#C87552] dark:text-[#DE805E] font-medium">LIVE</span>
                  </div>
                  <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396] font-normal tracking-wide">
                    Deepfake & Morph Forensics
                  </p>
                </div>
              )}
            </div>

            {/* Collapse toggle (desktop only) */}
            {!collapsed && (
              <button
                onClick={() => setCollapsed(true)}
                className="hidden md:flex p-1.5 rounded-md hover:bg-[#FAF7F0] dark:hover:bg-[#232720] text-[#6B7265] dark:text-[#9DA396] transition-colors"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Collapsed Expand Button */}
          {collapsed && (
            <div className="hidden md:flex justify-center py-2 border-b border-[#E6DFD2] dark:border-[#2A2E25]">
              <button
                onClick={() => setCollapsed(false)}
                className="p-1.5 rounded-md hover:bg-[#FAF7F0] dark:hover:bg-[#232720] text-[#6B7265] dark:text-[#9DA396] transition-colors"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5" aria-label="Main menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={collapsed ? `${item.label} (${item.sublabel})` : undefined}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm group relative
                    ${isActive 
                      ? 'bg-[#234B38] text-[#FAF7F0] font-medium shadow-xs' 
                      : 'text-[#2D3029] dark:text-[#ECEAE4] hover:bg-[#FAF7F0] dark:hover:bg-[#232720]'
                    }
                    ${collapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-[#FAF7F0]' : 'text-[#6B7265] dark:text-[#9DA396] group-hover:text-[#234B38] dark:group-hover:text-[#DE805E]'}`} />
                  
                  {!collapsed && (
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <div className="truncate">
                        <div className="truncate text-xs font-semibold">{item.label}</div>
                        <div className={`text-[10px] truncate ${isActive ? 'text-[#FAF7F0]/80' : 'text-[#6B7265] dark:text-[#9DA396]'}`}>
                          {item.sublabel}
                        </div>
                      </div>

                      {item.badge && (
                        <span className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#C87552] text-white shrink-0 animate-pulse">
                          <Radio className="w-2.5 h-2.5" />
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Active bar indicator on collapsed mode */}
                  {collapsed && isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#C87552] rounded-r-md" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Control & User Card */}
        <div className="p-3 border-t border-[#E6DFD2] dark:border-[#2A2E25] space-y-3">
          {/* Light/Dark Mode Switcher */}
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between px-2'} text-xs text-[#6B7265] dark:text-[#9DA396]`}>
            {!collapsed && (
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#6B7265] dark:text-[#9DA396]">
                Theme Mode
              </span>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#232720] hover:text-[#234B38] dark:hover:text-[#DE805E] transition-colors"
              title={darkMode ? 'Switch to Warm Cream Light' : 'Switch to Dark Espresso'}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#234B38]" />}
            </button>
          </div>

          {/* User Account Card */}
          <div 
            onClick={onOpenAuth}
            className={`cursor-pointer rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#232720] transition-all hover:border-[#234B38] dark:hover:border-[#DE805E] p-2
              ${collapsed ? 'flex justify-center' : 'flex items-center gap-2.5'}`}
            title="Switch Investigator Profile / Security Credentials"
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[#E6DFD2] dark:border-[#2F342B] shrink-0" 
            />
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4] truncate">
                    {currentUser.name}
                  </div>
                  <UserCheck className="w-3 h-3 text-[#234B38] dark:text-[#3C7054]" />
                </div>
                <div className="text-[10px] text-[#6B7265] dark:text-[#9DA396] truncate">
                  {currentUser.role === 'lead_journalist' ? 'Lead Journalist' : currentUser.role === 'forensic_analyst' ? 'Forensic Analyst' : 'Newsroom Admin'}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
