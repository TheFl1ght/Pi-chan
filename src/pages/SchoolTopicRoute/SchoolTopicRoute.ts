import type { Breadcrumb, Category, Grade } from '../../models/types';

export interface ResolvedSchoolPath {
  hrefBase: string;
  trail: Breadcrumb[];
  index: number;
  subIndex?: number;
  category?: Category;
}

const BASE_TRAIL: Breadcrumb[] = [
  { label: 'π-chan', href: '/' },
  { label: 'Математика', href: '/math' },
  { label: 'Школьная математика', href: '/math/school' },
];

export function resolveSchoolPath(grade: Grade, gradeKey: string, rest: string[]): ResolvedSchoolPath | undefined {
  if (grade.categories) {
    if (rest.length !== 2 && rest.length !== 3) return undefined;
    const [catKey, idxStr, subIdxStr] = rest;
    const category = grade.categories.find((c) => c.key === catKey);
    if (!category) return undefined;
    return {
      hrefBase: `/math/school/${gradeKey}/${catKey}`,
      trail: [...BASE_TRAIL, { label: `${grade.label} · ${category.label}`, href: '/math/school' }],
      index: Number(idxStr),
      subIndex: subIdxStr !== undefined ? Number(subIdxStr) : undefined,
      category,
    };
  }

  if (rest.length !== 1 && rest.length !== 2) return undefined;
  const [idxStr, subIdxStr] = rest;
  return {
    hrefBase: `/math/school/${gradeKey}`,
    trail: [...BASE_TRAIL, { label: grade.label, href: '/math/school' }],
    index: Number(idxStr),
    subIndex: subIdxStr !== undefined ? Number(subIdxStr) : undefined,
  };
}
