import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, ArrowRight, Award } from 'lucide-react';
import { PresetMode } from '../types';

interface VictoryModalProps {
  preset: PresetMode;
  totalCorrect: number;
  totalMistakes: number;
  onRestartMode: () => void;
  onSwitchMode: (nextMode: PresetMode) => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  preset,
  totalCorrect,
  totalMistakes,
  onRestartMode,
  onSwitchMode
}) => {
  useEffect(() => {
    // Confetti cannon
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#38bdf8', '#34d399', '#f59e0b', '#ec4899'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const totalGuesses = totalCorrect + totalMistakes;
  const accuracy = totalGuesses > 0 ? Math.round((totalCorrect / totalGuesses) * 100) : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-center space-y-6">
        {/* Trophy Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border-2 border-amber-500/40 shadow-inner">
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-white">All Groups Mastered!</h2>
          <p className="text-sm text-slate-300 mt-1">
            Outstanding work! You have completed all sound groups in this training set.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <div>
            <div className="text-2xl font-bold text-emerald-400">{accuracy}%</div>
            <div className="text-xs text-slate-400">Final Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sky-400">{totalCorrect}</div>
            <div className="text-xs text-slate-400">Total Solved</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {preset === 'quiz' && (
            <button
              type="button"
              onClick={() => onSwitchMode('training')}
              className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all active:scale-98 text-sm"
            >
              <span>Try Intensive Training Mode</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {preset === 'training' && (
            <button
              type="button"
              onClick={() => onSwitchMode('minimal_pairs')}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition-all active:scale-98 text-sm"
            >
              <Award className="w-4 h-4" />
              <span>Practice Minimal Pairs</span>
            </button>
          )}

          <button
            type="button"
            onClick={onRestartMode}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-medium py-2.5 px-4 rounded-xl transition-all active:scale-98 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart This Mode from Group 1</span>
          </button>
        </div>
      </div>
    </div>
  );
};
