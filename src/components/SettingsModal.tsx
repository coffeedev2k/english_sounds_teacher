import React from 'react';
import { GameSettings, PresetMode, VoiceMode, CardStyle, LayoutMode, FeedbackMode, ThemeMode } from '../types';
import { X, Settings, Volume2, Layout, Sparkles, Sliders } from 'lucide-react';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onClose: () => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  onResetProgress
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Settings &amp; Configuration</h2>
              <p className="text-xs text-slate-400">Configure modes, voices, rules, and visuals</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Preset Mode */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Game Mode Preset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                [
                  { id: 'quiz', label: 'Quiz Mode', desc: 'Standard 12 groups (threshold 10)' },
                  { id: 'training', label: 'Training Mode', desc: 'Intensive workout (threshold 30)' },
                  { id: 'minimal_pairs', label: 'Minimal Pairs', desc: 'Tricky phonetic contrasts' },
                  { id: 'full', label: 'Full Chart', desc: 'Vowels, diphthongs, consonants' },
                  { id: 'custom', label: 'Custom', desc: 'Select individual sounds' }
                ] as const
              ).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onUpdateSettings({ preset: preset.id as PresetMode })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    settings.preset === preset.id
                      ? 'border-sky-500 bg-sky-500/15 text-white ring-1 ring-sky-500'
                      : 'border-slate-800 bg-slate-850 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-semibold text-xs text-white">{preset.label}</div>
                  <div className="text-[11px] text-slate-400 mt-1 leading-tight">{preset.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Voice Mode */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-sky-400" />
              Voice Selection
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(
                [
                  { id: 'mix', label: 'Random Mix' },
                  { id: 'chart', label: 'Chart Voice' },
                  { id: 'alex', label: 'Alex (Male)' },
                  { id: 'f1', label: 'Female 1' },
                  { id: 'f2', label: 'Female 2' }
                ] as const
              ).map((voice) => (
                <button
                  key={voice.id}
                  type="button"
                  onClick={() => onUpdateSettings({ voiceMode: voice.id as VoiceMode })}
                  className={`px-3 py-2 rounded-lg border text-center text-xs font-medium transition-all ${
                    settings.voiceMode === voice.id
                      ? 'border-sky-500 bg-sky-500/15 text-sky-300 ring-1 ring-sky-500'
                      : 'border-slate-800 bg-slate-850 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {voice.label}
                </button>
              ))}
            </div>
          </div>

          {/* Display & Layout Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Layout Mode */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-slate-400 flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-sky-400" />
                Board Layout
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: 'scattered', label: 'Scattered Canvas', desc: 'Pygame style' },
                    { id: 'grid', label: 'Clean Grid', desc: 'Aligned rows' }
                  ] as const
                ).map((layout) => (
                  <button
                    key={layout.id}
                    type="button"
                    onClick={() => onUpdateSettings({ layoutMode: layout.id as LayoutMode })}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      settings.layoutMode === layout.id
                        ? 'border-sky-500 bg-sky-500/15 text-white ring-1 ring-sky-500'
                        : 'border-slate-800 bg-slate-850 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-xs">{layout.label}</div>
                    <div className="text-[10px] text-slate-400">{layout.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Card Style */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Card Artwork Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: 'chart', label: 'Classic Chart' },
                    { id: 'smiles', label: 'Smiley Cards' }
                  ] as const
                ).map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => onUpdateSettings({ cardStyle: style.id as CardStyle })}
                    className={`p-2.5 rounded-lg border text-center text-xs font-semibold transition-all ${
                      settings.cardStyle === style.id
                        ? 'border-sky-500 bg-sky-500/15 text-sky-300 ring-1 ring-sky-500'
                        : 'border-slate-800 bg-slate-850 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Correct Guess Feedback Audio */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Audio Feedback on Success
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'yes', label: 'Say "Yes!" (Original)', desc: 'From python script' },
                  { id: 'word', label: 'Pronounce Word', desc: 'e.g. "cheese", "bed"' },
                  { id: 'none', label: 'Gentle Chime', desc: 'Minimal tone only' }
                ] as const
              ).map((fb) => (
                <button
                  key={fb.id}
                  type="button"
                  onClick={() => onUpdateSettings({ feedbackMode: fb.id as FeedbackMode })}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    settings.feedbackMode === fb.id
                      ? 'border-sky-500 bg-sky-500/15 text-white ring-1 ring-sky-500'
                      : 'border-slate-800 bg-slate-850 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-xs">{fb.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{fb.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Sliders */}
          <div className="space-y-4 bg-slate-850 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-slate-400">
              <Sliders className="w-4 h-4 text-sky-400" />
              Progression Rules
            </div>

            {/* Success Threshold */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Streak needed to advance:</span>
                <span className="font-bold text-sky-400">{settings.successThreshold} correct</span>
              </div>
              <input
                type="range"
                min="3"
                max="30"
                step="1"
                value={settings.successThreshold}
                onChange={(e) => onUpdateSettings({ successThreshold: Number(e.target.value) })}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>3 (Fast)</span>
                <span>10 (Quiz default)</span>
                <span>30 (Intensive training)</span>
              </div>
            </div>

            {/* Max Sequence Length */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Maximum sounds in sequence:</span>
                <span className="font-bold text-sky-400">{settings.maxSequenceLength} sounds</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={settings.maxSequenceLength}
                onChange={(e) => onUpdateSettings({ maxSequenceLength: Number(e.target.value) })}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 sound</span>
                <span>3 sounds (Default)</span>
                <span>5 sounds (Master)</span>
              </div>
            </div>

            {/* Auto replay */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-200">Auto-Replay Sounds</div>
                <div className="text-[11px] text-slate-400">Repeats sequence if idle (every {settings.autoReplayIntervalSec}s)</div>
              </div>
              <button
                type="button"
                onClick={() => onUpdateSettings({ autoReplay: !settings.autoReplay })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.autoReplay ? 'bg-sky-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                    settings.autoReplay ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Theme Mode */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Visual Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'slate', label: 'Classic Pygame', desc: 'Slate Gray (100, 100, 100)' },
                  { id: 'dark', label: 'Deep Night', desc: 'Slate 950' },
                  { id: 'light', label: 'Clean Studio', desc: 'Light mode' }
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onUpdateSettings({ theme: t.id as ThemeMode })}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    settings.theme === t.id
                      ? 'border-sky-500 bg-sky-500/15 text-white ring-1 ring-sky-500'
                      : 'border-slate-800 bg-slate-850 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-xs">{t.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Reset progress */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-red-400">Reset Saved Progress</div>
              <div className="text-[11px] text-slate-400">Equivalent to deleting progress.ini</div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all progress back to Group 1?')) {
                  onResetProgress();
                }
              }}
              className="px-3 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/20 text-xs font-medium transition-colors"
            >
              Reset to Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
