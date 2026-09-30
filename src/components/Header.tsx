import React, { useState } from 'react';
import {
  RotateCcw,
  Settings,
  BookOpen,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Headphones,
  ListFilter,
  Play
} from 'lucide-react';
import { GameProgress, GameSettings, TrainingGroup } from '../types';

interface HeaderProps {
  currentGroup: TrainingGroup;
  currentGroupIndex: number;
  totalGroups: number;
  progress: GameProgress;
  settings: GameSettings;
  isPlayingAudio: boolean;
  onReplay: () => void;
  onOpenSettings: () => void;
  onOpenChart: () => void;
  onOpenGroupSelector: () => void;
  onResetProgress: () => void;
  onUpdateVolume: (vol: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentGroup,
  currentGroupIndex,
  totalGroups,
  progress,
  settings,
  isPlayingAudio,
  onReplay,
  onOpenSettings,
  onOpenChart,
  onOpenGroupSelector,
  onResetProgress,
  onUpdateVolume
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [prevVolume, setPrevVolume] = useState(settings.volume);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (settings.volume > 0) {
      setPrevVolume(settings.volume);
      onUpdateVolume(0);
    } else {
      onUpdateVolume(prevVolume || 0.85);
    }
  };

  const totalGuesses = progress.totalCorrect + progress.totalMistakes;
  const accuracy = totalGuesses > 0 ? Math.round((progress.totalCorrect / totalGuesses) * 100) : 100;
  const streakPercent = Math.min(100, Math.round((progress.currentStreak / settings.successThreshold) * 100));

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white px-4 py-2.5 shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Group Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base leading-tight">Sounds Teacher</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {settings.preset}
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenGroupSelector}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors text-left"
              >
                <span className="font-semibold text-slate-300">
                  Group {currentGroupIndex + 1}/{totalGroups}:
                </span>{' '}
                <span className="truncate max-w-[140px] sm:max-w-xs">{currentGroup.name}</span>
                <ListFilter className="w-3 h-3 text-sky-400 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Progress & Streak Meters */}
        <div className="flex items-center gap-4 sm:gap-6 order-3 sm:order-2 w-full sm:w-auto justify-between sm:justify-center border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
          {/* Replay Button */}
          <button
            type="button"
            onClick={onReplay}
            title="Replay Sounds (Space or R)"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium text-xs transition-all shadow-sm active:scale-95 cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-500 text-slate-950 font-bold ring-2 ring-amber-400/50 animate-pulse'
                : 'bg-sky-600 hover:bg-sky-500 text-white'
            }`}
          >
            {isPlayingAudio ? (
              <Volume2 className="w-4 h-4 animate-bounce" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isPlayingAudio ? 'Playing...' : 'Replay'}</span>
            <kbd className="hidden md:inline px-1 py-0.2 bg-black/20 rounded text-[10px] text-white/80">
              Space
            </kbd>
          </button>

          {/* Streak Meter */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-28 sm:w-36 text-[11px] mb-0.5">
              <span className="text-slate-400">Streak:</span>
              <span className="font-mono font-bold text-sky-300">
                {progress.currentStreak} / {settings.successThreshold}
              </span>
            </div>
            <div className="w-28 sm:w-36 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
              <div
                className="h-full bg-linear-to-r from-sky-500 to-emerald-400 transition-all duration-300 rounded-full"
                style={{ width: `${streakPercent}%` }}
              />
            </div>
          </div>

          {/* Sequence Difficulty & Accuracy */}
          <div className="hidden lg:flex items-center gap-3 text-xs">
            <div className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-slate-300">
              <span className="text-slate-400">Length:</span>{' '}
              <span className="font-bold text-amber-400">{progress.sequenceLength} sound{progress.sequenceLength > 1 ? 's' : ''}</span>
            </div>
            <div className="bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 text-slate-300">
              <span className="text-slate-400">Accuracy:</span>{' '}
              <span className="font-bold text-emerald-400">{accuracy}%</span>
            </div>
          </div>
        </div>

        {/* Right Tools & Audio */}
        <div className="flex items-center gap-1 sm:gap-2 order-2 sm:order-3">
          {/* Volume Control */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700">
            <button
              type="button"
              onClick={toggleMute}
              title={settings.volume > 0 ? 'Mute' : 'Unmute'}
              className="text-slate-300 hover:text-white"
            >
              {settings.volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-sky-400" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.volume}
              onChange={(e) => onUpdateVolume(parseFloat(e.target.value))}
              className="w-14 sm:w-16 accent-sky-500 h-1.5 cursor-pointer"
              title={`Volume: ${Math.round(settings.volume * 100)}%`}
            />
          </div>

          {/* Chart Explorer */}
          <button
            type="button"
            onClick={onOpenChart}
            title="Explore 44 Sounds Chart & Mouth Articulation"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 text-xs transition-colors"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline font-medium">Chart</span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            title="Settings (Esc)"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Reset progress */}
          <button
            type="button"
            onClick={onResetProgress}
            title="Restart from Group 1 (del progress.ini)"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title="Toggle Fullscreen (F)"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
