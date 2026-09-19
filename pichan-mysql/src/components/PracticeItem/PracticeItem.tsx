import type { PracticeProblem } from '../../models/types';
import MathFormula from '../MathFormula';
import Disclosure from '../Disclosure';
import StepList from '../StepList';
import Editable from '../../admin/Editable';
import './PracticeItem.css';

export default function PracticeItem({ item, pathPrefix }: { item: PracticeProblem; pathPrefix: string }) {
  return (
    <div className="practice-item">
      <div className="practice-label">
        <Editable path={`${pathPrefix}.h`} value={item.h} multiline={false} />
      </div>
      <div className="practice-problem">
        <Editable
          path={`${pathPrefix}.problem`}
          value={item.problem}
          render={(v) => (
            <MathFormula mode="inline" as="span">
              {v}
            </MathFormula>
          )}
        />
      </div>
      <Disclosure label="Решение">
        <StepList
          steps={item.steps.map((step, i) => (
            <Editable
              key={i}
              path={`${pathPrefix}.steps.${i}`}
              value={step}
              render={(v) => (
                <MathFormula mode="inline" as="span">
                  {v}
                </MathFormula>
              )}
            />
          ))}
        />
      </Disclosure>
    </div>
  );
}
