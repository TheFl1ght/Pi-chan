import { Navigate, useParams } from 'react-router-dom';
import TopicPage from '../TopicPage';
import MaterialPage from '../MaterialPage';
import { MATH_BOARDS } from '../../models/mathBoards';
import { useEffectiveSubtopics } from '../../admin/useEffectiveContent';

const TRAIL = [
  { label: 'π-chan', href: '/' },
  { label: 'Математика', href: '/math' },
  { label: 'Олимпиадная математика', href: '/math/olympiad' },
];

export default function OlympiadRoute() {
  const { idx, subIdx } = useParams();
  const board = MATH_BOARDS.olympiad;
  const index = Number(idx);
  const topic = board.topics?.[index];

  const subs = useEffectiveSubtopics(topic?.t ?? '');

  if (!topic) return <Navigate to="/math/olympiad" replace />;

  if (subIdx === undefined) {
    return <TopicPage topic={topic} index={index} accent={board.accent} trail={TRAIL} hrefBase="/math/olympiad" />;
  }

  const sub = subs[Number(subIdx)];
  if (!sub) return <Navigate to={`/math/olympiad/${index}`} replace />;

  return (
    <MaterialPage
      topic={topic}
      index={index}
      sub={sub}
      accent={board.accent}
      trail={TRAIL}
      hrefBase="/math/olympiad"
    />
  );
}
