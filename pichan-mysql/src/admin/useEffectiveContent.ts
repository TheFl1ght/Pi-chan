import { MATH_BOARDS } from '../models/mathBoards';
import { getSubtopics, getHigherEntry } from '../models/topicAccess';
import { isDeepHigherTopic, type HigherSubtopic, type Subtopic, type Topic } from '../models/types';
import { useOverrides } from './OverridesContext';

export function contentGroupKey(topicTitle: string): string {
  return `content:${topicTitle}`;
}

export function higherGroupKey(topicTitle: string): string {
  return `higher:${topicTitle}`;
}

export function boardTopicsGroupKey(boardKey: string): string {
  return `board:${boardKey}:topics`;
}

export function useEffectiveTopics(boardKey: 'higher' | 'olympiad'): Topic[] {
  const { getAddedItems, isDeleted } = useOverrides();
  const group = boardTopicsGroupKey(boardKey);
  const board = MATH_BOARDS[boardKey];
  const base = board?.topics ?? [];
  const added = getAddedItems<Topic>(group);
  const combined = added.length > 0 ? [...base, ...added] : base;
  return combined.filter((t) => !isDeleted(group, t.t));
}

export function useEffectiveSubtopics(topicTitle: string): Subtopic[] {
  const { getAddedItems, isDeleted } = useOverrides();
  const group = contentGroupKey(topicTitle);
  const base = getSubtopics(topicTitle);
  const added = getAddedItems<Subtopic>(group);
  const combined = added.length > 0 ? [...base, ...added] : base;
  return combined.filter((s) => !isDeleted(group, s.h));
}

/** Returns null when the topic isn't in the "deep" (subtopics-based) higher-math shape. Custom topics return an array of subtopics. */
export function useEffectiveHigherSubtopics(topicTitle: string): HigherSubtopic[] | null {
  const { getAddedItems, isDeleted } = useOverrides();
  const group = higherGroupKey(topicTitle);
  const entry = getHigherEntry(topicTitle);
  const added = getAddedItems<HigherSubtopic>(group);
  if (!entry) {
    return added.filter((s) => !isDeleted(group, s.h));
  }
  if (!isDeepHigherTopic(entry)) return null;
  const combined = added.length > 0 ? [...entry.subtopics, ...added] : entry.subtopics;
  return combined.filter((s) => !isDeleted(group, s.h));
}
