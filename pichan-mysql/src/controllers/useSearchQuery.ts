import { useMemo, useState } from 'react';
import { normalizeQuery } from './search';

export function useSearchQuery() {
  const [query, setQuery] = useState('');
  const normalized = useMemo(() => normalizeQuery(query), [query]);
  return { query, setQuery, normalized, isSearching: normalized.length > 0 };
}
