import type { CSSProperties } from 'react';
import StepList from '../StepList';
import Editable from '../../admin/Editable';
import type { ExampleBoxProps } from './ExampleBox';
import './ExampleBox.css';

export default function ExampleBox({ pathPrefix, problem, steps, accent }: ExampleBoxProps) {
  return (
    <div className="example-box" style={{ '--accent': accent } as CSSProperties}>
      <div className="example-label">Пример</div>
      <div className="example-problem">
        <Editable path={`${pathPrefix}.problem`} value={problem} />
      </div>
      <div className="example-solution-label">Решение</div>
      <StepList
        steps={steps.map((step, i) => (
          <Editable key={i} path={`${pathPrefix}.steps.${i}`} value={step} />
        ))}
      />
    </div>
  );
}
