import React, { useState } from 'react';
import { ALL_SOUNDS } from '../data/sounds';
import { SoundData, VoiceMode, CardStyle } from '../types';
import { audioManager } from '../services/audio';
import { getAssetUrl } from '../utils/assets';
import { X, Volume2, Info, Headphones } from 'lucide-react';

interface ChartExplorerModalProps {
  cardStyle: CardStyle;
  voiceMode: VoiceMode;
  onClose: () => void;
  onOpenArticulation: (sound: SoundData) => void;
}

export const ChartExplorerModal: React.FC<ChartExplorerModalProps> = ({
  cardStyle,
  voiceMode,
  onClose,
  onOpenArticulation
}) => {
  const [selectedVoice, setSelectedVoice] = useState<'chart' | 'alex' | 'f1' | 'f2'>(
    voiceMode === 'mix' ? 'chart' : voiceMode
  );
  const [playingSoundId, setPlayingSoundId] = useState<string | null>(null);

  const imageFolder = cardStyle === 'smiles' ? 'smiles' : 'chart';

  const handlePlaySound = async (sound: SoundData) => {
    setPlayingSoundId(sound.id);
    await audioManager.playSound(sound.id, selectedVoice);
    setPlayingSoundId(null);
  };

  const monophthongs = ALL_SOUNDS.filter((s) => s.category === 'monophthong');
  const diphthongs = ALL_SOUNDS.filter((s) => s.category === 'diphthong');
  const consonants = ALL_SOUNDS.filter((s) => s.category.startsWith('consonant_'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-6xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                The 44 Sounds of English Chart
              </h2>
              <p className="text-xs text-slate-400">
                Click any sound to hear pronunciation. Click ℹ for mouth articulation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Voice selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <Volume2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Voice:</span>
              {(['chart', 'alex', 'f1', 'f2'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedVoice(v)}
                  className={`px-2 py-0.5 rounded text-xs uppercase font-medium transition-colors ${
                    selectedVoice === v
                      ? 'bg-sky-500 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {v === 'chart' ? 'Chart' : v === 'alex' ? 'Alex' : v.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content with 3 sections */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* 1. Monophthongs */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <h3 className="text-base font-bold text-white tracking-wide">
                Pure Vowels (Monophthongs)
              </h3>
              <span className="text-xs text-slate-400 font-mono">12 sounds</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3">
              {monophthongs.map((sound) => (
                <SoundTile
                  key={sound.id}
                  sound={sound}
                  imageUrl={getAssetUrl(`images/${imageFolder}/${sound.id}.png`)}
                  isPlaying={playingSoundId === sound.id}
                  onPlay={() => handlePlaySound(sound)}
                  onInfo={() => onOpenArticulation(sound)}
                />
              ))}
            </div>
          </section>

          {/* 2. Diphthongs */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <h3 className="text-base font-bold text-white tracking-wide">
                Gliding Vowels (Diphthongs)
              </h3>
              <span className="text-xs text-slate-400 font-mono">8 sounds</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {diphthongs.map((sound) => (
                <SoundTile
                  key={sound.id}
                  sound={sound}
                  imageUrl={getAssetUrl(`images/${imageFolder}/${sound.id}.png`)}
                  isPlaying={playingSoundId === sound.id}
                  onPlay={() => handlePlaySound(sound)}
                  onInfo={() => onOpenArticulation(sound)}
                />
              ))}
            </div>
          </section>

          {/* 3. Consonants */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-sky-500" />
              <h3 className="text-base font-bold text-white tracking-wide">
                Consonants
              </h3>
              <span className="text-xs text-slate-400 font-mono">24 sounds</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {consonants.map((sound) => (
                <SoundTile
                  key={sound.id}
                  sound={sound}
                  imageUrl={getAssetUrl(`images/${imageFolder}/${sound.id}.png`)}
                  isPlaying={playingSoundId === sound.id}
                  onPlay={() => handlePlaySound(sound)}
                  onInfo={() => onOpenArticulation(sound)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

interface SoundTileProps {
  sound: SoundData;
  imageUrl: string;
  isPlaying: boolean;
  onPlay: () => void;
  onInfo: () => void;
}

const SoundTile: React.FC<SoundTileProps> = ({
  sound,
  imageUrl,
  isPlaying,
  onPlay,
  onInfo
}) => {
  return (
    <div
      onClick={onPlay}
      className={`group relative rounded-xl p-2 bg-slate-800/80 hover:bg-slate-750 border transition-all duration-150 cursor-pointer shadow-sm hover:shadow-md flex flex-col items-center select-none ${
        isPlaying
          ? 'border-sky-400 ring-2 ring-sky-400/40 scale-102 bg-sky-950/30'
          : 'border-slate-700/80 hover:border-slate-500'
      }`}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center overflow-hidden rounded-lg bg-slate-900/50">
        <img
          src={imageUrl}
          alt={sound.label}
          className="w-full h-full object-contain pointer-events-none drop-shadow"
          loading="lazy"
        />
      </div>

      <div className="mt-1.5 w-full flex items-center justify-between text-xs px-0.5">
        <span className="font-mono font-bold text-sky-400">{sound.ipa}</span>
        <span className="text-slate-400 text-[10px] capitalize truncate max-w-[45px]">
          {sound.label}
        </span>
      </div>

      <button
        type="button"
        title="Articulation Info"
        onClick={(e) => {
          e.stopPropagation();
          onInfo();
        }}
        className="absolute top-1 right-1 p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-sky-600 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Info className="w-3 h-3" />
      </button>

      {isPlaying && (
        <div className="absolute inset-0 bg-sky-500/10 rounded-xl pointer-events-none flex items-center justify-center">
          <Volume2 className="w-6 h-6 text-sky-400 animate-pulse" />
        </div>
      )}
    </div>
  );
};
