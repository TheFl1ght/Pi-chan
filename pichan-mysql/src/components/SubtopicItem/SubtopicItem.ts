import type { ReactNode } from 'react';

export interface SubtopicItemProps {
  index: number;
  title: string;
  formula?: ReactNode;
  to: string;
  onDelete?: () => void;
}
