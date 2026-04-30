import React, { useMemo } from 'react';
import GameScreenLayout from '../../components/game-ui/GameScreenLayout';
import { PrimaryButton, SecondaryButton } from '../../components/game-ui/GameUiKit';
import { FramedPanel } from '../../layout/ScreenPrimitives';
import { getCanonicalGameLabel } from '../../gameNames';
import { MiniGameType } from '../../types';

type EnglishStubGameProps = {
  levelId: number;
  avatarId: string;
  gameTitle?: string;
  isPractice?: boolean;
  onVictory?: (stars: number, xpGained: number) => void;
  onGameOver?: () => void;
  onBack?: () => void;
  englishGameType?: MiniGameType;
};

const EnglishStubGame: React.FC<EnglishStubGameProps> = ({
  levelId,
  gameTitle,
  onVictory,
  onGameOver,
  onBack,
  englishGameType,
}) => {
  const title = useMemo(() => {
    if (gameTitle) return gameTitle;
    if (englishGameType) return getCanonicalGameLabel(englishGameType);
    return 'English Mini-game';
  }, [englishGameType, gameTitle]);

  return (
    <GameScreenLayout
      top={(
        <FramedPanel variant="surface" className="p-3 md:p-4">
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">Testing stub</div>
          <div className="mt-1 text-lg font-black text-white md:text-2xl">{title}</div>
          <div className="mt-1 text-sm font-semibold text-cyan-100/85">
            This scene is wired into the campaign flow so you can test the island → level → gameplay loop.
          </div>
        </FramedPanel>
      )}
      main={(
        <FramedPanel variant="surface" className="flex h-full min-h-0 flex-col gap-3 p-4 md:gap-4 md:p-6">
          <div className="text-sm font-black uppercase tracking-[0.18em] text-cyan-100/75">Level</div>
          <div className="text-4xl font-black text-amber-100">{levelId}</div>
          <div className="text-sm font-semibold text-white/90">
            Replace this stub with the real mini-game implementation from the English master build spec.
          </div>
          <div className="mt-auto text-xs font-semibold text-white/70">
            Shell rules: top HUD, playfield, bottom actions â€” no scrolling in gameplay.
          </div>
        </FramedPanel>
      )}
      bottom={(
        <div className="flex w-full flex-col gap-2 md:flex-row md:gap-3">
          <PrimaryButton
            onClick={() => onVictory?.(3, 120)}
            className="h-14 w-full rounded-2xl text-base md:h-16 md:flex-1 md:text-lg"
          >
            Win (3 stars)
          </PrimaryButton>
          <SecondaryButton
            onClick={() => onGameOver?.()}
            className="h-14 w-full rounded-2xl text-base md:h-16 md:flex-1 md:text-lg"
          >
            Game Over
          </SecondaryButton>
          <button
            type="button"
            onClick={() => onBack?.()}
            className="h-14 w-full rounded-2xl border border-white/18 bg-white/10 px-6 text-base font-black text-white shadow-[0_14px_28px_rgba(2,6,23,0.25)] md:h-16 md:w-auto md:px-8 md:text-lg"
          >
            Back
          </button>
        </div>
      )}
    />
  );
};

export default EnglishStubGame;
