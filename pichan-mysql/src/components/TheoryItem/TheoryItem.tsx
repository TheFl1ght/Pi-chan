import type { TheoryItem as TheoryItemModel } from '../../models/types';
import MathFormula from '../MathFormula';
import Disclosure from '../Disclosure';
import Editable from '../../admin/Editable';
import './TheoryItem.css';

export default function TheoryItem({ item, pathPrefix }: { item: TheoryItemModel; pathPrefix: string }) {
  return (
    <div className="theory-item">
      <h4>
        <Editable path={`${pathPrefix}.h`} value={item.h} multiline={false} />
        {item.theorem && <span className="theorem-badge">теорема</span>}
      </h4>
      {item.statement && (
        <div className="theory-statement">
          <Editable
            path={`${pathPrefix}.statement`}
            value={item.statement}
            render={(v) => <MathFormula mode="block">{v}</MathFormula>}
          />
        </div>
      )}
      <p>
        <Editable
          path={`${pathPrefix}.text`}
          value={item.text}
          render={(v) => (
            <MathFormula mode="inline" as="span">
              {v}
            </MathFormula>
          )}
        />
      </p>
      {item.table && (
        <Disclosure label={`Развернуть таблицу (${item.table.rows.length} формул)`}>
          <div className="theory-formula-grid">
            {item.table.rows.map((row, i) => (
              <div className="theory-formula-cell" key={i}>
                <Editable
                  path={`${pathPrefix}.table.${i}`}
                  value={row}
                  render={(v) => <MathFormula mode="block">{v}</MathFormula>}
                />
              </div>
            ))}
          </div>
        </Disclosure>
      )}
      {item.proof && (
        <Disclosure label="Доказательство">
          <p>
            <Editable
              path={`${pathPrefix}.proof`}
              value={item.proof}
              render={(v) => (
                <MathFormula mode="inline" as="span">
                  {v}
                </MathFormula>
              )}
            />
          </p>
        </Disclosure>
      )}
    </div>
  );
}
