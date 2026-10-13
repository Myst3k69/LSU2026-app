'use client';

// Écran Plan (mobile), porté depuis design-system/components/ScreenPlanMobile/preview.html.
import { useEffect, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { AddTaskDialog } from '@/components/AddTaskDialog';
import { MobileHeader, TabBar } from '@/components/Mobile';
import { domains, getDomain, getStats, tasksOf } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { useCurrentProject } from '@/lib/store';
import type { DomainId, Task } from '@/lib/types';
import { readDomainHash } from '@/lib/useHashTarget';
import './ScreenPlanMobile.css';

function DomainSection({ id, tasks, all, onCollapse }: { id: DomainId; tasks: Task[]; all?: boolean; onCollapse: () => void }) {
  const router = useRouter();
  const [showDone, setShowDone] = useState(Boolean(all));
  const d = getDomain(id);
  const st = getStats(tasks, id);
  const list = tasksOf(tasks, id);
  const open = showDone ? list : list.filter((t) => t.status !== 'done');
  const hidden = list.length - open.length;
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCollapse();
    }
  }
  return (
    <section className="dom" id={id}>
      {/* DomainHeader n'accepte pas de clic : on l'enveloppe pour replier le domaine. */}
      <div className="dom__toggle" role="button" tabIndex={0} aria-expanded="true" aria-label={`Replier ${d.name}`} onClick={onCollapse} onKeyDown={onKeyDown}>
        <B.DomainHeader index={d.index} name={d.name} icon={d.icon} done={st.done} total={st.total} forgotten={st.forgottenOpen} compact />
      </div>
      {open.map((t) => (
        <B.TaskCard
          key={t.id}
          title={t.title}
          status={t.status}
          forgotten={t.forgotten}
          meta={t.meta}
          compact
          onClick={() => router.push(routes.task(t.id))}
        />
      ))}
      {hidden ? (
        <button type="button" className="more body-s" onClick={() => setShowDone(true)}>
          <B.Icon name="check-circle" size={16} />
          {hidden} {hidden > 1 ? 'tâches faites masquées' : 'tâche faite masquée'}
          <B.Icon name="chevron-down" size={16} />
        </button>
      ) : null}
    </section>
  );
}

export default function ScreenPlanMobile() {
  const { project, tasks, plan } = useCurrentProject();
  const S = getStats(tasks);
  // Domaines dépliés : ceux du plan, plus celui désigné par l'ancre (/plan#finance).
  const [openIds, setOpenIds] = useState<DomainId[]>(() => {
    const target = readDomainHash();
    return target && !plan.mobileOpenDomains.includes(target) ? [...plan.mobileOpenDomains, target] : plan.mobileOpenDomains;
  });
  const [scrollTarget, setScrollTarget] = useState<DomainId | null>(readDomainHash);
  const [adding, setAdding] = useState(false);

  // Changement de projet : on revient aux domaines ouverts de ce projet.
  const [projectId, setProjectId] = useState(project.id);
  if (projectId !== project.id) {
    setProjectId(project.id);
    setOpenIds(plan.mobileOpenDomains);
  }

  useEffect(() => {
    if (!scrollTarget) return;
    document.getElementById(scrollTarget)?.scrollIntoView({ block: 'start' });
    setScrollTarget(null);
  }, [scrollTarget]);

  function expand(id: DomainId) {
    setOpenIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
    setScrollTarget(id);
  }
  function collapse(id: DomainId) {
    setOpenIds((ids) => ids.filter((x) => x !== id));
  }

  // Dépliés en haut dans l'ordre des domaines, repliés en lignes en dessous.
  const opened = domains.filter((d) => openIds.includes(d.id));
  const collapsed = domains.filter((d) => !openIds.includes(d.id));
  const firstForgotten = tasks.find((t) => t.forgotten && t.status !== 'done');
  return (
    <div className="s-plan-m">
      <B.PrototypeBanner />
      <MobileHeader
        actions={<>
          <button className="pm-icbtn" aria-label="Rechercher"><B.Icon name="search" size={20} /></button>
          <button className="pm-icbtn" aria-label="Ajouter une tâche" onClick={() => setAdding(true)}><B.Icon name="plus" size={20} /></button>
        </>}
      />
      <div className="head">
        <span className="label">Généré le {plan.generatedOn}</span>
        <h1 className="title-xl">Plan de lancement</h1>
        <div className="prog">
          <b>{S.pct} %</b>
          <B.ProgressBar value={S.done} max={S.total || 1} label="Avancement global" />
          <span className="body-s">{S.done}/{S.total}</span>
        </div>
      </div>
      <div className="chips ui">
        <span className="chip on">Toutes <span>{S.total}</span></span>
        <span className="chip">À faire <span>{S.todo}</span></span>
        <span className="chip">Faites <span>{S.done}</span></span>
        <span className="chip">Reportées <span>{S.postponed}</span></span>
        <span className="chip f"><B.Icon name="alert" size={14} strokeWidth={2} />Oubliées <span>{S.forgotten}</span></span>
      </div>
      {S.forgottenOpen ? (
        <div className="alert">
          <B.Icon name="alert" size={20} strokeWidth={2} />
          <p className="body-s">
            <strong>{S.forgottenOpen} {S.forgottenOpen > 1 ? 'étapes souvent oubliées' : 'étape souvent oubliée'}</strong>
            {S.forgottenOpen > 1 ? ' restent ouvertes.' : ' reste ouverte.'}
          </p>
          {firstForgotten ? <Link className="go ui" href={routes.task(firstForgotten.id)}>Voir</Link> : null}
        </div>
      ) : null}
      {opened.map((d) => (
        <DomainSection key={`${project.id}-${d.id}`} id={d.id} tasks={tasks} all={plan.expandedDomains.includes(d.id)} onCollapse={() => collapse(d.id)} />
      ))}
      <div className="collapsed">
        {collapsed.map((d) => {
          const st = getStats(tasks, d.id);
          return (
            <button key={d.id} type="button" className="crow" aria-expanded="false" onClick={() => expand(d.id)}>
              <span className="n">{d.index}</span>
              <span className="title-s">{d.name}</span>
              {st.forgottenOpen ? <B.ForgottenBadge compact /> : <span />}
              <span className="c body-s">{st.done}/{st.total}</span>
              <B.Icon name="chevron-down" size={18} />
            </button>
          );
        })}
      </div>
      <TabBar active="plan" />
      <AddTaskDialog
        open={adding}
        onClose={() => setAdding(false)}
        onAdded={(_, domainId) => expand(domainId)}
      />
    </div>
  );
}
