import React from 'react';
import { 
  X, 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Trash2, 
  CheckCheck,
  ExternalLink
} from 'lucide-react';
import { SystemNotification, ForensicCase } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SystemNotification[];
  onMarkAllRead: () => void;
  onSelectCaseById: (caseId: string) => void;
  onDismiss: (id: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectCaseById,
  onDismiss,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside 
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm border-l border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] text-[#2D3029] dark:text-[#ECEAE4] shadow-2xl flex flex-col justify-between transition-transform duration-300"
        aria-label="Notification center"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#181A16] shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#C87552] dark:text-[#DE805E]" />
            <h2 className="text-xs font-bold uppercase font-mono tracking-wider">
              Real-time Threat Alerts ({notifications.filter(n => !n.read).length})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllRead}
              className="p-1 rounded text-[#6B7265] hover:text-[#2D3029] dark:hover:text-[#ECEAE4]"
              title="Mark all as read"
              aria-label="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-[#6B7265] hover:text-[#2D3029] dark:hover:text-[#ECEAE4]"
              aria-label="Close notification panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#6B7265] dark:text-[#9DA396]">
              No active security notifications
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-lg border text-xs space-y-1.5 transition-all relative group
                  ${item.type === 'alert' 
                    ? 'border-[#B33927]/30 bg-[#B33927]/5' 
                    : item.type === 'warning'
                    ? 'border-[#C97A1E]/30 bg-[#C97A1E]/5'
                    : item.type === 'success'
                    ? 'border-[#2E6B47]/30 bg-[#2E6B47]/5'
                    : 'border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0]/60 dark:bg-[#232720]/60'
                  }
                  ${!item.read ? 'ring-1 ring-[#C87552]/40' : 'opacity-85'}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    {item.type === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-[#B33927]" />}
                    {item.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-[#C97A1E]" />}
                    {item.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6B47]" />}
                    {item.type === 'info' && <Info className="w-3.5 h-3.5 text-[#234B38]" />}
                    <span className="text-[11px] leading-tight">{item.title}</span>
                  </div>
                  <button
                    onClick={() => onDismiss(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#6B7265] hover:text-[#B33927] transition-opacity"
                    title="Dismiss alert"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-[11px] text-[#2D3029] dark:text-[#ECEAE4] leading-normal">
                  {item.message}
                </p>

                <div className="pt-1 flex items-center justify-between text-[10px] text-[#6B7265] dark:text-[#9DA396] font-mono">
                  <span>{item.timestamp}</span>
                  {item.caseId && (
                    <button
                      onClick={() => {
                        onSelectCaseById(item.caseId!);
                        onClose();
                      }}
                      className="text-[#234B38] dark:text-[#DE805E] font-medium hover:underline flex items-center gap-1"
                    >
                      <span>Inspect Dossier</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#181A16] text-center text-[11px] text-[#6B7265] dark:text-[#9DA396]">
          Real-time WebRTC & Ingestion Listener Active
        </div>
      </aside>
    </>
  );
};
