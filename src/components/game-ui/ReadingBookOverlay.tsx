import React from 'react';
import { BookOpen, X } from 'lucide-react';

type ReadingBookOverlayProps = {
  title: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
};

const ReadingBookOverlay: React.FC<ReadingBookOverlayProps> = ({
  title,
  isOpen,
  onOpen,
  onClose,
  children,
}) => (
  <>
    <div className="flex w-full items-center justify-end">
      <button
        type="button"
        onClick={onOpen}
        className={[
          'lexcoria-book-open inline-flex h-12 min-w-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-4',
          'text-white shadow-[0_12px_26px_rgba(2,6,23,0.28)] transition-[transform,filter,background] duration-150',
          'hover:bg-white/10 active:translate-y-[1px] active:brightness-95',
        ].join(' ')}
        aria-label="Open passage"
      >
        <BookOpen className="h-5 w-5 shrink-0" />
        <span className="text-sm font-bold">Read passage</span>
      </button>
    </div>

    {isOpen ? (
      <div className="reading-book-overlay absolute inset-0 z-[100] flex min-h-0 flex-col overflow-hidden rounded-[1.4rem] border border-white/15 bg-[#092d3b] shadow-[0_22px_46px_rgba(2,6,23,0.55)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="min-w-0">
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/65">Passage</div>
            <div className="mt-0.5 truncate text-base font-black text-white">{title}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={[
              'inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/8',
              'text-white shadow-[0_12px_26px_rgba(2,6,23,0.28)] transition-[transform,filter,background] duration-150',
              'hover:bg-white/10 active:translate-y-[1px] active:brightness-95',
            ].join(' ')}
            aria-label="Close passage"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="reading-scroll-panel min-h-0 flex-1 overflow-y-auto px-4 py-4 text-sm font-semibold leading-relaxed text-white/90 md:text-base">
          {children}
        </div>
      </div>
    ) : null}
  </>
);

export default ReadingBookOverlay;

