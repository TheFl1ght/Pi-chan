import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTopOnNavigate() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
}
