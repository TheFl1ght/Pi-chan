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
  const { getAddedItems, isDeleted, getField } = useOverrides();
  const group = boardTopicsGroupKey(boardKey);
  const board = MATH_BOARDS[boardKey];
  const base = board?.topics ?? [];
  const added = getAddedItems<Topic>(group);
  const combined = added.length > 0 ? [...base, ...added] : base;
  return combined
    .filter((t) => !isDeleted(group, t.t))
    .map((t) => {
      const overrideBadge = getField(`topic:${t.t}:badge`, '__NO_OVERRIDE__');
      const overrideColor = getField(`topic:${t.t}:badgeColor`, '__NO_OVERRIDE__');
      if (overrideBadge !== '__NO_OVERRIDE__') {
        const finalBadge = overrideBadge.trim();
        return {
          ...t,
          badge: finalBadge ? finalBadge : undefined,
          status: finalBadge ? finalBadge : undefined,
          badgeColor: overrideColor !== '__NO_OVERRIDE__' ? overrideColor : t.badgeColor,
        };
      }
      return {
        ...t,
        badge: t.badge ?? (t.status === 'dev' ? 'в разработке' : t.status === 'soon' ? 'скоро' : t.status),
        badgeColor: t.badgeColor ?? (t.status === 'dev' ? 'var(--chalk-yellow)' : t.status === 'soon' ? 'var(--chalk-red)' : undefined),
      };
    });
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
