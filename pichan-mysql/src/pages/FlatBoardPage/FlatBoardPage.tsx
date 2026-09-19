import type { ReactNode } from 'react';
import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import NoResults from '../../components/NoResults/NoResults';
import RowList from '../../components/RowList/RowList';
import RowCard from '../../components/RowCard';
import MathFormula from '../../components/MathFormula';
import { MATH_BOARDS } from '../../models/mathBoards';
import { getSubtopics, getHigherEntry, countHigherSubtopics } from '../../models/topicAccess';
import { pluralTopics } from '../../controllers/format';
import { useSearchQuery } from '../../controllers/useSearchQuery';
import { topicMatches } from '../../controllers/search';
import { useOverrides } from '../../admin/OverridesContext';
import { useEditMode } from '../../admin/EditModeContext';
import AddTopicForm from '../../admin/AddTopicForm';
import { contentGroupKey, higherGroupKey, useEffectiveTopics, boardTopicsGroupKey } from '../../admin/useEffectiveContent';
import { isDeepHigherTopic, type HigherSubtopic, type Subtopic, type Topic } from '../../models/types';

interface FlatBoardPageProps {
  boardKey: 'olympiad' | 'higher';
}

export default function FlatBoardPage({ boardKey }: FlatBoardPageProps) {
  const board = MATH_BOARDS[boardKey];
  const { query, setQuery, normalized, isSearching } = useSearchQuery();
  const { getAddedItems, isDeleted, addItem, deleteItem } = useOverrides();
  const { isEditMode } = useEditMode();
  const topics = useEffectiveTopics(boardKey);
  const visible = isSearching ? topics.filter((t) => topicMatches(t, normalized)) : topics;

  const rowMeta = (t: Topic): { formula: ReactNode; meta: string } => {
    if (boardKey === 'higher') {
      const entry = getHigherEntry(t.t);
      const group = higherGroupKey(t.t);
      const added = getAddedItems<HigherSubtopic>(group);
      if (entry && isDeepHigherTopic(entry)) {
        const count = [...entry.subtopics, ...added].filter((s) => !isDeleted(group, s.h)).length;
        return {
          formula: <MathFormula mode="block">{t.f}</MathFormula>,
          meta: pluralTopics(count),
        };
      }
      if (entry && !isDeepHigherTopic(entry)) {
        return {
          formula: <MathFormula mode="block">{t.f}</MathFormula>,
          meta: pluralTopics(countHigherSubtopics(entry)),
        };
      }
      const count = added.filter((s) => !isDeleted(group, s.h)).length;
      return {
        formula: <MathFormula mode="block">{t.f}</MathFormula>,
        meta: pluralTopics(count),
      };
    }
    const group = contentGroupKey(t.t);
    const count = [...getSubtopics(t.t), ...getAddedItems<Subtopic>(group)].filter(
      (s) => !isDeleted(group, s.h),
    ).length;
    return { formula: t.f, meta: pluralTopics(count) };
  };

  return (
    <>
      <PageHeader
        accent={board.accent}
        trail={[{ label: 'π-chan', href: '/' }, { label: 'Математика', href: '/math' }]}
        current={board.title}
        title={board.title}
        titleExtra={<span className="title-slash">{topics.length} тем</span>}
        desc={board.desc}
      />
      <SearchBar placeholder="Поиск темы…" value={query} onChange={setQuery} />
      {isSearching && visible.length === 0 && <NoResults />}
      <RowList>
        {visible.map((t) => {
          const index = topics.indexOf(t);
          const { formula, meta } = rowMeta(t);
          return (
            <RowCard
              key={t.t}
              index={index}
              formula={formula}
              title={t.t}
              meta={meta}
              to={`/math/${boardKey}/${index}`}
              accent={board.accent}
              status={t.status}
              onDelete={isEditMode ? () => deleteItem(boardTopicsGroupKey(boardKey), t.t) : undefined}
            />
          );
        })}
      </RowList>

      {boardKey === 'higher' && (
        <AddTopicForm
          boardAccent={board.accent}
          onAdd={(newTopic) => {
            addItem(boardTopicsGroupKey('higher'), newTopic);
          }}
        />
      )}
    </>
  );
}
