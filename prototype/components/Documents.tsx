'use client';

import Link from 'next/link';
import { B } from '@/lib/buildos';
import { getDomain } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { generateDocument, usePendingDocs } from '@/lib/store';
import type { DocumentItem, Task } from '@/lib/types';
import { Modal } from './Modal';
import './ui.css';

const NEEDS_REVIEW = new Set(['juridique', 'finance', 'operations']);

export function docStatusLine(doc: DocumentItem): string {
  return doc.status === 'generated'
    ? `Généré · v${doc.version ?? 1} · ${doc.detail} · ${doc.updatedLabel ?? ''}`.replace(/ · $/, '')
    : doc.detail;
}

/** Ligne de document : « Ouvrir » s'il est généré, sinon « Générer » (génération simulée). */
export function DocumentRow({ doc, task, onOpen }: { doc: DocumentItem; task?: Task; onOpen: (doc: DocumentItem) => void }) {
  const pending = usePendingDocs().has(doc.id);
  const generated = doc.status === 'generated';
  return (
    <div className="pm-doc">
      <span className={generated ? 'pm-doc__ic ok' : 'pm-doc__ic'}>
        <B.Icon name={generated ? 'doc' : 'doc-plus'} size={18} />
      </span>
      <div>
        <strong>{doc.title}</strong>
        <span className="body-s">{pending ? 'Génération de la trame…' : docStatusLine(doc)}</span>
        {task ? <div className="body-s"><Link href={routes.task(task.id)}>Tâche : {task.title}</Link></div> : null}
      </div>
      {generated ? (
        <B.Button variant="ink" size="sm" onClick={() => onOpen(doc)}>Ouvrir</B.Button>
      ) : (
        <B.Button variant="secondary" size="sm" disabled={pending} onClick={() => generateDocument(doc.id)}>
          {pending ? 'Génération…' : 'Générer'}
        </B.Button>
      )}
    </div>
  );
}

/** Aperçu d'une trame générée : plan des articles et rappel de relecture. */
export function DocumentViewer({ doc, onClose }: { doc: DocumentItem | null; onClose: () => void }) {
  const pending = usePendingDocs().has(doc?.id ?? '');
  if (!doc) return <Modal open={false} onClose={onClose} title="">{null}</Modal>;
  const domain = getDomain(doc.domainId);
  const generated = doc.status === 'generated';
  return (
    <Modal
      open
      wide
      onClose={onClose}
      label={`${domain.index} · ${domain.name}`}
      title={doc.title}
      footer={<>
        <B.Button variant="secondary" onClick={onClose}>Fermer</B.Button>
        <B.Button variant="primary" iconLeft="sparkle" disabled={pending} onClick={() => generateDocument(doc.id)}>
          {pending ? 'Génération…' : generated ? 'Régénérer la trame' : 'Générer la trame'}
        </B.Button>
      </>}
    >
      <p className="body-s" style={{ color: 'var(--ink-3)' }}>{generated ? docStatusLine(doc) : `Non générée · ${doc.detail}`}</p>
      {NEEDS_REVIEW.has(doc.domainId) ? (
        <p className="pm-notice pm-notice--forgot body-s">
          <B.Icon name="alert" size={16} strokeWidth={2} />
          Ce document est une trame. Faites-le relire par un professionnel avant de l’utiliser.
        </p>
      ) : null}
      {generated ? (
        <ol className="pm-outline">
          {doc.outline.map((title) => (
            <li key={title}>
              <div><strong className="title-s">{title}</strong><span className="body-s">À compléter avec les informations de votre projet.</span></div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="pm-notice body-s">
          <B.Icon name="doc-plus" size={16} />
          Cette trame n’est pas encore générée. Elle comportera {doc.outline.length} parties : {doc.outline.join(' · ')}.
        </p>
      )}
    </Modal>
  );
}
