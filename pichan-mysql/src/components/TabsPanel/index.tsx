import { useState, type CSSProperties } from 'react';
import TheoryItem from '../TheoryItem/TheoryItem';
import PracticeList from '../PracticeList/PracticeList';
import AddTheoryItemForm from '../../admin/AddTheoryItemForm';
import AddPracticeItemForm from '../../admin/AddPracticeItemForm';
import { useTabsContent } from '../../admin/useTabsContent';
import type { TabKey, TabsPanelProps } from './TabsPanel';
import './TabsPanel.css';

export default function TabsPanel({ theory: baseTheory, practice: basePractice, accent, pathPrefix }: TabsPanelProps) {
  const [tab, setTab] = useState<TabKey>('theory');
  const { theory, practice, addTheoryItem, addPracticeItem } = useTabsContent(pathPrefix, baseTheory, basePractice);

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
          <TheoryItem key={i} item={item} pathPrefix={`${pathPrefix}.theory.${i}`} />
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
