import type { CSSProperties } from 'react';
import Editable from '../../admin/Editable';
import './DefinitionBox.css';

export default function DefinitionBox({ path, text, accent }: { path: string; text: string; accent: string }) {
  return (
    <div className="def-box" style={{ '--accent': accent } as CSSProperties}>
      <span className="def-icon">✎</span>
      <p>
        <Editable path={path} value={text} />
      </p>
    </div>
  );
}
