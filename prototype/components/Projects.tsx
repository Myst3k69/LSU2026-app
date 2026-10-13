'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { getStats } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { resetDemo, switchProject } from '@/lib/store';
import type { ProjectData } from '@/lib/types';
import { Modal } from './Modal';
import './Projects.css';

/** Carte d'un projet : avancement, étapes oubliées ouvertes, accès au plan et au tableau de bord. */
export function ProjectCard({ data, current }: { data: ProjectData; current: boolean }) {
  const router = useRouter();
  const { project, tasks, conversations, documents } = data;
  const s = getStats(tasks);

  function open(href: string) {
    switchProject(project.id);
    router.push(href);
  }

  return (
    <article className={current ? 'pm-pcard is-current' : 'pm-pcard'}>
      <header className="pm-pcard__h">
        <span className="pm-avatar">{project.initial}</span>
        <div>
          <h2 className="title-m">{project.name}</h2>
          <span className="body-s pm-pcard__meta">Créé le {data.createdOn}</span>
        </div>
        {current ? <span className="pm-pcard__badge label">Projet actif</span> : null}
      </header>
      <p className="body-s pm-pcard__pitch">{project.pitch}</p>
      <div className="pm-pcard__prog">
        <b>{s.pct} %</b>
        <B.ProgressBar value={s.done} max={s.total || 1} size="sm" label={`Avancement ${project.name}`} />
        <span className="body-s">{s.done}/{s.total}</span>
      </div>
      <ul className="pm-pcard__facts body-s">
        <li className={s.forgottenOpen ? 'is-forgot' : undefined}>
          <B.Icon name="alert" size={14} strokeWidth={2} />
          {s.forgottenOpen} {s.forgottenOpen > 1 ? 'étapes souvent oubliées ouvertes' : 'étape souvent oubliée ouverte'}
        </li>
        <li><B.Icon name="chat" size={14} />{conversations.length} {conversations.length > 1 ? 'conversations' : 'conversation'}</li>
        <li><B.Icon name="doc" size={14} />{documents.length} {documents.length > 1 ? 'documents' : 'document'}</li>
      </ul>
      <div className="pm-pcard__actions">
        <B.Button variant="secondary" size="sm" iconLeft="list" onClick={() => open(routes.plan)}>Ouvrir le plan</B.Button>
        <B.Button variant="ghost" size="sm" iconLeft="grid" onClick={() => open(routes.project)}>Tableau de bord</B.Button>
      </div>
    </article>
  );
}

/** Remet les données fictives d'origine, après confirmation. */
export function ResetDemo() {
  const [confirming, setConfirming] = useState(false);
  return (
    <div className="pm-reset">
      <div>
        <span className="label">Données de démonstration</span>
        <p className="body-s">Vos projets, tâches, messages et documents ajoutés sont conservés dans ce navigateur uniquement.</p>
      </div>
      <B.Button variant="secondary" size="sm" iconLeft="postpone" onClick={() => setConfirming(true)}>Réinitialiser la démo</B.Button>
      <Modal
        open={confirming}
        onClose={() => setConfirming(false)}
        label="Données de démonstration"
        title="Réinitialiser la démo ?"
        footer={<>
          <B.Button variant="secondary" onClick={() => setConfirming(false)}>Annuler</B.Button>
          <B.Button variant="ink" onClick={() => { resetDemo(); setConfirming(false); }}>Réinitialiser</B.Button>
        </>}
      >
        <p className="body">Les projets créés, les tâches ajoutées, les messages et les documents générés dans ce navigateur seront effacés. Les trois projets fictifs d’origine reviennent.</p>
      </Modal>
    </div>
  );
}
