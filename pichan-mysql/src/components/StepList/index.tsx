import type { StepListProps } from './StepList';
import './StepList.css';

export default function StepList({ steps }: StepListProps) {
  return (
    <ol className="example-steps">
      {steps.map((step, i) => (
        <li key={i}>
          <span className="step-num">{i + 1}</span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}
