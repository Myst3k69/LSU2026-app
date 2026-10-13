import { domains } from './mock-data';
import type { DocumentItem } from './types';

export type DocFilter = 'all' | 'generated' | 'available';

export const DOC_FILTERS: { id: DocFilter; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'generated', label: 'Générés' },
  { id: 'available', label: 'À générer' },
];

export function docCounts(docs: DocumentItem[]): Record<DocFilter, number> {
  const generated = docs.filter((d) => d.status === 'generated').length;
  return { all: docs.length, generated, available: docs.length - generated };
}

/** Documents filtrés puis regroupés par domaine (domaines vides omis). */
export function groupDocuments(docs: DocumentItem[], filter: DocFilter) {
  const list = filter === 'all' ? docs : docs.filter((d) => d.status === filter);
  return domains
    .map((d) => ({ domain: d, docs: list.filter((x) => x.domainId === d.id) }))
    .filter((g) => g.docs.length > 0);
}
