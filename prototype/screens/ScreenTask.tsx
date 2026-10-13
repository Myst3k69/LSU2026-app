'use client';

// Écran Détail d'une tâche (desktop), porté depuis design-system/components/ScreenTask/preview.html.
// Seule la tâche t10 a un contenu maquetté (taskDetails) ; les autres tâches
// reprennent le même gabarit avec leurs données de base.
import Link from 'next/link';
import { B } from '@/lib/buildos';
import { Shell } from '@/components/Shell';
import {
  founderFirstName, getDomain, getTask, project, taskDetails, tasksOf,
  type ChatMessage, type MessageBlock,
} from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import './ScreenTask.css';

const SAMPLE_TASK_ID = 't10';

function Block({ block }: { block: MessageBlock }) {
  switch (block.type) {
    case 'text':
      return <>{block.text}</>;
    case 'p':
      return <p>{block.text}</p>;
    case 'ol':
      return <ol>{block.items.map((item) => <li key={item}>{item}</li>)}</ol>;
    case 'doc':
      return (
        <div className="gen">
          <B.Icon name="doc" size={20} />
          <div><strong>{block.title}</strong><span className="body-s">{block.detail}</span></div>
        </div>
      );
  }
}

function Message({ m }: { m: ChatMessage }) {
  const body = m.body.map((b, i) => <Block key={i} block={b} />);
  return m.from === 'user'
    ? <B.ChatBubble from="user" initials={project.founderInitials} author={founderFirstName} time={m.time}>{body}</B.ChatBubble>
    : <B.ChatBubble from="ai" time={m.time} actions={m.actions}>{body}</B.ChatBubble>;
}

export default function ScreenTask({ taskId }: { taskId: string }) {
  const task = getTask(taskId);
  if (!task) return null; // la route vérifie déjà l'identifiant (404)
  const domain = getDomain(task.domainId);
  const siblings = tasksOf(task.domainId);
  const detail = taskDetails[task.id];
  return (
    <div className="s-task">
      <B.PrototypeBanner />
      <Shell
        active="plan"
        domain={domain.id}
        crumbs={<>
          <Link href={routes.plan}>Mon plan</Link>
          <B.Icon name="chevron-right" size={14} />
          <span>{domain.name}</span>
          <B.Icon name="chevron-right" size={14} />
          <strong>{detail?.crumb ?? task.title}</strong>
        </>}
        actions={<>
          <B.Button variant="secondary" size="sm" iconLeft="postpone">Reporter</B.Button>
          <B.Button variant="primary" size="sm" iconLeft="check">Marquer comme faite</B.Button>
        </>}
      >
        <div className="layout">
          <div>
            <div className="eyebrow">
              <span className="numeral-s">{domain.index}</span>
              <span className="label">{domain.name} · tâche {siblings.indexOf(task) + 1} sur {siblings.length}</span>
            </div>
            <h1 className="title title-xl">{task.title}</h1>
            <div className="metas">
              <B.TaskStatus status={task.status} />
              {task.forgotten ? <B.ForgottenBadge /> : null}
              {detail ? (
                <>
                  <span className="body-s"><B.Icon name="calendar" size={16} />{detail.due}</span>
                  <span className="body-s"><B.Icon name="flag" size={16} />{detail.blocks}</span>
                </>
              ) : (
                <span className="body-s">{task.meta}</span>
              )}
            </div>
            {detail ? (
              <>
                <section className="sec">
                  <div className="sec__h"><span className="label">Pourquoi c’est indispensable</span></div>
                  <p className="why lead-serif">{detail.why}</p>
                  <div className="reasons">
                    {detail.reasons.map((r) => (
                      <div key={r.title} className="reason">
                        <strong className="title-s">{r.title}</strong>
                        <p className="body-s">{r.text}</p>
                        <p className="ref body-s">{r.ref}</p>
                      </div>
                    ))}
                  </div>
                  {task.forgotten ? (
                    <div className="oublie">
                      <B.Icon name="alert" size={18} strokeWidth={2} />
                      <p className="body-s"><strong>Pourquoi elle est souvent oubliée. </strong>{detail.forgottenWhy}</p>
                    </div>
                  ) : null}
                </section>
                <section className="sec">
                  <div className="sec__h"><span className="label">Ressources</span></div>
                  <div className="res">
                    <div className="res__col">
                      <span className="label">Documents générables</span>
                      {detail.docs.map((d) => (
                        <div key={d.title} className="doc">
                          <span className={d.generated ? 'doc__ic ok' : 'doc__ic'}>
                            <B.Icon name={d.generated ? 'doc' : 'doc-plus'} size={18} />
                          </span>
                          <div><strong>{d.title}</strong><span className="body-s">{d.detail}</span></div>
                          <B.Button variant={d.generated ? 'ink' : 'secondary'} size="sm">{d.action}</B.Button>
                        </div>
                      ))}
                    </div>
                    <div className="res__col">
                      <span className="label">Organismes officiels</span>
                      <div className="links">
                        {detail.links.map((l) => (
                          <a key={l.title} className="link" href="#">
                            <div><strong>{l.title}</strong><span className="body-s">{l.source}</span></div>
                            <B.Icon name="external" size={16} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="disclaimer body-s">
                    <B.Icon name="alert" size={16} />
                    Les documents générés sont des trames. Faites-les relire par un professionnel du droit avant publication.
                  </p>
                </section>
              </>
            ) : (
              <section className="sec">
                <div className="sec__h"><span className="label">Contenu détaillé</span></div>
                <p className="why lead-serif">Le détail de cette tâche n’est pas maquetté dans le prototype de vision.</p>
                <p className="disclaimer body-s">
                  <B.Icon name="arrow-right" size={16} />
                  <span>Exemple complet : <Link href={routes.task(SAMPLE_TASK_ID)}>la tâche CGU et CGV</Link>.</span>
                </p>
              </section>
            )}
          </div>
          <aside className="chat">
            <div className="chat__head">
              <span className="ic"><B.Icon name="sparkle" size={16} /></span>
              <div>
                <strong className="title-s">Copilote IA</strong>
                <div className="body-s">Conversation rattachée à cette tâche</div>
              </div>
            </div>
            <div className="chat__ctx body-s">
              <B.Icon name="list" size={14} />
              Contexte : description du projet, décisions {domain.name}
            </div>
            <div className="chat__thread">
              {detail
                ? detail.messages.map((m, i) => <Message key={i} m={m} />)
                : <p className="chat__empty body-s">Aucun échange pour cette tâche.</p>}
            </div>
            <div className="chat__in">
              <B.Input
                multiline
                rows={2}
                placeholder="Poser une question sur cette tâche…"
                aria-label="Message au copilote"
                footer={
                  <div className="sendrow">
                    <span className="grow body-s">Les réponses restent liées à cette tâche.</span>
                    <B.Button variant="primary" size="sm" icon="send">Envoyer</B.Button>
                  </div>
                }
              />
            </div>
          </aside>
        </div>
      </Shell>
    </div>
  );
}
