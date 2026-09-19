import { useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import TopicIntro from '../../components/TopicIntro';
import TabsPanel from '../../components/TabsPanel';
import MathFormula from '../../components/MathFormula';
import BackLink from '../../components/BackLink/BackLink';
import { useEffectiveHigherSubtopics, higherGroupKey, useEffectiveTopics } from '../../admin/useEffectiveContent';
import { useOverrides } from '../../admin/OverridesContext';
import { useEditMode } from '../../admin/EditModeContext';
import { MATH_BOARDS } from '../../models/mathBoards';

export default function HigherSubtopicPage() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { idx, subIdx } = useParams();
  const navigate = useNavigate();
  const { deleteItem } = useOverrides();
  const { isEditMode } = useEditMode();
  const board = MATH_BOARDS.higher;
  const index = Number(idx);
  const subIndex = Number(subIdx);
  const topics = useEffectiveTopics('higher');
  const topic = topics[index];

  const subtopics = useEffectiveHigherSubtopics(topic?.t ?? '');

  if (!topic) return <Navigate to="/math/higher" replace />;
  if (!subtopics) return <Navigate to={`/math/higher/${index}`} replace />;

  const sub = subtopics[subIndex];
  if (!sub) return <Navigate to={`/math/higher/${index}`} replace />;

  const topicHref = `/math/higher/${index}`;
  const trail = [
    { label: 'π-chan', href: '/' },
    { label: 'Математика', href: '/math' },
    { label: board.title, href: '/math/higher' },
    { label: topic.t, href: topicHref },
  ];

  return (
    <>
      <PageHeader accent={board.accent} trail={trail} current={sub.h} />
      <TopicIntro
        title={sub.h}
        formula={sub.f ? <MathFormula mode="block">{sub.f}</MathFormula> : undefined}
        accent={board.accent}
      />
      <TabsPanel
        theory={sub.theory}
        practice={sub.practice}
        accent={board.accent}
        pathPrefix={`${higherGroupKey(topic.t)}:sub:${subIndex}`}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
        <BackLink to={topicHref} label={topic.t} />
        {isEditMode && (
          confirmDelete ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#f87171', fontFamily: 'JetBrains Mono, monospace' }}>
                Точно удалить?
              </span>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                style={{ color: '#fff', background: '#ef4444', borderColor: '#dc2626' }}
                onClick={() => {
                  deleteItem(higherGroupKey(topic.t), sub.h);
                  navigate(topicHref);
                }}
              >
                Да, удалить
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
              🗑 Удалить эту подтему
            </button>
          )
        )}
      </div>
    </>
  );
}
