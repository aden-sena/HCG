import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Rola a página para o topo (X=0, Y=0)
  }, [pathname]); // Executa toda vez que o caminho da URL mudar

  return null;
}

export default ScrollToTop