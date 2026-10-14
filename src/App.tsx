import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { LiveVideoCallView } from './components/live/LiveVideoCallView';
import { MediaUploadView } from './components/upload/MediaUploadView';
import { CaseDossiersView } from './components/cases/CaseDossiersView';
import { CaseDetailModal } from './components/cases/CaseDetailModal';
import { AdminMonitoringView } from './components/admin/AdminMonitoringView';
import { AuthModal } from './components/auth/AuthModal';
import { NotificationDrawer } from './components/notifications/NotificationDrawer';
import { ForensicReportModal } from './components/reports/ForensicReportModal';
import { INITIAL_USERS, INITIAL_CASES, INITIAL_NOTIFICATIONS } from './data/mockCases';
import { UserProfile, ForensicCase, SystemNotification, AnnotationItem } from './types';

export default function App() {
  // Navigation & Layout
  const [activeTab, setActiveTab] = useState<string>(() =>
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('call')
      ? 'live_call'
      : 'dashboard'
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('egl_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('egl_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('egl_theme', 'light');
    }
  }, [darkMode]);

  // User & Authentication
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USERS[0]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Evidence Dossiers
  const [cases, setCases] = useState<ForensicCase[]>(INITIAL_CASES);
  const [selectedCase, setSelectedCase] = useState<ForensicCase | null>(null);
  const [reportCase, setReportCase] = useState<ForensicCase | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  // Global alert sender
  const handleSendAlert = (title: string, message: string, type: 'alert' | 'warning' | 'info' | 'success') => {
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      title,
      message,
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Add annotation to case
  const handleAddAnnotation = (caseId: string, annotation: AnnotationItem) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const updated = {
          ...c,
          annotations: [...c.annotations, annotation]
        };
        if (selectedCase?.id === caseId) setSelectedCase(updated);
        return updated;
      }
      return c;
    }));

    handleSendAlert(
      'Investigation Note Logged',
      `Annotation added to Case #${selectedCase?.caseNumber || caseId}.`,
      'info'
    );
  };

  // Add new case from snapshot or upload
  const handleSaveNewCase = (newCase: ForensicCase) => {
    setCases(prev => [newCase, ...prev]);
    setSelectedCase(newCase);
  };

  // Capture snapshot from Live Call
  const handleCaptureLiveEvidence = (partialCase: Partial<ForensicCase>) => {
    const fullCase: ForensicCase = {
      id: `case-${Date.now()}`,
      caseNumber: partialCase.caseNumber || `EGL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      title: partialCase.title || 'Live Intercept Snapshot',
      targetSubject: partialCase.targetSubject || 'Unknown Subject',
      sourceContext: partialCase.sourceContext || 'Live Encrypted Session',
      mediaType: partialCase.mediaType || 'live_stream',
      status: partialCase.status || 'under_investigation',
      threatLevel: partialCase.threatLevel || 'medium',
      dateCreated: partialCase.dateCreated || new Date().toISOString(),
      lastModified: partialCase.lastModified || new Date().toISOString(),
      investigator: currentUser.name,
      organization: currentUser.organization,
      sha256: partialCase.sha256 || '9fa7' + Math.random().toString(16).substring(2, 10),
      thumbnailUrl: partialCase.thumbnailUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      metrics: partialCase.metrics || {
        authenticityScore: 50,
        deepfakeProbability: 50,
        ganArtifacts: 40,
        blinkAnomalyRate: 30,
        rppgPulseSync: 50,
        phonemeDesyncMs: 25,
        audioVocoderSynth: 30,
        compressionDiscontinuity: 40,
        metadataAltered: false
      },
      keyFindings: partialCase.keyFindings || ['Live stream snapshot acquired and hashed.'],
      anomaliesDetected: partialCase.anomaliesDetected || [],
      chainOfCustody: partialCase.chainOfCustody || [],
      annotations: partialCase.annotations || [],
      verifiedBy: currentUser.name,
      verificationVerdict: partialCase.verificationVerdict || 'PENDING VERIFICATION'
    };

    setCases(prev => [fullCase, ...prev]);
  };

  const handleSelectCaseById = (caseId: string) => {
    const found = cases.find(c => c.id === caseId);
    if (found) {
      setSelectedCase(found);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAF7F0] dark:bg-[#131512] text-[#2D3029] dark:text-[#ECEAE4] transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileNavOpen}
        setMobileOpen={setMobileNavOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        liveCallActive={activeTab === 'live_call'}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Global Header */}
        <Header
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          notifications={notifications}
          currentUser={currentUser}
          onQuickScan={() => setActiveTab('media_forensics')}
          cases={cases}
          onSelectCase={(c) => setSelectedCase(c)}
        />

        {/* Dynamic View Router */}
        <main className="flex-1 pb-16">
          {activeTab === 'dashboard' && (
            <DashboardView
              cases={cases}
              onSelectCase={(c) => setSelectedCase(c)}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'live_call' && (
            <LiveVideoCallView
              onCaptureEvidence={handleCaptureLiveEvidence}
              onSendAlert={handleSendAlert}
            />
          )}

          {activeTab === 'media_forensics' && (
            <MediaUploadView
              onSaveToCases={handleSaveNewCase}
              onSendAlert={handleSendAlert}
              onOpenReport={(c) => setReportCase(c)}
            />
          )}

          {activeTab === 'cases' && (
            <CaseDossiersView
              cases={cases}
              onSelectCase={(c) => setSelectedCase(c)}
              onNewScan={() => setActiveTab('media_forensics')}
            />
          )}

          {activeTab === 'admin_monitor' && (
            <AdminMonitoringView
              onSendAlert={handleSendAlert}
            />
          )}
        </main>
      </div>

      {/* Case Details Dossier Modal */}
      <CaseDetailModal
        caseData={selectedCase}
        isOpen={Boolean(selectedCase)}
        onClose={() => setSelectedCase(null)}
        onAddAnnotation={handleAddAnnotation}
        onExportReport={(c) => {
          setSelectedCase(null);
          setReportCase(c);
        }}
      />

      {/* Official Forensic Report Certificate Modal */}
      <ForensicReportModal
        caseData={reportCase}
        isOpen={Boolean(reportCase)}
        onClose={() => setReportCase(null)}
      />

      {/* Identity & Clearance Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onSelectUser={(u) => {
          setCurrentUser(u);
          handleSendAlert('Identity Switched', `Logged in as ${u.name} (${u.organization}).`, 'info');
        }}
      />

      {/* Real-time Threat Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
        onSelectCaseById={handleSelectCaseById}
        onDismiss={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
      />
    </div>
  );
}
