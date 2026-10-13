'use client';

// Écran Plan (desktop), porté depuis design-system/components/ScreenPlan/preview.html.
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { Shell } from '@/components/Shell';
import { AddTaskDialog } from '@/components/AddTaskDialog';
import { domains, getStats, tasksOf } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { useCurrentProject } from '@/lib/store';
import type { Domain, DomainId, Task } from '@/lib/types';
import { useScrollToDomainHash } from '@/lib/useHashTarget';
import './ScreenPlan.css';

function plural(n: number, word: string) {
  return n > 1 ? `${word}s` : word;
}

function DomainSection({ d, tasks, expanded, selectedId, onAdd }: {
  d: Domain;
  tasks: Task[];
  expanded: boolean;
  selectedId?: string;
  onAdd: (domainId: DomainId) => void;
}) {
  const router = useRouter();
  const [showDone, setShowDone] = useState(expanded);
  const st = getStats(tasks, d.id);
  const list = tasksOf(tasks, d.id);
  const open = showDone ? list : list.filter((t) => t.status !== 'done');
  const hidden = list.length - open.length;
  return (
    <section className="dom" id={d.id}>
      <B.DomainHeader index={d.index} name={d.name} icon={d.icon} done={st.done} total={st.total} forgotten={st.forgottenOpen} />
      {open.map((t) => (
        <B.TaskCard
          key={t.id}
          title={t.title}
          status={t.status}
          forgotten={t.forgotten}
          meta={t.meta}
          compact
          selected={t.id === selectedId}
          onClick={() => router.push(routes.task(t.id))}
        />
      ))}
      {hidden ? (
        <button className="more body-s" type="button" aria-expanded="false" onClick={() => setShowDone(true)}>
          <B.Icon name="check-circle" size={16} />
          {`${hidden} ${plural(hidden, 'tâche')} ${plural(hidden, 'faite')} ${plural(hidden, 'masquée')}`}
          <B.Icon name="chevron-down" size={16} />
        </button>
      ) : null}
      <button className="add pm-plain body-s" type="button" onClick={() => onAdd(d.id)}>
        <B.Icon name="plus" size={16} />Ajouter une tâche dans {d.name}
      </button>
    </section>
  );
}

export default function ScreenPlan() {
  const router = useRouter();
  const { project, tasks, plan } = useCurrentProject();
  const [adding, setAdding] = useState<{ domainId?: DomainId } | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const S = getStats(tasks);
  const firstForgotten = tasks.find((t) => t.forgotten && t.status !== 'done');
  useScrollToDomainHash();

  function onAdded(taskId: string, domainId: DomainId) {
    setAddedId(taskId);
    window.requestAnimationFrame(() => document.getElementById(domainId)?.scrollIntoView({ block: 'start', behavior: 'smooth' }));
  }

  return (
    <div className="s-plan">
      <B.PrototypeBanner />
      <Shell
        active="plan"
        crumbs={<><span>{project.name}</span><B.Icon name="chevron-right" size={14} /><strong>Mon plan</strong></>}
        actions={<>
          <B.Button variant="secondary" size="sm" iconLeft="doc">Exporter</B.Button>
          <B.Button variant="primary" size="sm" iconLeft="plus" onClick={() => setAdding({})}>Ajouter une tâche</B.Button>
        </>}
      >
        <div className="head">
          <div>
            <span className="label">Plan de lancement · généré le {plan.generatedOn}, {plan.updatedLabel}</span>
            <h1 className="title-xl">Plan de lancement</h1>
            <p className="body">{project.pitch}</p>
          </div>
          <div className="stats">
            <div className="stat"><b>{S.total}</b><span className="label">Tâches</span></div>
            <div className="stat stat--done"><b>{S.done}</b><span className="label">Faites</span></div>
            <div className="stat"><b>{S.postponed}</b><span className="label">Reportées</span></div>
            <div className="stat stat--forgot"><b>{S.forgottenOpen}</b><span className="label">Oubliées ouvertes</span></div>
          </div>
        </div>
        <div className="global">
          <span className="ui">{S.pct} % du plan accompli</span>
          <B.ProgressBar value={S.done} max={S.total || 1} label="Avancement global" />
        </div>
        <div className="bar">
          <div className="tabs ui" role="tablist">
            <span className="tab on" role="tab" aria-selected="true">Toutes <span>{S.total}</span></span>
            <span className="tab" role="tab">À faire <span>{S.todo}</span></span>
            <span className="tab" role="tab">Faites <span>{S.done}</span></span>
            <span className="tab" role="tab">Reportées <span>{S.postponed}</span></span>
            <span className="tab tab--forgot" role="tab">
              <B.Icon name="alert" size={14} strokeWidth={2} />Souvent oubliées <span>{S.forgotten}</span>
            </span>
          </div>
          <div className="bar__right body-s">Regroupées par domaine<B.Icon name="chevron-down" size={16} /></div>
        </div>
        {S.forgottenOpen ? (
          <div className="alert">
            <span className="alert__ic"><B.Icon name="alert" size={20} strokeWidth={2} /></span>
            <div>
              <strong className="title-s">
                {S.forgottenOpen} {S.forgottenOpen > 1 ? 'étapes souvent oubliées sont encore ouvertes' : 'étape souvent oubliée est encore ouverte'}
              </strong>
              <p className="body-s">
                {plan.forgottenSummary
                  ?? `${tasks.filter((t) => t.forgotten && t.status !== 'done').slice(0, 3).map((t) => t.title).join(', ')}… Ce sont elles qui retardent le plus souvent un lancement.`}
              </p>
            </div>
            <B.Button
              variant="ink"
              size="sm"
              icon="arrow-right"
              onClick={firstForgotten ? () => router.push(routes.task(firstForgotten.id)) : undefined}
            >
              Les traiter en premier
            </B.Button>
          </div>
        ) : null}
        <div className="grid">
          {domains.map((d) => (
            <DomainSection
              key={`${project.id}-${d.id}`}
              d={d}
              tasks={tasks}
              expanded={plan.expandedDomains.includes(d.id)}
              selectedId={addedId ?? plan.highlightedTaskId}
              onAdd={(domainId) => setAdding({ domainId })}
            />
          ))}
        </div>
      </Shell>
      <AddTaskDialog open={adding !== null} defaultDomain={adding?.domainId} onClose={() => setAdding(null)} onAdded={onAdded} />
    </div>
  );
}
