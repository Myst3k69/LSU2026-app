import { useEffect } from 'react';
import { domains, type DomainId } from './mock-data';

/** Domaine désigné par l'ancre de l'URL (/plan#juridique), ou null. */
export function readDomainHash(): DomainId | null {
  const id = window.location.hash.slice(1);
  return domains.some((d) => d.id === id) ? (id as DomainId) : null;
}

/** Fait défiler jusqu'à la section du domaine désigné par l'ancre, à l'arrivée sur l'écran. */
export function useScrollToDomainHash() {
  useEffect(() => {
    const id = readDomainHash();
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'start' });
  }, []);
}
