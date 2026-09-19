import { Navigate, useParams } from 'react-router-dom';
import TopicPage from '../TopicPage';
import MaterialPage from '../MaterialPage';
import { MATH_BOARDS } from '../../models/mathBoards';
import { useEffectiveSubtopics } from '../../admin/useEffectiveContent';
import { resolveSchoolPath } from './SchoolTopicRoute';

export default function SchoolTopicRoute() {
  const { gradeKey = '', '*': wildcard = '' } = useParams();
  const board = MATH_BOARDS.school;
  const grade = board.grades?.find((g) => g.key === gradeKey);

  const rest = wildcard.split('/').filter(Boolean);
  const resolved = grade ? resolveSchoolPath(grade, gradeKey, rest) : undefined;
  const topics = resolved?.category ? resolved.category.topics : (grade?.topics ?? []);
  const topic = resolved ? topics[resolved.index] : undefined;

  const subs = useEffectiveSubtopics(topic?.t ?? '');

  if (!grade) return <Navigate to="/math/school" replace />;
  if (!resolved) return <Navigate to="/math/school" replace />;
  if (!topic) return <Navigate to="/math/school" replace />;

  if (resolved.subIndex === undefined) {
    return (
      <TopicPage
        topic={topic}
        index={resolved.index}
        accent={board.accent}
        trail={resolved.trail}
        hrefBase={resolved.hrefBase}
      />
    );
  }

  const sub = subs[resolved.subIndex];
  if (!sub) return <Navigate to={`${resolved.hrefBase}/${resolved.index}`} replace />;

  return (
    <MaterialPage
      topic={topic}
      index={resolved.index}
      sub={sub}
      accent={board.accent}
      trail={resolved.trail}
      hrefBase={resolved.hrefBase}
    />
  );
}
