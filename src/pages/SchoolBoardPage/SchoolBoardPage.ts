import type { Grade } from '../../models/types';
import { topicMatches } from '../../controllers/search';

export function anyGradeMatches(grades: Grade[], query: string): boolean {
  if (!query) return true;
  return grades.some((grade) =>
    grade.categories
      ? grade.categories.some((c) => c.topics.some((t) => topicMatches(t, query)))
      : (grade.topics ?? []).some((t) => topicMatches(t, query)),
  );
}
