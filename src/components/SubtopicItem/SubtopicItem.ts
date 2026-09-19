import type { ReactNode } from 'react';

export interface SubtopicItemProps {
  index: number;
  title: string;
  formula?: ReactNode | string;
  to: string;
  badge?: string;
  badgeColor?: string;
  canEditBadge?: boolean;
  onUpdateBadge?: (badgeText: string, badgeColor: string) => void;
  onDelete?: () => void;
  showIndex?: boolean;
}
