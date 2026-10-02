import { createContext } from 'react';
import type { PlayerData } from '../types';

export type EnglishSaveContextValue = {
  initialPlayer: Partial<PlayerData>;
  storageKey: string;
  queue: (player: PlayerData) => void;
};

export const EnglishSaveContext = createContext<EnglishSaveContextValue | null>(null);
