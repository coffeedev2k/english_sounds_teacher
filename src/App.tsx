import { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameSettings,
  GameProgress,
  SoundData,
  CardPosition,
  PresetMode
} from './types';
import { SOUNDS_BY_ID } from './data/sounds';
import { getPresetGroups } from './data/presets';
import {
  loadSettings,
  saveSettings,
  loadProgress,
  saveProgress,
  resetStoredProgress
} from './services/storage';
import { audioManager } from './services/audio';
import { generateScatteredPositions } from './utils/scatter';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { SettingsModal } from './components/SettingsModal';
import { GroupSelectorModal } from './components/GroupSelectorModal';
import { ChartExplorerModal } from './components/ChartExplorerModal';
import { ArticulationModal } from './components/ArticulationModal';
import { VictoryModal } from './components/VictoryModal';
import { StartOverlay } from './components/StartOverlay';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [settings, setSettings] = useState<GameSettings>(loadSettings);
  const [progress, setProgress] = useState<GameProgress>(loadProgress);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGroupSelectorOpen, setIsGroupSelectorOpen] = useState(false);
  const [isChartExplorerOpen, setIsChartExplorerOpen] = useState(false);
  const [selectedArticulationSound, setSelectedArticulationSound] = useState<SoundData | null>(null);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);

  // Active round state
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [cardPositions, setCardPositions] = useState<CardPosition[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activePlayingSoundId, setActivePlayingSoundId] = useState<string | null>(null);
  const [mistakeSoundId, setMistakeSoundId] = useState<string | null>(null);
  const [successSoundId, setSuccessSoundId] = useState<string | null>(null);

  // Timers and refs
  const autoReplayTimerRef = useRef<number | null>(null);
  const isAdvancingRef = useRef(false);

  // Compute active groups
  const groups = getPresetGroups(settings.preset, progress.customSoundIds);
  const clampedGroupIndex = Math.min(progress.currentGroupIndex, Math.max(0, groups.length - 1));
  const currentGroup = groups[clampedGroupIndex] || groups[0];

  // Sync audio manager volume and speed
  useEffect(() => {
    audioManager.setVolume(settings.volume);
    audioManager.setPlaybackRate(settings.playbackRate);
  }, [settings.volume, settings.playbackRate]);

  // Save settings when changed
  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);
      return updated;
    });

    // If preset changed, reset group index
    if (newSettings.preset && newSettings.preset !== settings.preset) {
      setProgress((prev) => {
        const updated: GameProgress = {
          ...prev,
          preset: newSettings.preset!,
          currentGroupIndex: 0,
          currentStreak: 0,
          sequenceLength: 1
        };
        saveProgress(updated);
        return updated;
      });
    }
  };

  // Play current sequence audio
  const playCurrentRoundSequence = useCallback(
    async (seq: string[]) => {
      if (seq.length === 0) return;
      setIsPlayingAudio(true);
      await audioManager.playSequence(seq, settings.voiceMode, {
        onSoundStart: (id) => setActivePlayingSoundId(id),
        onSoundEnd: () => setActivePlayingSoundId(null),
        onComplete: () => {
          setIsPlayingAudio(false);
          setActivePlayingSoundId(null);
        },
        pauseMs: 450
      });
      setIsPlayingAudio(false);
      setActivePlayingSoundId(null);
    },
    [settings.voiceMode]
  );

  // Start a new question / round
  const startNewRound = useCallback(
    (groupIndex: number, seqLength: number) => {
      const currentGrp = groups[groupIndex] || groups[0];
      if (!currentGrp || currentGrp.soundIds.length === 0) return;

      // Pick sequence of `seqLength` distinct sounds from current group
      const shuffled = [...currentGrp.soundIds].sort(() => Math.random() - 0.5);
      const targetCount = Math.min(seqLength, shuffled.length);
      const newSequence = shuffled.slice(0, targetCount);

      setCurrentSequence(newSequence);
      setMatchedIndices([]);
      setMistakeSoundId(null);
      setSuccessSoundId(null);
      isAdvancingRef.current = false;

      // Scatter cards for all sounds in this group
      const positions = generateScatteredPositions(currentGrp.soundIds);
      setCardPositions(positions);

      // Play sequence if session has started
      if (hasStarted) {
        playCurrentRoundSequence(newSequence);
      }
    },
    [groups, hasStarted, playCurrentRoundSequence]
  );

  // Initialize or re-init when group index, sequenceLength or preset changes
  useEffect(() => {
    startNewRound(clampedGroupIndex, progress.sequenceLength);
  }, [clampedGroupIndex, progress.sequenceLength, settings.preset, startNewRound]);

  // Auto-replay timer logic
  useEffect(() => {
    if (!hasStarted || !settings.autoReplay || isPlayingAudio || isAdvancingRef.current) {
      if (autoReplayTimerRef.current) {
        window.clearTimeout(autoReplayTimerRef.current);
        autoReplayTimerRef.current = null;
      }
      return;
    }

    autoReplayTimerRef.current = window.setTimeout(() => {
      if (!isPlayingAudio && !isAdvancingRef.current && currentSequence.length > 0) {
        playCurrentRoundSequence(currentSequence);
      }
    }, settings.autoReplayIntervalSec * 1000);

    return () => {
      if (autoReplayTimerRef.current) {
        window.clearTimeout(autoReplayTimerRef.current);
        autoReplayTimerRef.current = null;
      }
    };
  }, [hasStarted, settings.autoReplay, settings.autoReplayIntervalSec, isPlayingAudio, currentSequence, playCurrentRoundSequence]);

  // User card click handler
  const handleCardClick = async (clickedSoundId: string) => {
    if (isAdvancingRef.current || currentSequence.length === 0) return;

    // Reset auto-replay timer on interaction
    if (autoReplayTimerRef.current) {
      window.clearTimeout(autoReplayTimerRef.current);
      autoReplayTimerRef.current = null;
    }

    const currentTargetIndex = matchedIndices.length;
    const expectedSoundId = currentSequence[currentTargetIndex];

    if (clickedSoundId === expectedSoundId) {
      // Correct!
      setSuccessSoundId(clickedSoundId);
      setTimeout(() => setSuccessSoundId(null), 350);

      // Play feedback audio
      audioManager.playFeedback('success', clickedSoundId, settings.feedbackMode);

      const nextMatched = [...matchedIndices, currentTargetIndex];
      setMatchedIndices(nextMatched);

      // Check if entire sequence was completed
      if (nextMatched.length === currentSequence.length) {
        isAdvancingRef.current = true;
        const nextStreak = progress.currentStreak + 1;
        const nextTotalCorrect = progress.totalCorrect + 1;
        const nextBestStreak = Math.max(progress.bestStreak, nextStreak);

        let nextSequenceLength = progress.sequenceLength;
        let nextGroupIndex = clampedGroupIndex;
        let nextStreakValue = nextStreak;

        // Check if streak reaches threshold to advance difficulty
        if (nextStreak >= settings.successThreshold) {
          nextStreakValue = 0;
          nextSequenceLength = progress.sequenceLength + 1;

          // Check if sequence length exceeded max threshold -> advance group
          if (nextSequenceLength > settings.maxSequenceLength) {
            nextSequenceLength = 1;
            nextGroupIndex = clampedGroupIndex + 1;

            // Check if all groups finished!
            if (nextGroupIndex >= groups.length) {
              const finishedProgress: GameProgress = {
                ...progress,
                currentStreak: 0,
                totalCorrect: nextTotalCorrect,
                bestStreak: nextBestStreak
              };
              setProgress(finishedProgress);
              saveProgress(finishedProgress);
              setIsVictoryOpen(true);
              return;
            }
          }
        }

        const updatedProgress: GameProgress = {
          ...progress,
          currentGroupIndex: nextGroupIndex,
          sequenceLength: nextSequenceLength,
          currentStreak: nextStreakValue,
          totalCorrect: nextTotalCorrect,
          bestStreak: nextBestStreak
        };
        setProgress(updatedProgress);
        saveProgress(updatedProgress);

        // Pause briefly, then start next round
        setTimeout(() => {
          if (nextGroupIndex === clampedGroupIndex && nextSequenceLength === progress.sequenceLength) {
            startNewRound(nextGroupIndex, nextSequenceLength);
          }
          // If group or length changed, useEffect handles startNewRound
        }, 700);
      }
    } else {
      // Mistake!
      setMistakeSoundId(clickedSoundId);
      setTimeout(() => setMistakeSoundId(null), 500);

      audioManager.playFeedback('mistake');

      const updatedProgress: GameProgress = {
        ...progress,
        currentStreak: 0,
        totalMistakes: progress.totalMistakes + 1
      };
      setProgress(updatedProgress);
      saveProgress(updatedProgress);

      // Reset matched sequence so user must complete from first sound
      setMatchedIndices([]);

      // Replay sequence after error tone so user can hear again
      setTimeout(() => {
        if (!isAdvancingRef.current) {
          playCurrentRoundSequence(currentSequence);
        }
      }, 700);
    }
  };

  // User click on Replay button or Space key
  const handleReplay = () => {
    if (currentSequence.length > 0) {
      playCurrentRoundSequence(currentSequence);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if inside an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space' || e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleReplay();
      } else if (e.key === 'Escape') {
        if (selectedArticulationSound) {
          setSelectedArticulationSound(null);
        } else if (isChartExplorerOpen) {
          setIsChartExplorerOpen(false);
        } else if (isGroupSelectorOpen) {
          setIsGroupSelectorOpen(false);
        } else {
          setIsSettingsOpen((prev) => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Reset progress action
  const handleResetProgress = () => {
    const fresh = resetStoredProgress(settings.preset);
    setProgress(fresh);
    setIsVictoryOpen(false);
    startNewRound(0, 1);
  };

  // First start action
  const handleFirstStart = () => {
    audioManager.ensureContext();
    setHasStarted(true);
    playCurrentRoundSequence(currentSequence);
  };

  // Theming background class
  const themeClass =
    settings.theme === 'slate'
      ? 'bg-[#646464] text-slate-100' // Matches Pygame (100, 100, 100)
      : settings.theme === 'light'
      ? 'bg-slate-200 text-slate-900'
      : 'bg-slate-950 text-slate-100';

  // Sounds to display on board
  const displayedSounds = currentGroup.soundIds
    .map((id) => SOUNDS_BY_ID.get(id))
    .filter((s): s is SoundData => s !== undefined);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${themeClass}`}>
      {/* Header bar */}
      <Header
        currentGroup={currentGroup}
        currentGroupIndex={clampedGroupIndex}
        totalGroups={groups.length}
        progress={progress}
        settings={settings}
        isPlayingAudio={isPlayingAudio}
        onReplay={handleReplay}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenChart={() => setIsChartExplorerOpen(true)}
        onOpenGroupSelector={() => setIsGroupSelectorOpen(true)}
        onResetProgress={handleResetProgress}
        onUpdateVolume={(vol) => updateSettings({ volume: vol })}
      />

      {/* Main Game Field */}
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto relative">
        <GameBoard
          displayedSounds={displayedSounds}
          cardPositions={cardPositions}
          layoutMode={settings.layoutMode}
          cardStyle={settings.cardStyle}
          currentSequence={currentSequence}
          matchedIndices={matchedIndices}
          activePlayingSoundId={activePlayingSoundId}
          mistakeSoundId={mistakeSoundId}
          successSoundId={successSoundId}
          onCardClick={handleCardClick}
          onOpenArticulation={(sound) => setSelectedArticulationSound(sound)}
        />
      </main>

      {/* Welcome & First Start Overlay */}
      {!hasStarted && (
        <StartOverlay
          onStart={handleFirstStart}
          onOpenChart={() => setIsChartExplorerOpen(true)}
        />
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={() => setIsSettingsOpen(false)}
          onResetProgress={handleResetProgress}
        />
      )}

      {/* Group Selector Modal */}
      {isGroupSelectorOpen && (
        <GroupSelectorModal
          groups={groups}
          currentGroupIndex={clampedGroupIndex}
          preset={settings.preset}
          customSoundIds={progress.customSoundIds || []}
          onSelectGroup={(idx) => {
            setProgress((prev) => {
              const updated = {
                ...prev,
                currentGroupIndex: idx,
                currentStreak: 0,
                sequenceLength: 1
              };
              saveProgress(updated);
              return updated;
            });
          }}
          onUpdateCustomSounds={(soundIds) => {
            setProgress((prev) => {
              const updated = {
                ...prev,
                customSoundIds: soundIds,
                currentGroupIndex: 0,
                currentStreak: 0
              };
              saveProgress(updated);
              return updated;
            });
          }}
          onClose={() => setIsGroupSelectorOpen(false)}
        />
      )}

      {/* Chart Explorer Modal */}
      {isChartExplorerOpen && (
        <ChartExplorerModal
          cardStyle={settings.cardStyle}
          voiceMode={settings.voiceMode}
          onClose={() => setIsChartExplorerOpen(false)}
          onOpenArticulation={(sound) => setSelectedArticulationSound(sound)}
        />
      )}

      {/* Articulation Modal */}
      {selectedArticulationSound && (
        <ArticulationModal
          sound={selectedArticulationSound}
          voiceMode={settings.voiceMode}
          onClose={() => setSelectedArticulationSound(null)}
        />
      )}

      {/* Victory Modal */}
      {isVictoryOpen && (
        <VictoryModal
          preset={settings.preset}
          totalCorrect={progress.totalCorrect}
          totalMistakes={progress.totalMistakes}
          onRestartMode={handleResetProgress}
          onSwitchMode={(nextPreset: PresetMode) => {
            updateSettings({ preset: nextPreset });
            setIsVictoryOpen(false);
          }}
        />
      )}
    </div>
  );
}
