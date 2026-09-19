import type { PracticeArr, TheoryItem } from '../../models/types';

export interface TabsPanelProps {
  theory: TheoryItem[];
  practice: PracticeArr;
  accent: string;
  pathPrefix: string;
}

export type TabKey = 'theory' | 'practice';
