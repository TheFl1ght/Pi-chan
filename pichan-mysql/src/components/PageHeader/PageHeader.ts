import type { ReactNode } from 'react';
import type { Breadcrumb } from '../../models/types';

export interface PageHeaderProps {
  trail: Breadcrumb[];
  current: string;
  accent?: string;
  title?: string;
  titleExtra?: ReactNode;
  desc?: string;
}
