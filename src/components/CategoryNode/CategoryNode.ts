import type { Category } from '../../models/types';

export interface CategoryNodeProps {
  category: Category;
  accent: string;
  hrefBase: string;
  query: string;
}
