import React, { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { GameQuestionCard, IconButton, SecondaryButton } from '../game-ui/GameUiKit';
import { FramedPanel, PrimaryActionButton } from '../../layout/ScreenPrimitives';

type StoryOverlayProps = {
  title: string;
  pages: string[];
  open: boolean;
  onClose: () => void;
};

const StoryOverlay: React.FC<StoryOverlayProps> = ({ title, pages, open, onClose }) => {
  const safePages = useMemo(() => (pages.length > 0 ? pages : ['']), [pages]);
  const [pageIndex, setPageIndex] = useState(0);

  if (!open) return null;

  const page = safePages[Math.min(pageIndex, Math.max(0, safePages.length - 1))];
  const isFirst = pageIndex <= 0;
  const isLast = pageIndex >= safePages.length - 1;

  return (
    <div className="absolute inset-0 z-[50] flex h-full w-full flex-col overflow-hidden bg-slate-950/80 p-2 backdrop-blur-sm md:p-4">
      <FramedPanel variant="surface" className="flex h-full min-h-0 w-full flex-col overflow-hidden p-3 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/75">Read story</div>
            <div className="mt-1 truncate text-lg font-black text-white md:text-2xl">{title}</div>
          </div>
          <IconButton icon={<X className="h-5 w-5" />} label="Close story" onClick={onClose} />
        </div>

        <div className="mt-3 flex min-h-0 flex-1 flex-col overflow-hidden">
          <GameQuestionCard title="Story" className="h-full">
            <div className="space-y-3 text-sm font-semibold leading-relaxed text-white/90 md:text-base">
              {page.split('\n').map((line) => (
                <p key={line} className="m-0">
                  {line}
                </p>
              ))}
            </div>
          </GameQuestionCard>
        </div>

        {safePages.length > 1 ? (
          <div className="mt-3 flex w-full items-center gap-2">
            <SecondaryButton disabled={isFirst} onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}>
              Prev
            </SecondaryButton>
            <div className="flex-1 text-center text-xs font-black uppercase tracking-[0.18em] text-cyan-100/70">
              Page {pageIndex + 1}/{safePages.length}
            </div>
            <SecondaryButton disabled={isLast} onClick={() => setPageIndex((prev) => Math.min(safePages.length - 1, prev + 1))}>
              Next
            </SecondaryButton>
          </div>
        ) : (
          <div className="mt-3">
            <PrimaryActionButton onClick={onClose} className="h-14 w-full rounded-2xl text-base md:h-16 md:text-lg">
              Back to questions
            </PrimaryActionButton>
          </div>
        )}
      </FramedPanel>
    </div>
  );
};

export default StoryOverlay;

