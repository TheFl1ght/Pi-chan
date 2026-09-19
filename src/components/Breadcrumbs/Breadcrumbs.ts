import type { Breadcrumb } from '../../models/types';

export interface BreadcrumbsProps {
  trail: Breadcrumb[];
  current: string;
}
