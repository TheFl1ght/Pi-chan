import type { ReactNode } from 'react';

export interface SubtopicListEntry {
  title: string;
  formula?: ReactNode;
  to: string;
  onDelete?: () => void;
}

export interface SubtopicListProps {
  label: string;
  items: SubtopicListEntry[];
}
