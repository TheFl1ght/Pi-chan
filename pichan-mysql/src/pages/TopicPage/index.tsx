import PageHeader from '../../components/PageHeader';
import TopicIntro from '../../components/TopicIntro';
import SubtopicList from '../../components/SubtopicList';
import AddSubtopicForm from '../../admin/AddSubtopicForm';
import { useEffectiveSubtopics, contentGroupKey } from '../../admin/useEffectiveContent';
import { useOverrides } from '../../admin/OverridesContext';
import { useEditMode } from '../../admin/EditModeContext';
import type { SimpleSubtopic } from '../../models/types';
import type { TopicPageProps } from './TopicPage';

export default function TopicPage({ topic, index, accent, trail, hrefBase }: TopicPageProps) {
  const subs = useEffectiveSubtopics(topic.t);
  const { addItem, deleteItem } = useOverrides();
  const { isEditMode } = useEditMode();
  const group = contentGroupKey(topic.t);

  return (
    <>
      <PageHeader accent={accent} trail={trail} current={topic.t} />
      <TopicIntro title={topic.t} formula={topic.f} accent={accent} />
      <SubtopicList
        label="содержание темы — нажми, чтобы открыть материал"
        items={subs.map((s, i) => ({
          title: s.h,
          formula: 'f' in s ? s.f : undefined,
          to: `${hrefBase}/${index}/${i}`,
          onDelete: isEditMode ? () => deleteItem(group, s.h) : undefined,
        }))}
      />
      <AddSubtopicForm
        onAdd={(title, formula) => {
          const newSub: SimpleSubtopic = {
            h: title,
            f: formula || undefined,
            material: 'Текст ещё не добавлен.',
          };
          addItem(group, newSub);
        }}
      />
    </>
  );
}
