import { useState, type CSSProperties } from 'react';
import { topicMatches } from '../../controllers/search';
import { getSubtopics } from '../../models/topicAccess';
import { pluralTopics } from '../../controllers/format';
import { useOverrides } from '../../admin/OverridesContext';
import { contentGroupKey } from '../../admin/useEffectiveContent';
import type { Subtopic } from '../../models/types';
import RowList from '../RowList/RowList';
import RowCard from '../RowCard';
import CategoryNode from '../CategoryNode';
import { gradeTopicCount, type GradeNodeProps } from './GradeNode';
import './GradeNode.css';

export default function GradeNode({ grade, accent, hrefBase, query }: GradeNodeProps) {
  const [manualOpen, setManualOpen] = useState(false);
  const { getAddedItems, isDeleted } = useOverrides();
  const searching = query.length > 0;

  const hasMatch = grade.categories
    ? grade.categories.some((c) => c.topics.some((t) => topicMatches(t, query)))
    : (grade.topics ?? []).some((t) => topicMatches(t, query));

  if (searching && !hasMatch) return null;

  const open = searching ? true : manualOpen;

  return (
    <div className={open ? 'grade-node open' : 'grade-node'} style={{ '--accent': accent } as CSSProperties}>
      <div className="grade-head" onClick={() => setManualOpen((v) => !v)}>
        <span className="grade-chevron">▸</span>
        <span className="grade-num">{grade.label}</span>
        <div className="grade-info">
          <h3>{grade.desc}</h3>
        </div>
        <span className="grade-count">{gradeTopicCount(grade)} тем</span>
      </div>
      <div className="grade-body">
        {grade.categories ? (
          grade.categories.map((c) => (
            <CategoryNode
              key={c.key}
              category={c}
              accent={accent}
              hrefBase={`${hrefBase}/${grade.key}/${c.key}`}
              query={query}
            />
          ))
        ) : (
          <RowList>
            {(searching ? (grade.topics ?? []).filter((t) => topicMatches(t, query)) : grade.topics ?? []).map(
              (t) => {
                const originalIndex = (grade.topics ?? []).indexOf(t);
                const group = contentGroupKey(t.t);
                const count = [...getSubtopics(t.t), ...getAddedItems<Subtopic>(group)].filter(
                  (s) => !isDeleted(group, s.h),
                ).length;
                return (
                  <RowCard
                    key={t.t}
                    index={originalIndex}
                    formula={t.f}
                    title={t.t}
                    meta={pluralTopics(count)}
                    to={`${hrefBase}/${grade.key}/${originalIndex}`}
                    accent={accent}
                  />
                );
              },
            )}
          </RowList>
        )}
      </div>
    </div>
  );
}
