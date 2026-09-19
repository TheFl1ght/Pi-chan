import { useMemo } from 'react';
import { renderBlock, renderInline } from './MathFormula';
import './MathFormula.css';

interface MathFormulaProps {
  children: string | undefined;
  mode?: 'block' | 'inline';
  as?: 'span' | 'div';
}

export default function MathFormula({ children, mode = 'block', as = 'span' }: MathFormulaProps) {
  const html = useMemo(
    () => (mode === 'block' ? renderBlock(children) : renderInline(children)),
    [children, mode],
  );
  const Tag = as;
  return <Tag className="math-formula" dangerouslySetInnerHTML={{ __html: html }} />;
}
