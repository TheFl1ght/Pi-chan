import type { CSSProperties } from 'react';
import type { PlaceholderProps } from './Placeholder';
import './Placeholder.css';

export default function Placeholder({ icon, title, text, accent }: PlaceholderProps) {
  return (
    <div className="placeholder" style={{ '--accent': accent } as CSSProperties}>
      <div className="icon">{icon}</div>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
