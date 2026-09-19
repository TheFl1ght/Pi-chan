import PageHeader from '../../components/PageHeader';
import SearchBar from '../../components/SearchBar';
import NoResults from '../../components/NoResults/NoResults';
import GradeNode from '../../components/GradeNode';
import { MATH_BOARDS } from '../../models/mathBoards';
import { useSearchQuery } from '../../controllers/useSearchQuery';
import { anyGradeMatches } from './SchoolBoardPage';
import './SchoolBoardPage.css';

export default function SchoolBoardPage() {
  const board = MATH_BOARDS.school;
  const { query, setQuery, normalized, isSearching } = useSearchQuery();
  const grades = board.grades ?? [];
  const showNoResults = isSearching && !anyGradeMatches(grades, normalized);

  return (
    <>
      <PageHeader
        accent={board.accent}
        trail={[{ label: 'π-chan', href: '/' }, { label: 'Математика', href: '/math' }]}
        current={board.title}
        title={board.title}
        desc={board.desc}
      />
      <SearchBar
        placeholder="Поиск темы, например «дроби» или «интеграл»…"
        value={query}
        onChange={setQuery}
      />
      {showNoResults && <NoResults />}
      <div className="tree">
        {grades.map((grade) => (
          <GradeNode
            key={grade.key}
            grade={grade}
            accent={board.accent}
            hrefBase="/math/school"
            query={normalized}
          />
        ))}
      </div>
    </>
  );
}
