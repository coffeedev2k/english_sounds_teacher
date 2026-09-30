import React from 'react';
import { SoundData, CardPosition, CardStyle, LayoutMode } from '../types';
import { SoundCard } from './SoundCard';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

interface GameBoardProps {
  displayedSounds: SoundData[];
  cardPositions: CardPosition[];
  layoutMode: LayoutMode;
  cardStyle: CardStyle;
  currentSequence: string[];
  matchedIndices: number[]; // indices in currentSequence that have been successfully found
  mistakeSoundId: string | null;
  successSoundId: string | null;
  onCardClick: (soundId: string) => void;
  onOpenArticulation: (sound: SoundData) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  displayedSounds,
  cardPositions,
  layoutMode,
  cardStyle,
  currentSequence,
  matchedIndices,
  mistakeSoundId,
  successSoundId,
  onCardClick,
  onOpenArticulation
}) => {
  const positionMap = new Map<string, CardPosition>(
    cardPositions.map((p) => [p.soundId, p])
  );

  return (
    <div className="flex-1 flex flex-col relative w-full overflow-hidden p-3 sm:p-5 select-none">
      {/* Top Target Sequence Bar */}
      <div className="w-full max-w-4xl mx-auto mb-3 sm:mb-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700/80 p-2.5 sm:p-3 shadow-lg flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">
              {currentSequence.length === 1
                ? 'Identify the Sound:'
                : `Sequence (${matchedIndices.length}/${currentSequence.length} found):`}
            </div>
            <div className="text-[11px] text-slate-400">
              {matchedIndices.length < currentSequence.length
                ? `Listen and click sound #${matchedIndices.length + 1}`
                : 'Sequence complete!'}
            </div>
          </div>
        </div>

        {/* Sequence Steps */}
        <div className="flex items-center gap-2">
          {currentSequence.map((soundId, idx) => {
            const isFound = matchedIndices.includes(idx);
            const isCurrentTarget = idx === matchedIndices.length;

            return (
              <div
                key={`${soundId}-${idx}`}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all border ${
                  isFound
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : isCurrentTarget
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 ring-2 ring-sky-400/40 animate-pulse'
                    : 'bg-slate-800/60 border-slate-700 text-slate-500'
                }`}
              >
                {isFound ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
                <span>
                  {isFound ? soundId : `Sound ${idx + 1}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Play Area */}
      {layoutMode === 'scattered' ? (
        <div className="flex-1 w-full relative min-h-[460px] sm:min-h-[560px] rounded-2xl bg-black/10 border border-slate-800/60 overflow-hidden shadow-inner">
          {displayedSounds.map((sound) => {
            const pos = positionMap.get(sound.id);
            const isMatchedInSeq =
              currentSequence.includes(sound.id) &&
              matchedIndices.some((idx) => currentSequence[idx] === sound.id);

            const cardStyleObj: React.CSSProperties = pos
              ? {
                  left: `${pos.xPercent}%`,
                  top: `${pos.yPercent}%`,
                  transform: `translate(-50%, -50%) rotate(${pos.rotationDeg}deg)`
                }
              : {};

            return (
              <SoundCard
                key={sound.id}
                sound={sound}
                cardStyle={cardStyle}
                layoutMode="scattered"
                style={cardStyleObj}
                isMatchedInSequence={isMatchedInSeq}
                isMistake={mistakeSoundId === sound.id}
                isSuccess={successSoundId === sound.id}
                onClick={() => onCardClick(sound.id)}
                onOpenArticulation={onOpenArticulation}
              />
            );
          })}
        </div>
      ) : (
        /* Grid Layout */
        <div className="flex-1 w-full flex items-center justify-center p-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {displayedSounds.map((sound) => {
              const isMatchedInSeq =
                currentSequence.includes(sound.id) &&
                matchedIndices.some((idx) => currentSequence[idx] === sound.id);

              return (
                <SoundCard
                  key={sound.id}
                  sound={sound}
                  cardStyle={cardStyle}
                  layoutMode="grid"
                  isMatchedInSequence={isMatchedInSeq}
                  isMistake={mistakeSoundId === sound.id}
                  isSuccess={successSoundId === sound.id}
                  onClick={() => onCardClick(sound.id)}
                  onOpenArticulation={onOpenArticulation}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
