import { useState } from 'react';
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom';
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
  const { deleteItem, getField, setField } = useOverrides();
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

  const prevSub = subIndex > 0 ? { sub: subtopics[subIndex - 1], idx: subIndex - 1 } : null;
  const nextSub = subIndex < subtopics.length - 1 ? { sub: subtopics[subIndex + 1], idx: subIndex + 1 } : null;

  const subBadge = getField(`${higherGroupKey(topic.t)}:sub:${subIndex}:badge`, '__NO_OVERRIDE__');
  const subColor = getField(`${higherGroupKey(topic.t)}:sub:${subIndex}:badgeColor`, '__NO_OVERRIDE__');
  const effectiveBadge = subBadge !== '__NO_OVERRIDE__' ? subBadge.trim() || undefined : undefined;
  const effectiveColor = subColor !== '__NO_OVERRIDE__' ? subColor : undefined;

  return (
    <>
      <PageHeader accent={board.accent} trail={trail} current={sub.h} />
      <TopicIntro
        title={sub.h}
        formula={sub.f ? <MathFormula mode="block">{sub.f}</MathFormula> : undefined}
        accent={board.accent}
        badge={effectiveBadge}
        badgeColor={effectiveColor}
        canEditBadge={isEditMode}
        onUpdateBadge={(b, c) => {
          setField(`${higherGroupKey(topic.t)}:sub:${subIndex}:badge`, b);
          setField(`${higherGroupKey(topic.t)}:sub:${subIndex}:badgeColor`, c);
        }}
      />
      <TabsPanel
        theory={sub.theory}
        practice={sub.practice}
        accent={board.accent}
        pathPrefix={`${higherGroupKey(topic.t)}:sub:${subIndex}`}
      />
      <div
        className="subtopic-nav-controls"
        style={{
          display: 'grid',
          gridTemplateColumns: prevSub && nextSub ? '1fr 1fr' : '1fr',
          gap: '14px',
          marginTop: '28px',
          marginBottom: '20px',
        }}
      >
        {prevSub && (
          <Link
            to={`/math/higher/${index}/${prevSub.idx}`}
            className="subtopic-nav-btn"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 16px',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              color: 'var(--chalk)',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--chalk-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              ← Предыдущая подтема ({prevSub.idx + 1}/{subtopics.length})
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--chalk-white)', marginTop: '4px' }}>
              {prevSub.sub.h}
            </span>
          </Link>
        )}
        {nextSub && (
          <Link
            to={`/math/higher/${index}/${nextSub.idx}`}
            className="subtopic-nav-btn"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: prevSub ? 'flex-end' : 'flex-start',
              textAlign: prevSub ? 'right' : 'left',
              padding: '12px 16px',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              color: 'var(--chalk)',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                color: 'var(--chalk-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Следующая подтема ({nextSub.idx + 1}/{subtopics.length}) →
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--chalk-white)', marginTop: '4px' }}>
              {nextSub.sub.h}
            </span>
          </Link>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
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
