import katex from 'katex';

export function renderBlock(str: string | undefined): string {
  if (!str) return '';
  try {
    return katex.renderToString(str, { throwOnError: false, displayMode: true });
  } catch {
    return str;
  }
}

export function renderInline(str: string | undefined): string {
  if (!str) return '';
  return str.replace(/\$([^$]+)\$/g, (_match, expr: string) => {
    try {
      return katex.renderToString(`\\displaystyle ${expr}`, { throwOnError: false });
    } catch {
      return expr;
    }
  });
}
