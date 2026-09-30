import React from 'react';
import { TrainingGroup, PresetMode } from '../types';
import { ALL_SOUNDS } from '../data/sounds';
import { X, Check, Bookmark, ListFilter } from 'lucide-react';

interface GroupSelectorModalProps {
  groups: TrainingGroup[];
  currentGroupIndex: number;
  preset: PresetMode;
  customSoundIds: string[];
  onSelectGroup: (index: number) => void;
  onUpdateCustomSounds: (soundIds: string[]) => void;
  onClose: () => void;
}

export const GroupSelectorModal: React.FC<GroupSelectorModalProps> = ({
  groups,
  currentGroupIndex,
  preset,
  customSoundIds,
  onSelectGroup,
  onUpdateCustomSounds,
  onClose
}) => {
  const isCustom = preset === 'custom';

  const toggleSound = (soundId: string) => {
    let next: string[];
    if (customSoundIds.includes(soundId)) {
      if (customSoundIds.length <= 1) return; // Keep at least 1
      next = customSoundIds.filter((id) => id !== soundId);
    } else {
      next = [...customSoundIds, soundId];
    }
    onUpdateCustomSounds(next);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <ListFilter className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {isCustom ? 'Select Custom Practice Sounds' : 'Choose Training Group'}
              </h2>
              <p className="text-xs text-slate-400">
                {isCustom
                  ? 'Pick the exact sounds you want to practice together'
                  : 'Jump directly to any level or group in this mode'}
              </p>
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {isCustom ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span>Selected: {customSoundIds.length} of 44 sounds</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateCustomSounds(ALL_SOUNDS.map((s) => s.id))}
                    className="text-sky-400 hover:underline"
                  >
                    Select All
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => onUpdateCustomSounds(['sheep', 'ship', 'good', 'shoot'])}
                    className="text-sky-400 hover:underline"
                  >
                    Reset to 4
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ALL_SOUNDS.map((sound) => {
                  const selected = customSoundIds.includes(sound.id);
                  return (
                    <button
                      key={sound.id}
                      type="button"
                      onClick={() => toggleSound(sound.id)}
                      className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all ${
                        selected
                          ? 'border-sky-500 bg-sky-500/15 text-white ring-1 ring-sky-500'
                          : 'border-slate-800 bg-slate-850 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-sky-400 text-sm">
                          {sound.ipa}
                        </span>
                        <span className="text-xs text-slate-300 capitalize">{sound.label}</span>
                      </div>
                      {selected && <Check className="w-4 h-4 text-sky-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            groups.map((group, idx) => {
              const isCurrent = idx === currentGroupIndex;
              return (
                <div
                  key={group.id}
                  onClick={() => {
                    onSelectGroup(idx);
                    onClose();
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isCurrent
                      ? 'border-sky-500 bg-sky-500/15 text-white ring-2 ring-sky-500/30'
                      : 'border-slate-800 bg-slate-850 hover:border-slate-700 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        isCurrent
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        {group.name}
                        {isCurrent && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-500 text-white">
                            Current Group
                          </span>
                        )}
                      </div>
                      {group.description && (
                        <div className="text-xs text-slate-400 mt-0.5">{group.description}</div>
                      )}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {group.soundIds.map((sId) => (
                          <span
                            key={sId}
                            className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono"
                          >
                            {sId}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-400">
                    {group.soundIds.length} sounds
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
