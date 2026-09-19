import type { Topic } from '../models/types';

export function normalizeQuery(raw: string): string {
  return raw.trim().toLowerCase();
}

export function topicMatches(topic: Topic, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;
  return `${topic.t} ${topic.f}`.toLowerCase().includes(normalizedQuery);
}
