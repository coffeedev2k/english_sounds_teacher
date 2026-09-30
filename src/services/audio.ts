import { VoiceMode, FeedbackMode } from '../types';
import { getAssetUrl } from '../utils/assets';

const VOICES: Array<'chart' | 'alex' | 'f1' | 'f2'> = ['chart', 'alex', 'f1', 'f2'];

class AudioManager {
  private audioContext: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private activeSequenceController: AbortController | null = null;
  private volume: number = 0.85;
  private playbackRate: number = 1.0;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentAudio) {
      this.currentAudio.volume = this.volume;
    }
  }

  public setPlaybackRate(rate: number): void {
    this.playbackRate = Math.max(0.5, Math.min(2.0, rate));
    if (this.currentAudio) {
      this.currentAudio.playbackRate = this.playbackRate;
    }
  }

  public ensureContext(): void {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
  }

  private getVoiceDir(voiceMode: VoiceMode): 'chart' | 'alex' | 'f1' | 'f2' {
    if (voiceMode === 'mix') {
      const idx = Math.floor(Math.random() * VOICES.length);
      return VOICES[idx];
    }
    return voiceMode;
  }

  public getSoundUrl(soundId: string, voice: 'chart' | 'alex' | 'f1' | 'f2'): string {
    return getAssetUrl(`audio/${voice}/${soundId}.mp3`);
  }

  public getWordUrl(soundId: string): string {
    return getAssetUrl(`audio/words/${soundId}.mp3`);
  }

  public getYesUrl(): string {
    return getAssetUrl('audio/feedback/yes.mp3');
  }

  public stopAll(): void {
    if (this.activeSequenceController) {
      this.activeSequenceController.abort();
      this.activeSequenceController = null;
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  private playAudioElement(url: string, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        return reject(new DOMException('Aborted', 'AbortError'));
      }

      this.ensureContext();
      const audio = new Audio(url);
      audio.volume = this.volume;
      audio.playbackRate = this.playbackRate;
      this.currentAudio = audio;

      const cleanup = () => {
        audio.removeEventListener('ended', onEnded);
        audio.removeEventListener('error', onError);
        if (signal) {
          signal.removeEventListener('abort', onAbort);
        }
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
      };

      const onEnded = () => {
        cleanup();
        resolve();
      };

      const onError = (e: Event) => {
        cleanup();
        console.warn(`Failed to play audio from ${url}`, e);
        resolve(); // resolve anyway so sequence doesn't deadlock
      };

      const onAbort = () => {
        cleanup();
        audio.pause();
        reject(new DOMException('Aborted', 'AbortError'));
      };

      if (signal) {
        signal.addEventListener('abort', onAbort);
      }
      audio.addEventListener('ended', onEnded);
      audio.addEventListener('error', onError);

      audio.play().catch((err) => {
        cleanup();
        if (err.name === 'AbortError') {
          reject(err);
        } else {
          console.warn('Audio play interrupted or blocked:', err);
          resolve();
        }
      });
    });
  }

  public async playSound(
    soundId: string,
    voiceMode: VoiceMode = 'chart'
  ): Promise<void> {
    this.stopAll();
    const voice = this.getVoiceDir(voiceMode);
    const url = this.getSoundUrl(soundId, voice);
    try {
      await this.playAudioElement(url);
    } catch {
      // aborted or error handled
    }
  }

  public async playWord(soundId: string): Promise<void> {
    this.stopAll();
    const url = this.getWordUrl(soundId);
    try {
      await this.playAudioElement(url);
    } catch {
      // aborted
    }
  }

  public async playSequence(
    soundIds: string[],
    voiceMode: VoiceMode,
    options?: {
      onSoundStart?: (soundId: string, index: number) => void;
      onSoundEnd?: (soundId: string, index: number) => void;
      onComplete?: () => void;
      pauseMs?: number;
    }
  ): Promise<void> {
    this.stopAll();
    const controller = new AbortController();
    this.activeSequenceController = controller;
    const signal = controller.signal;

    // In python script, one directory is chosen randomly for the round
    const voice = this.getVoiceDir(voiceMode);
    const pauseMs = options?.pauseMs ?? 400;

    try {
      for (let i = 0; i < soundIds.length; i++) {
        if (signal.aborted) break;
        const soundId = soundIds[i];

        options?.onSoundStart?.(soundId, i);
        const url = this.getSoundUrl(soundId, voice);
        await this.playAudioElement(url, signal);
        options?.onSoundEnd?.(soundId, i);

        if (i < soundIds.length - 1) {
          await new Promise<void>((resolve, reject) => {
            const timer = setTimeout(resolve, pauseMs);
            signal.addEventListener(
              'abort',
              () => {
                clearTimeout(timer);
                reject(new DOMException('Aborted', 'AbortError'));
              },
              { once: true }
            );
          });
        }
      }
      if (!signal.aborted) {
        options?.onComplete?.();
      }
    } catch {
      // Sequence was cancelled or aborted
    } finally {
      if (this.activeSequenceController === controller) {
        this.activeSequenceController = null;
      }
    }
  }

  public playMistakeTone(): void {
    try {
      this.ensureContext();
      if (!this.audioContext) return;

      const now = this.audioContext.currentTime;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(this.volume * 0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn('Mistake tone error', e);
    }
  }

  public playSuccessChime(): void {
    try {
      this.ensureContext();
      if (!this.audioContext) return;

      const now = this.audioContext.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        if (!this.audioContext) return;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const startTime = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(this.volume * 0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch (e) {
      console.warn('Success chime error', e);
    }
  }

  public async playFeedback(
    type: 'success' | 'mistake',
    soundId?: string,
    feedbackMode: FeedbackMode = 'yes'
  ): Promise<void> {
    if (type === 'mistake') {
      this.playMistakeTone();
      return;
    }

    if (feedbackMode === 'none') {
      this.playSuccessChime();
      return;
    }

    if (feedbackMode === 'word' && soundId) {
      try {
        await this.playAudioElement(this.getWordUrl(soundId));
      } catch {
        this.playSuccessChime();
      }
      return;
    }

    // Default 'yes' feedback (from python: mp3.words.chart/yes.mp3)
    try {
      await this.playAudioElement(this.getYesUrl());
    } catch {
      this.playSuccessChime();
    }
  }
}

export const audioManager = new AudioManager();
