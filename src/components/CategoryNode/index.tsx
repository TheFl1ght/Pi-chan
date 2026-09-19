import { useState, type CSSProperties } from 'react';
import { topicMatches } from '../../controllers/search';
import { getSubtopics } from '../../models/topicAccess';
import { pluralTopics } from '../../controllers/format';
import { useOverrides } from '../../admin/OverridesContext';
import { useEditMode } from '../../admin/EditModeContext';
import { contentGroupKey } from '../../admin/useEffectiveContent';
import type { Subtopic } from '../../models/types';
import RowList from '../RowList/RowList';
import RowCard from '../RowCard';
import type { CategoryNodeProps } from './CategoryNode';
import './CategoryNode.css';

export default function CategoryNode({ category, accent, hrefBase, query }: CategoryNodeProps) {
  const [manualOpen, setManualOpen] = useState(false);
  const { getAddedItems, isDeleted, getField, setField } = useOverrides();
  const { isEditMode } = useEditMode();
  const searching = query.length > 0;
  const topics = searching ? category.topics.filter((t) => topicMatches(t, query)) : category.topics;

  if (searching && topics.length === 0) return null;

  const open = searching ? true : manualOpen;

  const handleUpdateBadge = (topicTitle: string, badgeText: string, badgeColor: string) => {
    setField(`topic:${topicTitle}:badge`, badgeText);
    setField(`topic:${topicTitle}:badgeColor`, badgeColor);
  };

  return (
    <div className={open ? 'cat-node open' : 'cat-node'} style={{ '--accent': accent } as CSSProperties}>
      <div className="cat-head" onClick={() => setManualOpen((v) => !v)}>
        <span className="cat-chevron">▸</span>
        <span className="cat-label">{category.label}</span>
        <span className="cat-count">{category.topics.length} тем</span>
      </div>
      <div className="cat-body">
        <RowList>
          {topics.map((t) => {
            const originalIndex = category.topics.indexOf(t);
            const group = contentGroupKey(t.t);
            const count = [...getSubtopics(t.t), ...getAddedItems<Subtopic>(group)].filter(
              (s) => !isDeleted(group, s.h),
            ).length;

            const overrideBadge = getField(`topic:${t.t}:badge`, '__NO_OVERRIDE__');
            const overrideColor = getField(`topic:${t.t}:badgeColor`, '__NO_OVERRIDE__');
            const badge =
              overrideBadge !== '__NO_OVERRIDE__'
                ? overrideBadge.trim() || undefined
                : t.badge ?? (t.status === 'dev' ? 'в разработке' : t.status === 'soon' ? 'скоро' : t.status);
            const badgeColor =
              overrideColor !== '__NO_OVERRIDE__'
                ? overrideColor
                : t.badgeColor ?? (t.status === 'dev' ? 'var(--chalk-yellow)' : t.status === 'soon' ? 'var(--chalk-red)' : undefined);

            return (
              <RowCard
                key={t.t}
                index={originalIndex}
                formula={t.f}
                title={t.t}
                meta={pluralTopics(count)}
                to={`${hrefBase}/${originalIndex}`}
                accent={accent}
                status={badge}
                badge={badge}
                badgeColor={badgeColor}
                canEditBadge={isEditMode}
                onUpdateBadge={(newBadge, newColor) => handleUpdateBadge(t.t, newBadge, newColor)}
              />
            );
          })}
        </RowList>
      </div>
    </div>
  );
}
