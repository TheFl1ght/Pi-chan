import PageHeader from '../../components/PageHeader';
import Placeholder from '../../components/Placeholder';

export default function ForumPage() {
  return (
    <>
      <PageHeader
        accent="var(--chalk-teal)"
        trail={[{ label: 'π-chan', href: '/' }]}
        current="Форум"
        title="Форум"
      />
      <Placeholder
        accent="var(--chalk-teal)"
        icon="◈"
        title="Скоро здесь будет форум"
        text="Отдельная вкладка с обсуждениями в формате, близком к Reddit: посты, треды, голосование. Появится отдельно от учебных материалов."
      />
    </>
  );
}
