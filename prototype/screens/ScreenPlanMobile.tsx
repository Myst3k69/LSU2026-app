'use client';

// Écran Plan (mobile), porté depuis design-system/components/ScreenPlanMobile/preview.html.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { domains, getDomain, getStats, plan, project, tasks, tasksOf, type DomainId } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import './ScreenPlanMobile.css';

function DomainSection({ id, all }: { id: DomainId; all?: boolean }) {
  const router = useRouter();
  const d = getDomain(id);
  const st = getStats(id);
  const list = tasksOf(id);
  const open = all ? list : list.filter((t) => t.status !== 'done');
  const hidden = list.length - open.length;
  return (
    <section className="dom">
      <B.DomainHeader index={d.index} name={d.name} icon={d.icon} done={st.done} total={st.total} forgotten={st.forgottenOpen} compact />
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
        <div className="more body-s">
          <B.Icon name="check-circle" size={16} />
          {hidden} tâches faites masquées
          <B.Icon name="chevron-down" size={16} />
        </div>
      ) : null}
    </section>
  );
}

export default function ScreenPlanMobile() {
  const S = getStats();
  const collapsed = domains.filter((d) => !plan.mobileOpenDomains.includes(d.id));
  const firstForgotten = tasks.find((t) => t.forgotten && t.status !== 'done');
  return (
    <div className="s-plan-m">
      <B.PrototypeBanner />
      <header className="bar">
        <B.Logo variant="icon" height={32} />
        <div className="bar__p">
          <span className="label">Projet</span>
          <strong className="ui">{project.name}</strong>
        </div>
        <button className="icbtn" aria-label="Rechercher"><B.Icon name="search" size={20} /></button>
        <button className="icbtn" aria-label="Ajouter une tâche"><B.Icon name="plus" size={20} /></button>
      </header>
      <div className="head">
        <span className="label">Généré le {plan.generatedOn}</span>
        <h1 className="title-xl">Plan de lancement</h1>
        <div className="prog">
          <b>{S.pct} %</b>
          <B.ProgressBar value={S.done} max={S.total} label="Avancement global" />
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
      <div className="alert">
        <B.Icon name="alert" size={20} strokeWidth={2} />
        <p className="body-s"><strong>{S.forgottenOpen} étapes souvent oubliées</strong> restent ouvertes.</p>
        {firstForgotten ? <Link className="go ui" href={routes.task(firstForgotten.id)}>Voir</Link> : null}
      </div>
      {plan.mobileOpenDomains.map((id) => (
        <DomainSection key={id} id={id} all={plan.expandedDomains.includes(id)} />
      ))}
      <div className="collapsed">
        {collapsed.map((d) => {
          const st = getStats(d.id);
          return (
            <div key={d.id} className="crow">
              <span className="n">{d.index}</span>
              <span className="title-s">{d.name}</span>
              {st.forgottenOpen ? <B.ForgottenBadge compact /> : <span />}
              <span className="c body-s">{st.done}/{st.total}</span>
              <B.Icon name="chevron-down" size={18} />
            </div>
          );
        })}
      </div>
      <nav className="tabbar" aria-label="Navigation">
        <Link className="tab" href={routes.home}><B.Icon name="home" size={22} />Accueil</Link>
        <Link className="tab on" href={routes.plan} aria-current="page"><B.Icon name="list" size={22} />Plan</Link>
        <Link className="tab" href={routes.project}><B.Icon name="grid" size={22} />Tableau</Link>
        <span className="tab"><B.Icon name="sparkle" size={22} />Copilote</span>
      </nav>
    </div>
  );
}
