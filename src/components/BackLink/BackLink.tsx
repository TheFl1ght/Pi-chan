import { Link } from 'react-router-dom';
import './BackLink.css';

export default function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="back-link">
      ← назад к теме «{label}»
    </Link>
  );
}
