'use client';

// Écran Plan (desktop), porté depuis design-system/components/ScreenPlan/preview.html.
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { Shell } from '@/components/Shell';
import { domains, getStats, plan, project, tasks, tasksOf, type Domain } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { useScrollToDomainHash } from '@/lib/useHashTarget';
import './ScreenPlan.css';

function plural(n: number, word: string) {
  return n > 1 ? `${word}s` : word;
}

function DomainSection({ d }: { d: Domain }) {
  const router = useRouter();
  const st = getStats(d.id);
  const list = tasksOf(d.id);
  const open = plan.expandedDomains.includes(d.id) ? list : list.filter((t) => t.status !== 'done');
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
          selected={t.id === plan.highlightedTaskId}
          onClick={() => router.push(routes.task(t.id))}
        />
      ))}
      {hidden ? (
        <button className="more body-s" type="button">
          <B.Icon name="check-circle" size={16} />
          {`${hidden} ${plural(hidden, 'tâche')} ${plural(hidden, 'faite')} ${plural(hidden, 'masquée')}`}
          <B.Icon name="chevron-down" size={16} />
        </button>
      ) : null}
    </section>
  );
}

export default function ScreenPlan() {
  const router = useRouter();
  const S = getStats();
  const firstForgotten = tasks.find((t) => t.forgotten && t.status !== 'done');
  useScrollToDomainHash();
  return (
    <div className="s-plan">
      <B.PrototypeBanner />
      <Shell
        active="plan"
        crumbs={<><span>{project.name}</span><B.Icon name="chevron-right" size={14} /><strong>Mon plan</strong></>}
        actions={<>
          <B.Button variant="secondary" size="sm" iconLeft="doc">Exporter</B.Button>
          <B.Button variant="primary" size="sm" iconLeft="plus">Ajouter une tâche</B.Button>
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
          <B.ProgressBar value={S.done} max={S.total} label="Avancement global" />
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
        <div className="alert">
          <span className="alert__ic"><B.Icon name="alert" size={20} strokeWidth={2} /></span>
          <div>
            <strong className="title-s">{S.forgottenOpen} étapes souvent oubliées sont encore ouvertes</strong>
            <p className="body-s">CGU et CGV, assurance RC professionnelle, TVA sur les commissions… Ce sont elles qui retardent le plus souvent une ouverture des réservations.</p>
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
        <div className="grid">
          {domains.map((d) => <DomainSection key={d.id} d={d} />)}
        </div>
      </Shell>
    </div>
  );
}
