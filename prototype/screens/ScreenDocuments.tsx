'use client';

// Écran Documents (desktop) : pas de maquette dans le design system.
// Composé avec AppShell et les lignes de document de l'écran Tâche, regroupées par domaine.
import { useState } from 'react';
import { B } from '@/lib/buildos';
import { Shell } from '@/components/Shell';
import { DocumentRow, DocumentViewer } from '@/components/Documents';
import { DOC_FILTERS, docCounts, groupDocuments, type DocFilter } from '@/lib/documents';
import { useCurrentProject } from '@/lib/store';
import './ScreenDocuments.css';

export default function ScreenDocuments() {
  const { project, documents, tasks } = useCurrentProject();
  const [filter, setFilter] = useState<DocFilter>('all');
  const [viewingId, setViewingId] = useState<string | null>(null);
  const counts = docCounts(documents);
  const generated = counts.generated;
  const groups = groupDocuments(documents, filter);

  return (
    <div className="s-docs">
      <B.PrototypeBanner />
      <Shell active="docs" crumbs={<><span>{project.name}</span><B.Icon name="chevron-right" size={14} /><strong>Documents</strong></>}>
        <div className="head">
          <div>
            <span className="label">Trames générées à partir de votre plan</span>
            <h1 className="title-xl">Documents</h1>
            <p className="body">Chaque document est rattaché à une tâche du plan. Générez une trame, puis complétez-la avec les informations de votre projet.</p>
          </div>
          <div className="stats">
            <div className="stat"><b>{documents.length}</b><span className="label">Documents</span></div>
            <div className="stat stat--ok"><b>{generated}</b><span className="label">Générés</span></div>
            <div className="stat"><b>{documents.length - generated}</b><span className="label">À générer</span></div>
          </div>
        </div>
        <div className="bar">
          <div className="tabs ui" role="tablist" aria-label="Filtrer les documents">
            {DOC_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={filter === f.id ? 'tab on' : 'tab'}
                onClick={() => setFilter(f.id)}
              >
                {f.label} <span>{counts[f.id]}</span>
              </button>
            ))}
          </div>
        </div>
        {groups.length === 0 ? <p className="empty body">Aucun document dans cette catégorie.</p> : null}
        <div className="grid">
          {groups.map(({ domain, docs }) => (
            <section key={domain.id} className="group">
              <header className="group__h">
                <span className="numeral-s">{domain.index}</span>
                <B.Icon name={domain.icon} size={18} />
                <h2 className="title-m">{domain.name}</h2>
                <span className="body-s group__n">{docs.length}</span>
              </header>
              {docs.map((d) => (
                <DocumentRow key={d.id} doc={d} task={tasks.find((t) => t.id === d.taskId)} onOpen={(x) => setViewingId(x.id)} />
              ))}
            </section>
          ))}
        </div>
        <p className="disclaimer body-s">
          <B.Icon name="alert" size={16} />
          Les documents générés sont des trames. Faites relire les documents juridiques, financiers et d’assurance par un professionnel avant de les utiliser.
        </p>
      </Shell>
      <DocumentViewer doc={documents.find((d) => d.id === viewingId) ?? null} onClose={() => setViewingId(null)} />
    </div>
  );
}
