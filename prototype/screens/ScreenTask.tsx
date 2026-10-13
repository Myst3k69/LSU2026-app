'use client';

// Écran Détail d'une tâche (desktop), porté depuis design-system/components/ScreenTask/preview.html.
// Seule la tâche t10 a un contenu maquetté (taskDetails) ; les autres tâches
// reprennent le même gabarit avec leurs données, documents et conversation.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { B } from '@/lib/buildos';
import { Shell } from '@/components/Shell';
import { ChatComposer, ChatMessages } from '@/components/Chat';
import { DocumentRow, DocumentViewer } from '@/components/Documents';
import { getDomain, taskDetails, tasksOf } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import {
  findTask, sendMessage, setTaskStatus, startConversation, switchProject, useAppState, usePendingReplies,
} from '@/lib/store';
import type { DocumentItem } from '@/lib/types';
import './ScreenTask.css';

const SAMPLE_TASK_ID = 't10';

export default function ScreenTask({ taskId }: { taskId: string }) {
  const state = useAppState();
  const found = findTask(state, taskId);
  const pendingReplies = usePendingReplies();
  const [viewing, setViewing] = useState<DocumentItem | null>(null);

  // Une tâche d'un autre projet rend ce projet actif.
  useEffect(() => {
    if (found && found.projectId !== state.currentProjectId) switchProject(found.projectId);
  }, [found, state.currentProjectId]);

  if (!found) {
    return (
      <div className="s-task">
        <B.PrototypeBanner />
        <Shell active="plan" crumbs={<><Link href={routes.plan}>Mon plan</Link><B.Icon name="chevron-right" size={14} /><strong>Tâche introuvable</strong></>}>
          <span className="label" style={{ color: 'var(--ink-3)' }}>Tâche introuvable</span>
          <h1 className="title title-xl" style={{ marginTop: 'var(--space-3)' }}>Cette tâche n’existe pas dans vos projets.</h1>
          <p className="body" style={{ marginTop: 'var(--space-4)', color: 'var(--ink-2)' }}>
            Elle a pu être créée dans un autre navigateur, ou les données de démonstration ont été réinitialisées.
          </p>
          <div style={{ marginTop: 'var(--space-5)' }}>
            <Link className="pm-link ui" href={routes.plan}>Revenir au plan</Link>
          </div>
        </Shell>
      </div>
    );
  }

  const { task } = found;
  const data = state.projects[found.projectId];
  const domain = getDomain(task.domainId);
  const siblings = tasksOf(data.tasks, task.domainId);
  const detail = taskDetails[task.id];
  const docs = data.documents.filter((d) => d.taskId === task.id);
  const conversation = data.conversations.find((c) => c.taskId === task.id);
  const typing = conversation ? pendingReplies.has(conversation.id) : false;

  function send(text: string) {
    const id = conversation?.id ?? startConversation(task.id);
    void sendMessage(id, text);
  }

  const docsList = docs.length ? (
    <div className="res__col">
      <span className="label">Documents générables</span>
      {docs.map((d) => <DocumentRow key={d.id} doc={d} onOpen={setViewing} />)}
    </div>
  ) : null;

  return (
    <div className="s-task">
      <B.PrototypeBanner />
      <Shell
        active="plan"
        domain={domain.id}
        crumbs={<>
          <Link href={routes.plan}>Mon plan</Link>
          <B.Icon name="chevron-right" size={14} />
          <Link href={routes.domain(domain.id)}>{domain.name}</Link>
          <B.Icon name="chevron-right" size={14} />
          <strong>{detail?.crumb ?? task.title}</strong>
        </>}
        actions={<>
          {task.status === 'postponed'
            ? <B.Button variant="secondary" size="sm" iconLeft="circle" onClick={() => setTaskStatus(task.id, 'todo')}>Reprendre</B.Button>
            : <B.Button variant="secondary" size="sm" iconLeft="postpone" disabled={task.status === 'done'} onClick={() => setTaskStatus(task.id, 'postponed')}>Reporter</B.Button>}
          {task.status === 'done'
            ? <B.Button variant="secondary" size="sm" iconLeft="circle" onClick={() => setTaskStatus(task.id, 'todo')}>Rouvrir la tâche</B.Button>
            : <B.Button variant="primary" size="sm" iconLeft="check" onClick={() => setTaskStatus(task.id, 'done')}>Marquer comme faite</B.Button>}
        </>}
      >
        <div className="layout">
          <div>
            <div className="eyebrow">
              <span className="numeral-s">{domain.index}</span>
              <span className="label">{domain.name} · tâche {siblings.findIndex((t) => t.id === task.id) + 1} sur {siblings.length}</span>
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
                    {docsList}
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
              <>
                {docsList ? (
                  <section className="sec">
                    <div className="sec__h"><span className="label">Ressources</span></div>
                    <div className="res">{docsList}</div>
                  </section>
                ) : null}
                <section className="sec">
                  <div className="sec__h"><span className="label">Contenu détaillé</span></div>
                  <p className="why lead-serif">Le détail de cette tâche n’est pas maquetté dans le prototype de vision.</p>
                  <p className="disclaimer body-s">
                    <B.Icon name="arrow-right" size={16} />
                    <span>Exemple complet : <Link href={routes.task(SAMPLE_TASK_ID)}>la tâche CGU et CGV</Link>.</span>
                  </p>
                </section>
              </>
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
              <ChatMessages messages={conversation?.messages ?? []} typing={typing} empty="Aucun échange pour cette tâche. Posez votre première question." />
            </div>
            <div className="chat__in">
              <ChatComposer
                onSend={send}
                busy={typing}
                placeholder="Poser une question sur cette tâche…"
                hint="Les réponses restent liées à cette tâche."
              />
              {conversation ? (
                <Link className="pm-link body-s chat__all" href={routes.conversation(conversation.id)}>Ouvrir dans Conversations</Link>
              ) : null}
            </div>
          </aside>
        </div>
      </Shell>
      <DocumentViewer doc={viewing && (data.documents.find((d) => d.id === viewing.id) ?? null)} onClose={() => setViewing(null)} />
    </div>
  );
}
