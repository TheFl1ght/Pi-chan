import type { ReactNode } from 'react';

export interface TopicIntroProps {
  title: string;
  formula?: ReactNode;
  accent: string;
  badge?: string;
  badgeColor?: string;
  canEditBadge?: boolean;
  onUpdateBadge?: (badgeText: string, badgeColor: string) => void;
}
