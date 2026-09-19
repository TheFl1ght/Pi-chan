import type { ReactNode } from 'react';
import type { TopicStatus } from '../../models/types';

export interface RowCardProps {
  index: number;
  formula: ReactNode;
  title: string;
  meta: string;
  to: string;
  accent: string;
  status?: TopicStatus | string;
  badge?: string;
  badgeColor?: string;
  canEditBadge?: boolean;
  onUpdateBadge?: (badgeText: string, badgeColor: string) => void;
  onDelete?: () => void;
}
