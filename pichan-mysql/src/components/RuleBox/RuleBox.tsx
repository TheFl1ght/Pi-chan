import type { CSSProperties } from 'react';
import Editable from '../../admin/Editable';
import './RuleBox.css';

export default function RuleBox({ path, formula, accent }: { path: string; formula: string; accent: string }) {
  return (
    <div className="rule-box" style={{ '--accent': accent } as CSSProperties}>
      <div className="rule-label">формула</div>
      <div className="rule-formula">
        <Editable path={path} value={formula} />
      </div>
    </div>
  );
}
