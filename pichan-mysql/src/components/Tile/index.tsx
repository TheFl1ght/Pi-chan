import { Link } from 'react-router-dom';
import type { TileProps } from './Tile';
import './Tile.css';

export default function Tile({ to, accent, tag, title, description, enterLabel, bigNum, disabled }: TileProps) {
  return (
    <Link
      to={to}
      className={disabled ? 'tile disabled' : 'tile'}
      style={{ '--tile-accent': accent } as React.CSSProperties}
    >
      <span className="tag">{tag}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="enter">{enterLabel}</div>
      <div className="bignum">{bigNum}</div>
    </Link>
  );
}
