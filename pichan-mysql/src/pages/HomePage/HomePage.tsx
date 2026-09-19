import Hero from '../../components/Hero/Hero';
import TileGrid from '../../components/TileGrid/TileGrid';
import Tile from '../../components/Tile';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TileGrid>
        <Tile
          to="/math"
          accent="var(--chalk-blue)"
          tag="раздел"
          title="Математика"
          description="Школьная, олимпиадная и высшая математика — с разбивкой по темам."
          enterLabel="→ открыть раздел (3 подраздела)"
          bigNum="M"
        />
        <Tile
          to="/physics"
          accent="var(--chalk-teal)"
          tag="раздел"
          title="Физика"
          description="Раздел в разработке. Темы появятся здесь позже — по аналогии с математикой."
          enterLabel="→ скоро"
          bigNum="Φ"
          disabled
        />
      </TileGrid>
    </>
  );
}
