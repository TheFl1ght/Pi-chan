import { useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import TopicIntro from '../../components/TopicIntro';
import SubtopicList from '../../components/SubtopicList';
import TabsPanel from '../../components/TabsPanel';
import MathFormula from '../../components/MathFormula';
import BackLink from '../../components/BackLink/BackLink';
import AddSubtopicForm from '../../admin/AddSubtopicForm';
import {
  useEffectiveHigherSubtopics,
  higherGroupKey,
  useEffectiveTopics,
  boardTopicsGroupKey,
} from '../../admin/useEffectiveContent';
import { useOverrides } from '../../admin/OverridesContext';
import { useEditMode } from '../../admin/EditModeContext';
import { MATH_BOARDS } from '../../models/mathBoards';
import { getHigherEntry } from '../../models/topicAccess';
import { isDeepHigherTopic, type HigherSubtopic } from '../../models/types';

export default function HigherTopicPage() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { idx } = useParams();
  const navigate = useNavigate();
  const board = MATH_BOARDS.higher;
  const index = Number(idx);
  const topics = useEffectiveTopics('higher');
  const topic = topics[index];

  const entry = topic ? getHigherEntry(topic.t) : undefined;
  const deepSubtopics = useEffectiveHigherSubtopics(topic?.t ?? '');
  const { addItem, deleteItem, getField, setField } = useOverrides();
  const { isEditMode } = useEditMode();

  if (!topic) return <Navigate to="/math/higher" replace />;

  const handleUpdateBadge = (newBadge: string, newColor: string) => {
    setField(`topic:${topic.t}:badge`, newBadge);
    setField(`topic:${topic.t}:badgeColor`, newColor);
  };

  const trail = [
    { label: 'π-chan', href: '/' },
    { label: 'Математика', href: '/math' },
    { label: board.title, href: '/math/higher' },
  ];

  const isDirectTabs = entry && !isDeepHigherTopic(entry);
  const subtopicsList = deepSubtopics ?? (entry && isDeepHigherTopic(entry) ? entry.subtopics : []);

  return (
    <>
      <PageHeader accent={board.accent} trail={trail} current={topic.t} />
      <TopicIntro
        title={topic.t}
        formula={<MathFormula mode="block">{topic.f}</MathFormula>}
        accent={board.accent}
        badge={topic.badge}
        badgeColor={topic.badgeColor}
        canEditBadge={isEditMode}
        onUpdateBadge={handleUpdateBadge}
      />
      {isDirectTabs ? (
        <TabsPanel
          theory={entry.theory}
          practice={entry.practice}
          accent={board.accent}
          pathPrefix={higherGroupKey(topic.t)}
        />
      ) : (
        <>
          <SubtopicList
            label="подтемы и теоремы — нажми, чтобы открыть подробный материал"
            items={subtopicsList.map((s, i) => {
              const subBadge = getField(`${higherGroupKey(topic.t)}:sub:${i}:badge`, '__NO_OVERRIDE__');
              const subColor = getField(`${higherGroupKey(topic.t)}:sub:${i}:badgeColor`, '__NO_OVERRIDE__');
              const effectiveBadge = subBadge !== '__NO_OVERRIDE__' ? subBadge.trim() || undefined : undefined;
              const effectiveColor = subColor !== '__NO_OVERRIDE__' ? subColor : undefined;
              return {
                title: s.h,
                formula: s.f ? <MathFormula mode="inline">{s.f.startsWith('$') ? s.f : `$${s.f}$`}</MathFormula> : undefined,
                to: `/math/higher/${index}/${i}`,
                badge: effectiveBadge,
                badgeColor: effectiveColor,
                canEditBadge: isEditMode,
                onUpdateBadge: (b, c) => {
                  setField(`${higherGroupKey(topic.t)}:sub:${i}:badge`, b);
                  setField(`${higherGroupKey(topic.t)}:sub:${i}:badgeColor`, c);
                },
                onDelete: isEditMode ? () => deleteItem(higherGroupKey(topic.t), s.h) : undefined,
              };
            })}
          />
          <AddSubtopicForm
            onAdd={(title, formula) => {
              const newSub: HigherSubtopic = {
                h: title,
                f: formula || undefined,
                theory: [{ h: 'Новый пункт', text: 'Текст ещё не добавлен.' }],
                practice: [],
              };
              addItem(higherGroupKey(topic.t), newSub);
            }}
          />
        </>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px' }}>
        <BackLink to="/math/higher" label={board.title} />
        {isEditMode && (
          confirmDelete ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#f87171', fontFamily: 'JetBrains Mono, monospace' }}>
                Удалить тему «{topic.t}»?
              </span>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                style={{ color: '#fff', background: '#ef4444', borderColor: '#dc2626' }}
                onClick={() => {
                  deleteItem(boardTopicsGroupKey('higher'), topic.t);
                  navigate('/math/higher');
                }}
              >
                Да, удалить тему
              </button>
              <button
                type="button"
                className="admin-btn"
                onClick={() => setConfirmDelete(false)}
              >
                Отмена
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="admin-btn admin-btn--danger"
              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
              onClick={() => setConfirmDelete(true)}
            >
              🗑 Удалить эту тему
            </button>
          )
        )}
      </div>
    </>
  );
}
