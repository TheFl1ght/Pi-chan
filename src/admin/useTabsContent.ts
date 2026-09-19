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
  const { getAddedItems, addItem, deleteItem, isDeleted } = useOverrides();

  const theoryGroup = `${pathPrefix}.theory`;
  const addedTheory = getAddedItems<TheoryItem>(theoryGroup);
  const rawTheory = addedTheory.length > 0 ? [...baseTheory, ...addedTheory] : baseTheory;
  const theory = rawTheory.filter((item, idx) => {
    const key = item.h || `block-${idx}`;
    return !isDeleted(theoryGroup, key) && (!item.h || !isDeleted(theoryGroup, item.h));
  });

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

  const addTheoryItem = (item: TheoryItem) => addItem(theoryGroup, item);
  const deleteTheoryItem = (item: TheoryItem, idx: number) => {
    const key = item.h || `block-${idx}`;
    deleteItem(theoryGroup, key);
    if (item.h && item.h !== key) {
      deleteItem(theoryGroup, item.h);
    }
  };
  const addPracticeItem = (item: PracticeProblem) => addItem(`${pathPrefix}.practice`, item);

  return { theory, practice, addTheoryItem, deleteTheoryItem, addPracticeItem, deletedCount: rawTheory.length - theory.length };
}
