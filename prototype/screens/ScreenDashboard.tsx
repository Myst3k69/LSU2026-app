'use client';

// Écran Tableau de bord (desktop), porté depuis design-system/components/ScreenDashboard/preview.html.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { Shell } from '@/components/Shell';
import { domains, getDomain, getStats } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { nextSteps, sendMessage, startConversation, useCurrentProject } from '@/lib/store';
import './ScreenDashboard.css';

export default function ScreenDashboard() {
  const router = useRouter();
  const data = useCurrentProject();
  const { project, tasks, decisions, dashboard } = data;
  const S = getStats(tasks);
  const forgot = tasks.filter((t) => t.forgotten && t.status !== 'done');
  const next = nextSteps(data);
  const deadlineTask = dashboard.nextDeadline && tasks.find((t) => t.id === dashboard.nextDeadline?.taskId);
  const firstName = project.founder.split(' ')[0];

  /** Une suggestion du copilote ouvre une conversation qui la pose comme question. */
  function ask(suggestion: string) {
    const id = startConversation();
    void sendMessage(id, suggestion);
    router.push(routes.conversation(id));
  }

  return (
    <div className="s-dash">
      <B.PrototypeBanner />
      <Shell
        active="dashboard"
        crumbs={<><span>{project.name}</span><B.Icon name="chevron-right" size={14} /><strong>Tableau de bord</strong></>}
        actions={<B.Button variant="primary" size="sm" icon="arrow-right" onClick={() => router.push(routes.plan)}>Ouvrir le plan</B.Button>}
      >
        <div className="hello">
          <div>
            <span className="label">{dashboard.dateLabel}</span>
            <h1 className="title-xl">Bonjour {firstName}. Le plan <em>avance.</em></h1>
          </div>
          <p className="body-s">
            {dashboard.weekSummary.map((line, i) => <span key={line}>{i > 0 ? <br /> : null}{line}</span>)}
          </p>
        </div>
        <div className="row1">
          <div className="card global">
            <div className="card__h"><span className="label">Avancement global</span></div>
            <div className="big">
              <span className="display-l">{S.pct} %</span>
              <span className="body-s">{S.done} {S.done > 1 ? 'tâches faites' : 'tâche faite'}<br />sur {S.total}</span>
            </div>
            <B.ProgressBar value={S.done} max={S.total || 1} label="Avancement global" />
            <div className="split">
              <div><b>{S.todo}</b><span className="label">À faire</span></div>
              <div><b>{S.postponed}</b><span className="label">Reportées</span></div>
              <div><b>{decisions.length}</b><span className="label">Décisions</span></div>
            </div>
            {dashboard.nextDeadline && deadlineTask ? (
              <div className="due body-s">
                <B.Icon name="calendar" size={16} />
                <span>Prochaine échéance <strong>{dashboard.nextDeadline.date}</strong> · <Link className="due__link" href={routes.task(deadlineTask.id)}>{deadlineTask.title}</Link></span>
              </div>
            ) : null}
          </div>
          <div className="copilot">
            <div className="copilot__h"><B.Icon name="sparkle" size={18} /><span className="label">Copilote IA · cette semaine</span></div>
            <p className="lead-serif">{dashboard.copilot.headline}</p>
            <div>
              {dashboard.copilot.suggestions.map((s) => (
                <button key={s} type="button" className="sugg body-s" onClick={() => ask(s)}>
                  <span>{s}</span><B.Icon name="arrow-right" size={16} />
                </button>
              ))}
            </div>
          </div>
          <div className="forgot">
            <div className="card__h" style={{ marginBottom: 0 }}><B.ForgottenBadge>Souvent oubliées</B.ForgottenBadge></div>
            <div className="big">
              <b>{S.forgottenOpen}</b>
              <span className="body-s">encore {S.forgottenOpen > 1 ? 'ouvertes' : 'ouverte'}<br />sur {S.forgotten} {S.forgotten > 1 ? 'repérées' : 'repérée'}</span>
            </div>
            <ul className="body-s">
              {forgot.slice(0, 4).map((t) => (
                <li key={t.id}>
                  <B.Icon name="circle" size={14} strokeWidth={2} />
                  <Link href={routes.task(t.id)}>{t.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row2">
          <div className="card">
            <div className="card__h">
              <span className="label">Avancement par domaine</span>
              <Link href={routes.plan} className="body-s">Voir le plan<B.Icon name="arrow-right" size={14} /></Link>
            </div>
            {domains.map((d) => {
              const s = getStats(tasks, d.id);
              return (
                <Link key={d.id} className="drow" href={routes.domain(d.id)}>
                  <span className="n">{d.index}</span>
                  <span className="name ui"><B.Icon name={d.icon} size={16} />{d.name}</span>
                  <B.ProgressBar value={s.done} max={s.total || 1} size="sm" label={`Avancement ${d.name}`} />
                  <span className="cnt body-s">{s.done}/{s.total}</span>
                  {s.forgottenOpen ? (
                    <span className="f body-s" title={`${s.forgottenOpen} souvent oubliée(s) ouverte(s)`}>
                      <B.Icon name="alert" size={14} strokeWidth={2} />{s.forgottenOpen}
                    </span>
                  ) : <span />}
                </Link>
              );
            })}
          </div>
          <div className="card">
            <div className="card__h">
              <span className="label">Décisions récentes</span>
              <a href="#" className="body-s">Journal complet<B.Icon name="arrow-right" size={14} /></a>
            </div>
            {decisions.length === 0 ? <p className="body-s" style={{ color: 'var(--ink-3)' }}>Aucune décision enregistrée pour l’instant.</p> : null}
            {decisions.map((x) => (
              <div key={x.date + x.domain} className="dec">
                <span className="dec__date">{x.date}</span>
                <div><span className="label">{x.domain}</span><p className="body">{x.text}</p></div>
              </div>
            ))}
          </div>
        </div>
        <section className="next">
          <div className="next__h">
            <h2 className="title-m">Prochaines étapes</h2>
            <span className="label">Classées par urgence et impact</span>
          </div>
          <div className="next__grid">
            {next.map((t) => (
              <B.TaskCard
                key={t.id}
                domain={getDomain(t.domainId).name}
                title={t.title}
                status={t.status}
                forgotten={t.forgotten}
                meta={t.meta}
                onClick={() => router.push(routes.task(t.id))}
              />
            ))}
          </div>
        </section>
      </Shell>
    </div>
  );
}
