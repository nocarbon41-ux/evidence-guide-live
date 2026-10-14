import React, { useEffect, useRef, useState } from 'react';
import Peer, { MediaConnection } from 'peerjs';
import { Check, Copy, Link2, LoaderCircle, Mic, MicOff, Phone, PhoneOff, ShieldAlert, ShieldCheck, Video, VideoOff } from 'lucide-react';

type CallState = 'idle' | 'starting' | 'waiting' | 'joining' | 'connected' | 'error';

const callClasses = {
  card: 'rounded-xl border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#1C1E19] shadow-xs',
  button: 'inline-flex items-center justify-center gap-2 rounded-lg bg-[#234B38] hover:bg-[#1b3b2c] disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 transition-colors',
  secondary: 'inline-flex items-center justify-center gap-2 rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FFFEFA] dark:bg-[#232720] text-[#2D3029] dark:text-[#ECEAE4] text-xs font-semibold px-3 py-2 transition-colors hover:bg-[#FAF7F0] dark:hover:bg-[#2a2e27]',
  input: 'w-full rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] bg-[#FAF7F0] dark:bg-[#232720] text-[#2D3029] dark:text-[#ECEAE4] px-3 py-2.5 text-sm outline-none focus:border-[#234B38] dark:focus:border-[#3C7054]',
};

export const LiveInterviewCall: React.FC = () => {
  const invitedRoom = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('call') : null;
  const guestView = Boolean(invitedRoom);
  const [state, setState] = useState<CallState>('idle');
  const [error, setError] = useState('');
  const [inviteUrl, setInviteUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [participantName, setParticipantName] = useState('Waiting for guest');
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerRef = useRef<Peer | null>(null);
  const mediaCallRef = useRef<MediaConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) localVideoRef.current.srcObject = localStream;
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);

  useEffect(() => () => {
    mediaCallRef.current?.close();
    peerRef.current?.destroy();
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  const openPeer = (peer: Peer) => {
    peerRef.current = peer;
    peer.on('error', (peerError) => {
      setError(peerError.type === 'peer-unavailable'
        ? 'The interview host is not online. Ask them to reopen the call and send a fresh link.'
        : `Call connection error: ${peerError.message}`);
      setState('error');
    });
    peer.on('disconnected', () => {
      if (state !== 'connected') setError('Connection to the call signaling service was interrupted.');
    });
  };

  const beginHostCall = async () => {
    setError('');
    setState('starting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      setLocalStream(stream);
      const peer = new Peer();
      openPeer(peer);
      peer.on('open', (peerId) => {
        const url = new URL(window.location.href);
        url.searchParams.set('call', peerId);
        setInviteUrl(url.toString());
        setParticipantName('Waiting for guest');
        setState('waiting');
      });
      peer.on('call', (incomingCall) => {
        if (mediaCallRef.current) {
          incomingCall.close();
          return;
        }
        mediaCallRef.current = incomingCall;
        const name = typeof incomingCall.metadata?.displayName === 'string' ? incomingCall.metadata.displayName : 'Guest';
        setParticipantName(name);
        incomingCall.on('stream', (streamFromGuest) => {
          remoteStreamRef.current = streamFromGuest;
          setRemoteStream(streamFromGuest);
          setState('connected');
        });
        incomingCall.on('close', () => {
          remoteStreamRef.current = null;
          setRemoteStream(null);
          setParticipantName('Guest disconnected');
          setState('waiting');
        });
        incomingCall.answer(stream);
      });
    } catch (mediaError) {
      const message = mediaError instanceof Error ? mediaError.message : 'Camera or microphone access failed.';
      setError(message.includes('NotAllowed') || message.includes('Permission')
        ? 'Allow camera and microphone access in your browser, then try again.'
        : `Could not access camera and microphone: ${message}`);
      setState('error');
    }
  };

  const joinCall = async () => {
    if (!invitedRoom || !guestName.trim()) return;
    setError('');
    setState('joining');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      setLocalStream(stream);
      const peer = new Peer();
      openPeer(peer);
      peer.on('open', () => {
        const call = peer.call(invitedRoom, stream, { metadata: { displayName: guestName.trim().slice(0, 60) } });
        if (!call) throw new Error('The call could not be started. Check the invitation link.');
        mediaCallRef.current = call;
        setParticipantName('Interview host');
        call.on('stream', (hostStream) => {
          remoteStreamRef.current = hostStream;
          setRemoteStream(hostStream);
          setState('connected');
        });
        call.on('close', () => {
          remoteStreamRef.current = null;
          setRemoteStream(null);
          setError('The host ended the interview call.');
          setState('error');
        });
      });
    } catch (mediaError) {
      const message = mediaError instanceof Error ? mediaError.message : 'Could not join the interview call.';
      setError(message.includes('NotAllowed') || message.includes('Permission')
        ? 'Allow camera and microphone access in your browser, then try again.'
        : message);
      setState('error');
    }
  };

  const endCall = () => {
    mediaCallRef.current?.close();
    peerRef.current?.destroy();
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaCallRef.current = null;
    peerRef.current = null;
    localStreamRef.current = null;
    remoteStreamRef.current = null;
    setLocalStream(null);
    setRemoteStream(null);
    setInviteUrl('');
    setState('idle');
    setParticipantName('Waiting for guest');
  };

  const toggleTrack = (kind: 'audio' | 'video') => {
    const track = localStream?.getTracks().find((mediaTrack) => mediaTrack.kind === kind);
    if (!track) return;
    track.enabled = !track.enabled;
    if (kind === 'audio') setMicEnabled(track.enabled);
    else setCameraEnabled(track.enabled);
  };

  const copyInvite = async () => {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
    } catch {
      const input = document.createElement('textarea');
      input.value = inviteUrl;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const statusLabel = state === 'connected' ? 'CALL CONNECTED' : state === 'waiting' ? 'WAITING FOR GUEST' : state === 'joining' || state === 'starting' ? 'CONNECTING' : state === 'error' ? 'CONNECTION ISSUE' : guestView ? 'INVITATION RECEIVED' : 'READY TO START';
  const statusColor = state === 'connected' ? 'text-[#2E6B47] dark:text-[#67B985]' : state === 'error' ? 'text-[#B33927] dark:text-[#E0533C]' : 'text-[#6B7265] dark:text-[#9DA396]';

  return (
    <section className={`${callClasses.card} overflow-hidden`} aria-labelledby="secure-call-title">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-b border-[#E6DFD2] dark:border-[#2F342B]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 shrink-0 rounded-lg bg-[#234B38]/10 dark:bg-[#3C7054]/20 text-[#234B38] dark:text-[#7BB68F] flex items-center justify-center"><Video className="w-5 h-5" /></div>
          <div>
            <h2 id="secure-call-title" className="font-editorial text-lg font-semibold text-[#2D3029] dark:text-[#ECEAE4]">{guestView ? 'Join Secure Interview' : 'New Secure Video Call'}</h2>
            <p className="text-xs text-[#6B7265] dark:text-[#9DA396] mt-0.5">Create a private invite link and inspect the remote participant’s live video feed.</p>
          </div>
        </div>
        <div className={`flex items-center gap-2 text-[10px] font-mono font-semibold tracking-wide ${statusColor}`}>
          <span className={`w-2 h-2 rounded-full ${state === 'connected' ? 'bg-emerald-500 animate-pulse' : state === 'error' ? 'bg-red-500' : 'bg-[#C87552]'}`} />{statusLabel}
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 xl:grid-cols-[minmax(0,1.7fr)_minmax(260px,1fr)] gap-5">
        <div className="space-y-3">
          <div className="relative aspect-video min-h-[220px] rounded-xl bg-[#10120F] border border-[#2F342B] overflow-hidden flex items-center justify-center">
            {remoteStream ? (
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" aria-label={`${participantName} video`} />
            ) : (
              <div className="max-w-sm px-6 text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70"><Video className="w-5 h-5" /></div>
                <p className="text-sm font-medium text-white">{state === 'waiting' ? 'Your interview room is ready' : state === 'joining' || state === 'starting' ? 'Preparing the secure call…' : 'Remote participant video will appear here'}</p>
                <p className="text-xs text-white/55">{state === 'waiting' ? 'Share the invite link. The guest appears when they join.' : 'Camera and microphone permission are requested only when you start or join.'}</p>
              </div>
            )}
            {localStream && (
              <div className="absolute right-3 bottom-3 w-28 sm:w-36 aspect-video overflow-hidden rounded-lg border border-white/30 bg-black shadow-lg">
                <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" aria-label="Your camera preview" />
                <span className="absolute left-1.5 bottom-1 text-[9px] text-white bg-black/60 rounded px-1">You</span>
              </div>
            )}
            {remoteStream && <div className="absolute left-3 bottom-3 rounded-md bg-black/65 px-2 py-1 text-[10px] text-white font-medium">{participantName}</div>}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {localStream && <>
              <button onClick={() => toggleTrack('audio')} className={callClasses.secondary} aria-label={micEnabled ? 'Mute microphone' : 'Unmute microphone'}>{micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4 text-[#B33927]" />}{micEnabled ? 'Mic on' : 'Mic off'}</button>
              <button onClick={() => toggleTrack('video')} className={callClasses.secondary} aria-label={cameraEnabled ? 'Turn camera off' : 'Turn camera on'}>{cameraEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4 text-[#B33927]" />}{cameraEnabled ? 'Camera on' : 'Camera off'}</button>
            </>}
            {state === 'connected' && <button onClick={endCall} className="inline-flex items-center gap-2 rounded-lg bg-[#B33927] hover:bg-[#962f20] text-white text-xs font-semibold px-3 py-2"><PhoneOff className="w-4 h-4" /> End call</button>}
          </div>
        </div>

        <div className="space-y-4">
          {guestView ? (
            <div className="space-y-3">
              <div className="rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] p-3 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4]"><Phone className="w-4 h-4 text-[#C87552]" />You were invited to an interview</div>
                <label htmlFor="guest-name" className="block text-[11px] text-[#6B7265] dark:text-[#9DA396]">Name shown to the host</label>
                <input id="guest-name" value={guestName} onChange={(event) => setGuestName(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && void joinCall()} maxLength={60} placeholder="Enter your name" className={callClasses.input} disabled={state === 'joining' || state === 'connected'} />
                {state !== 'connected' && <button onClick={() => void joinCall()} disabled={!guestName.trim() || state === 'joining'} className={`${callClasses.button} w-full`}>
                  {state === 'joining' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />} {state === 'joining' ? 'Joining…' : 'Join interview'}
                </button>}
              </div>
              <p className="text-[11px] leading-relaxed text-[#6B7265] dark:text-[#9DA396]">Your browser will ask for camera and microphone access. Your media travels peer-to-peer over WebRTC; the app does not upload or record it.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {!inviteUrl && state !== 'connected' && (
                <div className="rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] p-3 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4]"><Link2 className="w-4 h-4 text-[#C87552]" />Create an interview room</div>
                  <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396] leading-relaxed">Start your camera, create a room, then copy the invitation link and send it to one participant.</p>
                  <button onClick={() => void beginHostCall()} disabled={state === 'starting'} className={`${callClasses.button} w-full`}>
                    {state === 'starting' ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />} {state === 'starting' ? 'Creating room…' : 'Create call & link'}
                  </button>
                </div>
              )}
              {inviteUrl && <div className="rounded-lg border border-[#E6DFD2] dark:border-[#2F342B] p-3 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4]"><Link2 className="w-4 h-4 text-[#C87552]" />Invitation link</div>
                <div className="flex gap-2">
                  <input readOnly aria-label="Interview invitation link" value={inviteUrl} onFocus={(event) => event.currentTarget.select()} className={`${callClasses.input} min-w-0 font-mono text-[10px]`} />
                  <button onClick={() => void copyInvite()} className={callClasses.secondary} aria-label="Copy invite link">{copied ? <Check className="w-4 h-4 text-[#2E6B47]" /> : <Copy className="w-4 h-4" />}{copied ? 'Copied' : 'Copy'}</button>
                </div>
                <p className="text-[11px] text-[#6B7265] dark:text-[#9DA396]">Room is open. Waiting for {participantName === 'Waiting for guest' ? 'a guest' : participantName}.</p>
                <button onClick={endCall} className={callClasses.secondary}><PhoneOff className="w-4 h-4" /> Close room</button>
              </div>}
            </div>
          )}

          <div className="rounded-lg border border-[#C87552]/30 bg-[#C87552]/5 dark:bg-[#DE805E]/5 p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#2D3029] dark:text-[#ECEAE4]"><ShieldAlert className="w-4 h-4 text-[#C87552]" />Deepfake analysis status</div>
            <div className="flex items-center gap-2 text-[11px] text-[#6B7265] dark:text-[#9DA396]"><ShieldCheck className="w-4 h-4 shrink-0" />Remote video is connected for inspection.</div>
            <p className="text-[11px] leading-relaxed text-[#6B7265] dark:text-[#9DA396]">Automated deepfake classification is not active for this call yet. Existing inspector scores are simulated and must not be treated as a verdict about this guest. Verify identity independently.</p>
          </div>

          <div className="text-[10px] text-[#6B7265] dark:text-[#9DA396] leading-relaxed">
            {error && <p role="alert" className="mb-2 rounded-md border border-[#B33927]/30 bg-[#B33927]/5 p-2 text-[#B33927] dark:text-[#E0533C]">{error}</p>}
            <p>Invite links act like bearer keys: share only with the intended person. A secure HTTPS site (or localhost) and working camera/microphone are required. Peer-to-peer signaling uses the public PeerJS broker; relay/firewall restrictions can prevent connection.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
