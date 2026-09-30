import React from 'react';
import { Play, Volume2, Headphones, Sparkles, BookOpen } from 'lucide-react';

interface StartOverlayProps {
  onStart: () => void;
  onOpenChart: () => void;
}

export const StartOverlay: React.FC<StartOverlayProps> = ({ onStart, onOpenChart }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-center space-y-6">
        {/* Brand Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 shadow-lg">
          <Headphones className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            English Sounds Teacher
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Train your ear and master the 44 phonemes of the English language through audio recognition.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-slate-800/70 border border-slate-750 rounded-xl p-4 text-left space-y-2.5 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded bg-sky-500/20 text-sky-400 mt-0.5">
              <Volume2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="text-white">1. Listen:</strong> Hear one or more sounds played in sequence.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded bg-emerald-500/20 text-emerald-400 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="text-white">2. Identify:</strong> Find the matching phonetic cards on screen.
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5">
              <Play className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="text-white">3. Click in Order:</strong> Click each card in the exact sequence you heard.
            </div>
          </div>
        </div>

        {/* Keyboard tips */}
        <div className="text-[11px] text-slate-400 flex items-center justify-center gap-4">
          <span><kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">Space</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">R</kbd> Replay</span>
          <span><kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">Esc</kbd> Settings</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all active:scale-98 text-base cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Training</span>
          </button>

          <button
            type="button"
            onClick={onOpenChart}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 font-medium py-2.5 px-4 rounded-xl transition-all active:scale-98 text-xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>Explore 44 Sounds Chart &amp; Mouth Guide First</span>
          </button>
        </div>
      </div>
    </div>
  );
};
