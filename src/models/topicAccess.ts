import { TOPIC_CONTENT } from './topicContent';
import { HIGHER_CONTENT } from './higherContent';
import { isDeepHigherTopic, type HigherTopicEntry, type Subtopic } from './types';

export function getSubtopics(title: string): Subtopic[] {
  return TOPIC_CONTENT[title] ?? [];
}

export function getHigherEntry(title: string): HigherTopicEntry | undefined {
  return HIGHER_CONTENT[title];
}

export function countHigherSubtopics(entry: HigherTopicEntry | undefined): number {
  if (!entry) return 0;
  return isDeepHigherTopic(entry) ? entry.subtopics.length : entry.theory.length + entry.practice.length;
}
