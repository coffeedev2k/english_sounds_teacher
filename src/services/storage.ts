import { GameProgress, GameSettings } from '../types';

const SETTINGS_KEY = 'est_settings_v1';
const PROGRESS_KEY = 'est_progress_v1';

export const DEFAULT_SETTINGS: GameSettings = {
  preset: 'quiz',
  voiceMode: 'mix',
  cardStyle: 'chart',
  layoutMode: 'scattered',
  feedbackMode: 'yes',
  autoReplay: true,
  autoReplayIntervalSec: 5,
  successThreshold: 10,
  maxSequenceLength: 3,
  volume: 0.85,
  playbackRate: 1.0,
  theme: 'slate'
};

export const DEFAULT_PROGRESS: GameProgress = {
  preset: 'quiz',
  currentGroupIndex: 0,
  sequenceLength: 1,
  currentStreak: 0,
  totalCorrect: 0,
  totalMistakes: 0,
  bestStreak: 0,
  customSoundIds: []
};

export function loadSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load settings from localStorage', err);
  }
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: GameSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Failed to save settings to localStorage', err);
  }
}

export function loadProgress(): GameProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_PROGRESS, ...parsed };
    }
  } catch (err) {
    console.warn('Failed to load progress from localStorage', err);
  }
  return DEFAULT_PROGRESS;
}

export function saveProgress(progress: GameProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (err) {
    console.warn('Failed to save progress to localStorage', err);
  }
}

export function resetStoredProgress(preset: GameSettings['preset']): GameProgress {
  const fresh: GameProgress = {
    ...DEFAULT_PROGRESS,
    preset,
    currentGroupIndex: 0,
    sequenceLength: 1,
    currentStreak: 0
  };
  saveProgress(fresh);
  return fresh;
}
