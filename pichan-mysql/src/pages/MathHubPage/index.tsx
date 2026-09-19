import PageHeader from '../../components/PageHeader';
import TileGrid from '../../components/TileGrid/TileGrid';
import Tile from '../../components/Tile';
import { MATH_BOARDS } from '../../models/mathBoards';
import type { MathBoardKey } from '../../models/types';
import { BOARD_ACCENTS, BOARD_ICONS } from './MathHubPage';

export default function MathHubPage() {
  return (
    <>
      <PageHeader
        trail={[{ label: 'π-chan', href: '/' }]}
        current="Математика"
        title="Математика"
        desc="Выбери подраздел — каждый разбит на темы, а темы на подтемы."
      />
      <TileGrid>
        {(Object.entries(MATH_BOARDS) as [MathBoardKey, (typeof MATH_BOARDS)[MathBoardKey]][]).map(
          ([key, board]) => (
            <Tile
              key={key}
              to={`/math/${key}`}
              accent={BOARD_ACCENTS[key]}
              tag={board.slug}
              title={board.title}
              description={board.desc}
              enterLabel="→ открыть"
              bigNum={BOARD_ICONS[key]}
            />
          ),
        )}
      </TileGrid>
    </>
  );
}
