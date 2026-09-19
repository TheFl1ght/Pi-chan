import type { MathBoardKey } from '../../models/types';

export const BOARD_ACCENTS: Record<MathBoardKey, string> = {
  school: 'var(--chalk-blue)',
  olympiad: 'var(--chalk-pink)',
  higher: 'var(--chalk-yellow)',
};

export const BOARD_ICONS: Record<MathBoardKey, string> = {
  school: '1—11',
  olympiad: '★',
  higher: '∫',
};
