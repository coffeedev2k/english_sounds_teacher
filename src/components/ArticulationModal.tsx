import React, { useState } from 'react';
import { SoundData, VoiceMode } from '../types';
import { audioManager } from '../services/audio';
import { getAssetUrl } from '../utils/assets';
import { X, Volume2, BookOpen, Layers } from 'lucide-react';

interface ArticulationModalProps {
  sound: SoundData | null;
  voiceMode: VoiceMode;
  onClose: () => void;
}

export const ArticulationModal: React.FC<ArticulationModalProps> = ({
  sound,
  voiceMode,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'sound' | 'mouthMap'>('sound');
  const [selectedVoice, setSelectedVoice] = useState<'chart' | 'alex' | 'f1' | 'f2'>(
    voiceMode === 'mix' ? 'chart' : voiceMode
  );

  if (!sound) return null;

  const soundDiagramUrl = getAssetUrl(`images/articulation/${sound.id}.jpg`);
  const mouthMapUrl = getAssetUrl('images/mouth-map.jpg');

  const handlePlayPhoneme = () => {
    audioManager.playSound(sound.id, selectedVoice);
  };

  const handlePlayWord = () => {
    audioManager.playWord(sound.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-850">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-mono font-bold text-sky-400 bg-slate-800 px-2.5 py-0.5 rounded-lg border border-slate-700">
              {sound.ipa}
            </span>
            <div>
              <h3 className="text-lg font-bold text-white capitalize flex items-center gap-2">
                {sound.label}
                <span className="text-xs font-normal text-slate-400 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-750">
                  {sound.categoryLabel}
                </span>
              </h3>
              <p className="text-xs text-slate-400">{sound.description}</p>
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

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-900 px-6 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('sound')}
            className={`pb-2 px-3 text-sm font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'sound'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Articulation Diagram
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mouthMap')}
            className={`pb-2 px-3 text-sm font-medium border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'mouthMap'
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            Phonetic Mouth Map
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'sound' ? (
            <div className="space-y-4">
              {/* Image Diagram */}
              <div className="w-full max-h-72 sm:max-h-80 flex items-center justify-center bg-black/40 rounded-xl border border-slate-800 p-2 overflow-hidden">
                <img
                  src={soundDiagramUrl}
                  alt={`Articulation diagram for ${sound.label}`}
                  className="max-h-72 w-auto object-contain rounded-lg drop-shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = mouthMapUrl;
                  }}
                />
              </div>

              {/* Audio Controls */}
              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-750 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePlayPhoneme}
                    className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 text-sm"
                  >
                    <Volume2 className="w-4 h-4" />
                    Hear Phoneme {sound.ipa}
                  </button>
                  <button
                    type="button"
                    onClick={handlePlayWord}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-650 text-slate-100 font-medium px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95 text-sm border border-slate-600"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                    Word: &quot;{sound.label}&quot;
                  </button>
                </div>

                {/* Voice Selection */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>Voice:</span>
                  {(['chart', 'alex', 'f1', 'f2'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => {
                        setSelectedVoice(v);
                        audioManager.playSound(sound.id, v);
                      }}
                      className={`px-2 py-1 rounded text-xs uppercase font-medium transition-colors ${
                        selectedVoice === v
                          ? 'bg-sky-500 text-white shadow-xs'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {v === 'chart' ? 'Chart' : v === 'alex' ? 'Alex' : v.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Example Words */}
              <div className="bg-slate-850 p-4 rounded-xl border border-slate-800 text-sm">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1.5">
                  Common Example Words:
                </span>
                <div className="flex flex-wrap gap-2">
                  {sound.exampleWords.map((word) => (
                    <span
                      key={word}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-full flex items-center justify-center bg-black/40 rounded-xl border border-slate-800 p-2 overflow-hidden">
                <img
                  src={mouthMapUrl}
                  alt="Phonetic Map of the Human Mouth"
                  className="max-h-96 w-auto object-contain rounded-lg drop-shadow-md"
                />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Phonetic map of the human mouth showing articulation points: lips (bilabial), teeth (dental), alveolar ridge, palate, velum (soft palate), uvula, and pharynx.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
