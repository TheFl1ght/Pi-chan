import PageHeader from '../../components/PageHeader';
import Placeholder from '../../components/Placeholder';

export default function PhysicsPage() {
  return (
    <>
      <PageHeader
        accent="var(--chalk-teal)"
        trail={[{ label: 'π-chan', href: '/' }]}
        current="Физика"
        title="Физика"
      />
      <Placeholder
        accent="var(--chalk-teal)"
        icon="Φ"
        title="Раздел в разработке"
        text="Здесь появится физика — со своей структурой по темам, как и в математике. Пока в работе только математическая часть сайта."
      />
    </>
  );
}
