import { useCallback, useEffect, useRef, useState } from 'react';
import { slides } from '../slides';
import { DECK_CHANNEL, TIMER_SECONDS } from '../theme';
import { createResetTimer, getTimerRemaining } from '../lib/timer';
import type { DeckState, TimerState } from '../types';

type DeckMessage =
  | { type: 'hello' }
  | { type: 'state'; state: DeckState }
  | { type: 'navigate'; index: number }
  | { type: 'timer'; timer: TimerState };

const clampIndex = (index: number) => Math.max(0, Math.min(slides.length - 1, index));
const initialIndex = () => {
  const parsed = Number(window.location.hash.replace('#', ''));
  return Number.isInteger(parsed) && parsed > 0 ? clampIndex(parsed - 1) : 0;
};

export function useDeckSync(role: 'editor' | 'presenter') {
  const [state, setState] = useState<DeckState>(() => ({
    index: initialIndex(),
    presenting: false,
    timer: createResetTimer(),
  }));
  const stateRef = useRef(state);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const lastPeerMessage = useRef(0);
  const [peerConnected, setPeerConnected] = useState(false);
  stateRef.current = state;

  const post = useCallback((message: DeckMessage) => {
    channelRef.current?.postMessage(message);
  }, []);

  const commit = useCallback((next: DeckState) => {
    stateRef.current = next;
    setState(next);
    post({ type: 'state', state: next });
  }, [post]);

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel(DECK_CHANNEL);
    channelRef.current = channel;
    channel.onmessage = (event: MessageEvent<DeckMessage>) => {
      const message = event.data;
      lastPeerMessage.current = Date.now();
      setPeerConnected(true);
      if (message.type === 'hello') {
        if (role === 'editor') channel.postMessage({ type: 'state', state: stateRef.current });
        return;
      }
      if (message.type === 'navigate') {
        setState((previous) => ({ ...previous, index: clampIndex(message.index) }));
        return;
      }
      if (message.type === 'timer') {
        setState((previous) => ({ ...previous, timer: message.timer }));
        return;
      }
      setState({
        ...message.state,
        index: clampIndex(message.state.index),
      });
    };
    channel.postMessage({ type: 'hello' });
    const helloInterval = role === 'presenter' ? window.setInterval(() => channel.postMessage({ type: 'hello' }), 2500) : undefined;
    // The presenter says hello every 2.5s and the editor answers, so silence
    // for 6s means the other window has closed.
    const peerCheck = window.setInterval(() => {
      if (Date.now() - lastPeerMessage.current > 6000) setPeerConnected(false);
    }, 1000);
    return () => {
      if (helloInterval) window.clearInterval(helloInterval);
      window.clearInterval(peerCheck);
      channel.close();
      channelRef.current = null;
    };
  }, [role]);

  useEffect(() => {
    window.history.replaceState(null, '', `${window.location.pathname}#${state.index + 1}`);
    document.title = `${state.index + 1}/${slides.length} — ${slides[state.index].title} | Heads-Up`;
  }, [state.index]);

  useEffect(() => {
    if (role !== 'editor') return;
    const interval = window.setInterval(() => {
      const timer = stateRef.current.timer;
      if (!timer.running) return;
      post({
        type: 'timer',
        timer: { remaining: getTimerRemaining(timer), running: true, updatedAt: Date.now() },
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [post, role]);

  const navigate = useCallback((index: number) => {
    const nextIndex = clampIndex(index);
    const nextState = { ...stateRef.current, index: nextIndex };
    stateRef.current = nextState;
    setState(nextState);
    post({ type: 'navigate', index: nextIndex });
  }, [post]);

  const next = useCallback(() => navigate(stateRef.current.index + 1), [navigate]);
  const previous = useCallback(() => navigate(stateRef.current.index - 1), [navigate]);

  const setPresenting = useCallback((presenting: boolean) => {
    const current = stateRef.current;
    const now = Date.now();
    const timer = presenting
      ? { remaining: getTimerRemaining(current.timer, now), running: true, updatedAt: now }
      : current.timer;
    commit({ ...current, presenting, timer });
  }, [commit]);

  const controlTimer = useCallback((action: 'toggle' | 'reset') => {
    const current = stateRef.current;
    if (action === 'reset') {
      commit({ ...current, timer: createResetTimer() });
      return;
    }
    const now = Date.now();
    const timer: TimerState = {
      remaining: getTimerRemaining(current.timer, now),
      running: !current.timer.running,
      updatedAt: now,
    };
    commit({ ...current, timer });
  }, [commit]);

  return { state, navigate, next, previous, setPresenting, controlTimer, peerConnected, timerLimit: TIMER_SECONDS };
}
