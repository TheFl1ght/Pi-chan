import katex from 'katex';

export function renderBlock(str: string | undefined): string {
  if (!str) return '';
  let formula = str.trim();
  if (formula.startsWith('$$') && formula.endsWith('$$') && formula.length >= 4) {
    formula = formula.slice(2, -2).trim();
  } else if (formula.startsWith('$') && formula.endsWith('$') && formula.length >= 2) {
    formula = formula.slice(1, -1).trim();
  }
  try {
    return katex.renderToString(formula, { throwOnError: false, displayMode: true });
  } catch {
    return str;
  }
}

export function renderInline(str: string | undefined): string {
  if (!str) return '';
  // First match $$...$$ block expressions if any are mixed in text
  let res = str.replace(/\$\$([\s\S]+?)\$\$/g, (_match, expr: string) => {
    try {
      return katex.renderToString(expr.trim(), { throwOnError: false, displayMode: true });
    } catch {
      return expr;
    }
  });
  // Then match $...$ inline expressions
  res = res.replace(/\$([^\$]+?)\$/g, (_match, expr: string) => {
    try {
      return katex.renderToString(`\\displaystyle ${expr.trim()}`, { throwOnError: false });
    } catch {
      return expr;
    }
  });
  // Parse markdown bold **text** to eliminate raw asterisks
  res = res.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
  return res;
}

