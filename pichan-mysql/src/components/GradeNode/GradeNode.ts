import type { Grade } from '../../models/types';

export interface GradeNodeProps {
  grade: Grade;
  accent: string;
  hrefBase: string;
  query: string;
}

export function gradeTopicCount(grade: Grade): number {
  if (grade.categories) return grade.categories.reduce((sum, c) => sum + c.topics.length, 0);
  return grade.topics?.length ?? 0;
}
