import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  KeyRound, 
  Lock, 
  UserCheck, 
  Check, 
  Building2, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { UserProfile } from '../../types';
import { INITIAL_USERS } from '../../data/mockCases';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
}) => {
  const [selectedId, setSelectedId] = useState(currentUser.id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleApply = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const found = INITIAL_USERS.find(u => u.id === selectedId);
      if (found) onSelectUser(found);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] text-[#2D3029] dark:text-[#ECEAE4] shadow-2xl overflow-hidden transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#181A16]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#234B38] text-[#FAF7F0]">
              <Lock className="w-4 h-4 text-[#DE805E]" />
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-sm font-bold text-[#2D3029] dark:text-[#ECEAE4]">
                Investigator Identity & Security Clearance
              </h2>
              <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">
                Role-Based Access Control · PGP Key Fingerprint Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#6B7265] hover:text-[#2D3029] dark:hover:text-[#ECEAE4]"
            aria-label="Close credentials modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="text-xs text-[#6B7265] dark:text-[#9DA396] leading-relaxed">
            Select an authorized investigator profile to simulate role permissions across deepfake verification desks, case locks, and audit chains:
          </div>

          {/* Profile Selector Cards */}
          <div className="space-y-3">
            {INITIAL_USERS.map((user) => {
              const isCurrent = user.id === selectedId;
              return (
                <div
                  key={user.id}
                  onClick={() => setSelectedId(user.id)}
                  className={`cursor-pointer rounded-lg border p-3.5 transition-all text-left flex items-start gap-3 relative
                    ${isCurrent 
                      ? 'border-[#234B38] dark:border-[#DE805E] bg-[#FAF7F0] dark:bg-[#232720] ring-1 ring-[#234B38]/30 dark:ring-[#DE805E]/40' 
                      : 'border-[#E6DFD2] dark:border-[#2F342B] hover:border-[#6B7265] dark:hover:border-[#9DA396] bg-[#FFFEFA] dark:bg-[#1C1E19]'
                    }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#E6DFD2] dark:border-[#2F342B] shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-[#2D3029] dark:text-[#ECEAE4] truncate">
                        {user.name}
                      </div>
                      <span className="text-[10px] font-mono text-[#234B38] dark:text-[#DE805E] font-medium">
                        {user.securityClearance.split(' - ')[0]}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#6B7265] dark:text-[#9DA396] flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">{user.organization}</span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#E6DFD2]/60 dark:border-[#2F342B] flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#6B7265] dark:text-[#9DA396] font-mono">
                      <span>ROLE: {user.role.toUpperCase()}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <KeyRound className="w-3 h-3 text-[#C87552]" />
                        PGP: {user.pgpKeyId}
                      </span>
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-[#234B38] text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Privacy & Compliance Notice */}
          <div className="p-3 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#232720] text-[11px] text-[#6B7265] dark:text-[#9DA396] space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-[#2D3029] dark:text-[#ECEAE4]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B47] dark:text-[#438D62]" />
              Journalistic Zero-Knowledge Protection
            </div>
            <p className="leading-normal">
              Biometric telemetry is evaluated locally and streamed via end-to-end encrypted tunnels. Zero raw biometric face meshes are permanently retained without investigator sign-off.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#181A16]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] text-xs font-medium hover:bg-[#FAF7F0] dark:hover:bg-[#232720] text-[#2D3029] dark:text-[#ECEAE4] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-[#234B38] hover:bg-[#1b3b2c] text-white text-xs font-medium transition-colors shadow-xs flex items-center gap-2"
          >
            {isSubmitting ? 'Authenticating...' : 'Switch Identity'}
          </button>
        </div>
      </div>
    </div>
  );
};
