import React from 'react';
import { SoundData, CardStyle, LayoutMode } from '../types';
import { getAssetUrl } from '../utils/assets';
import { Volume2, Info, Check } from 'lucide-react';

interface SoundCardProps {
  sound: SoundData;
  cardStyle: CardStyle;
  layoutMode: LayoutMode;
  isMatchedInSequence?: boolean;
  isPlaying?: boolean;
  isMistake?: boolean;
  isSuccess?: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
  onOpenArticulation: (sound: SoundData) => void;
}

export const SoundCard: React.FC<SoundCardProps> = ({
  sound,
  cardStyle,
  layoutMode,
  isMatchedInSequence = false,
  isPlaying = false,
  isMistake = false,
  isSuccess = false,
  style = {},
  onClick,
  onOpenArticulation
}) => {
  const imageFolder = cardStyle === 'smiles' ? 'smiles' : 'chart';
  const imageUrl = getAssetUrl(`images/${imageFolder}/${sound.id}.png`);

  return (
    <div
      style={style}
      className={`group select-none cursor-pointer transition-all duration-200 transform ${
        layoutMode === 'scattered' ? 'absolute' : 'relative'
      } ${
        isMatchedInSequence
          ? 'opacity-35 scale-95 pointer-events-none'
          : 'hover:scale-105 active:scale-95'
      }`}
    >
      <div
        onClick={onClick}
        className={`relative rounded-xl p-2 bg-slate-800/90 backdrop-blur-xs border-2 shadow-lg hover:shadow-xl transition-all duration-200 ${
          isMistake
            ? 'border-red-500 ring-4 ring-red-500/40 animate-shake bg-red-950/40'
            : isSuccess
            ? 'border-emerald-400 ring-4 ring-emerald-400/40 scale-105 bg-emerald-950/40'
            : isPlaying
            ? 'border-amber-400 ring-4 ring-amber-400/40 animate-pulse'
            : 'border-slate-700/80 hover:border-sky-400 hover:ring-2 hover:ring-sky-400/20'
        }`}
      >
        {/* Card Image */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center overflow-hidden rounded-lg bg-slate-900/60">
          <img
            src={imageUrl}
            alt={sound.label}
            className="w-full h-full object-contain pointer-events-none drop-shadow"
            loading="lazy"
            onError={(e) => {
              // Fallback to text if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Card Footer Badge */}
        <div className="mt-1 flex items-center justify-between text-xs px-1">
          <span className="font-mono font-bold text-sky-400 tracking-wide">
            {sound.ipa}
          </span>
          <span className="text-slate-400 font-medium capitalize truncate max-w-[60px] text-[11px]">
            {sound.label}
          </span>
        </div>

        {/* Articulation info button */}
        <button
          type="button"
          title={`View mouth articulation for ${sound.label} (${sound.ipa})`}
          onClick={(e) => {
            e.stopPropagation();
            onOpenArticulation(sound);
          }}
          className="absolute -top-2 -right-2 bg-slate-800 hover:bg-sky-600 text-slate-300 hover:text-white p-1 rounded-full border border-slate-600 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10"
        >
          <Info className="w-3.5 h-3.5" />
        </button>

        {/* Success Checkmark Badge */}
        {isMatchedInSequence && (
          <div className="absolute inset-0 bg-slate-950/60 rounded-xl flex items-center justify-center">
            <div className="bg-emerald-500 text-white rounded-full p-2 shadow-lg animate-bounce">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
          </div>
        )}

        {/* Playing Sound Wave Indicator */}
        {isPlaying && (
          <div className="absolute top-2 left-2 bg-amber-500/90 text-slate-950 px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
            <Volume2 className="w-3 h-3 animate-pulse" />
            <span>PLAYING</span>
          </div>
        )}
      </div>
    </div>
  );
};
