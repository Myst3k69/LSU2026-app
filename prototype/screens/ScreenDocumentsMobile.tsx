'use client';

// Écran Documents (mobile) : pas de maquette ; en-tête, filtres défilants et barre d'onglets du Plan mobile.
import { useState } from 'react';
import { B } from '@/lib/buildos';
import { DocumentRow, DocumentViewer } from '@/components/Documents';
import { MobileHeader, TabBar } from '@/components/Mobile';
import { useCurrentProject } from '@/lib/store';
import { DOC_FILTERS, docCounts, groupDocuments, type DocFilter } from '@/lib/documents';
import '@/components/ui.css';
import './ScreenDocumentsMobile.css';

export default function ScreenDocumentsMobile() {
  const { documents, tasks } = useCurrentProject();
  const [filter, setFilter] = useState<DocFilter>('all');
  const [viewingId, setViewingId] = useState<string | null>(null);
  const counts = docCounts(documents);
  const generated = counts.generated;
  const groups = groupDocuments(documents, filter);

  return (
    <div className="s-docs-m pm-mpage">
      <B.PrototypeBanner />
      <MobileHeader />
      <div className="head">
        <span className="label">{generated} sur {documents.length} générés</span>
        <h1 className="title-xl">Documents</h1>
      </div>
      <div className="chips ui" role="tablist" aria-label="Filtrer les documents">
        {DOC_FILTERS.map((f) => (
          <button key={f.id} type="button" role="tab" aria-selected={filter === f.id} className={filter === f.id ? 'chip on' : 'chip'} onClick={() => setFilter(f.id)}>
            {f.label} <span>{counts[f.id]}</span>
          </button>
        ))}
      </div>
      {groups.length === 0 ? <p className="empty body-s">Aucun document dans cette catégorie.</p> : null}
      {groups.map(({ domain, docs }) => (
        <section key={domain.id} className="group">
          <header className="group__h">
            <span className="numeral-s">{domain.index}</span>
            <h2 className="title-s">{domain.name}</h2>
          </header>
          {docs.map((d) => (
            <DocumentRow key={d.id} doc={d} task={tasks.find((t) => t.id === d.taskId)} onOpen={(x) => setViewingId(x.id)} />
          ))}
        </section>
      ))}
      <p className="disclaimer body-s">
        <B.Icon name="alert" size={16} />
        Faites relire les trames juridiques, financières et d’assurance par un professionnel.
      </p>
      <TabBar />
      <DocumentViewer doc={documents.find((d) => d.id === viewingId) ?? null} onClose={() => setViewingId(null)} />
    </div>
  );
}
