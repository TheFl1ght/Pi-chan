import { useOverrides } from './OverridesContext';
import {
  isGroupedPractice,
  type PracticeArr,
  type PracticeGroup,
  type PracticeProblem,
  type TheoryItem,
} from '../models/types';

const ADDED_PRACTICE_GROUP_LABEL = 'Добавлено';

/**
 * Merges the static theory/practice content of a subtopic (or a flat higher-math
 * topic) with any theory items / practice problems inserted through the admin
 * panel, and returns helpers to add more.
 */
export function useTabsContent(pathPrefix: string, baseTheory: TheoryItem[], basePractice: PracticeArr) {
  const { getAddedItems, addItem } = useOverrides();

  const addedTheory = getAddedItems<TheoryItem>(`${pathPrefix}.theory`);
  const theory = addedTheory.length > 0 ? [...baseTheory, ...addedTheory] : baseTheory;

  const addedPractice = getAddedItems<PracticeProblem>(`${pathPrefix}.practice`);
  let practice: PracticeArr = basePractice;
  if (addedPractice.length > 0) {
    if (isGroupedPractice(basePractice)) {
      const addedGroup: PracticeGroup = { group: ADDED_PRACTICE_GROUP_LABEL, problems: addedPractice };
      practice = [...basePractice, addedGroup];
    } else {
      practice = [...basePractice, ...addedPractice];
    }
  }

  const addTheoryItem = (item: TheoryItem) => addItem(`${pathPrefix}.theory`, item);
  const addPracticeItem = (item: PracticeProblem) => addItem(`${pathPrefix}.practice`, item);

  return { theory, practice, addTheoryItem, addPracticeItem };
}
