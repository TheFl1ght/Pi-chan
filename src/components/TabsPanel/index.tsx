import { useState, type CSSProperties } from 'react';
import TheoryItem from '../TheoryItem/TheoryItem';
import PracticeList from '../PracticeList/PracticeList';
import AddTheoryItemForm from '../../admin/AddTheoryItemForm';
import AddPracticeItemForm from '../../admin/AddPracticeItemForm';
import { useTabsContent } from '../../admin/useTabsContent';
import { useEditMode } from '../../admin/EditModeContext';
import type { TabKey, TabsPanelProps } from './TabsPanel';
import './TabsPanel.css';

export default function TabsPanel({ theory: baseTheory, practice: basePractice, accent, pathPrefix }: TabsPanelProps) {
  const [tab, setTab] = useState<TabKey>('theory');
  const { isEditMode } = useEditMode();
  const { theory, practice, addTheoryItem, addPracticeItem, deleteTheoryItem } = useTabsContent(pathPrefix, baseTheory, basePractice);

  return (
    <div className="tabs-container" style={{ '--accent': accent } as CSSProperties}>
      <div className="tabs-nav">
        <button
          type="button"
          className={tab === 'theory' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTab('theory')}
        >
          Теория
        </button>
        <button
          type="button"
          className={tab === 'practice' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setTab('practice')}
        >
          Практика
        </button>
      </div>
      <div className={tab === 'theory' ? 'tab-panel active' : 'tab-panel'}>
        {theory.map((item, i) => (
          <TheoryItem
            key={item.h ? `${item.h}-${i}` : i}
            item={item}
            pathPrefix={`${pathPrefix}.theory.${i}`}
            onDelete={isEditMode ? () => deleteTheoryItem(item, i) : undefined}
          />
        ))}
        <AddTheoryItemForm onAdd={addTheoryItem} />
      </div>
      <div className={tab === 'practice' ? 'tab-panel active' : 'tab-panel'}>
        <PracticeList practice={practice} pathPrefix={pathPrefix} />
        <AddPracticeItemForm onAdd={addPracticeItem} />
      </div>
    </div>
  );
}
