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
  const { addItem, deleteItem, getField, setField } = useOverrides();
  const { isEditMode } = useEditMode();
  const group = contentGroupKey(topic.t);

  const overrideBadge = getField(`topic:${topic.t}:badge`, '__NO_OVERRIDE__');
  const overrideColor = getField(`topic:${topic.t}:badgeColor`, '__NO_OVERRIDE__');
  const badge =
    overrideBadge !== '__NO_OVERRIDE__'
      ? overrideBadge.trim() || undefined
      : topic.badge ?? (topic.status === 'dev' ? 'в разработке' : topic.status === 'soon' ? 'скоро' : topic.status);
  const badgeColor =
    overrideColor !== '__NO_OVERRIDE__'
      ? overrideColor
      : topic.badgeColor ?? (topic.status === 'dev' ? 'var(--chalk-yellow)' : topic.status === 'soon' ? 'var(--chalk-red)' : undefined);

  const handleUpdateBadge = (newBadge: string, newColor: string) => {
    setField(`topic:${topic.t}:badge`, newBadge);
    setField(`topic:${topic.t}:badgeColor`, newColor);
  };

  return (
    <>
      <PageHeader accent={accent} trail={trail} current={topic.t} />
      <TopicIntro
        title={topic.t}
        formula={topic.f}
        accent={accent}
        badge={badge}
        badgeColor={badgeColor}
        canEditBadge={isEditMode}
        onUpdateBadge={handleUpdateBadge}
      />
      <SubtopicList
        label="содержание темы — нажми, чтобы открыть материал"
        items={subs.map((s, i) => {
          const subBadge = getField(`${group}:sub:${i}:badge`, '__NO_OVERRIDE__');
          const subColor = getField(`${group}:sub:${i}:badgeColor`, '__NO_OVERRIDE__');
          const effectiveBadge = subBadge !== '__NO_OVERRIDE__' ? subBadge.trim() || undefined : undefined;
          const effectiveColor = subColor !== '__NO_OVERRIDE__' ? subColor : undefined;
          return {
            title: s.h,
            formula: 'f' in s ? s.f : undefined,
            to: `${hrefBase}/${index}/${i}`,
            badge: effectiveBadge,
            badgeColor: effectiveColor,
            canEditBadge: isEditMode,
            onUpdateBadge: (b, c) => {
              setField(`${group}:sub:${i}:badge`, b);
              setField(`${group}:sub:${i}:badgeColor`, c);
            },
            onDelete: isEditMode ? () => deleteItem(group, s.h) : undefined,
          };
        })}
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
