'use client';

// Écran Conversations (desktop) : pas de maquette dans le design system.
// Composé avec AppShell, ChatBubble et Input, dans la mise en page de l'écran Tâche.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { Shell } from '@/components/Shell';
import { ChatComposer, ChatMessages } from '@/components/Chat';
import { getDomain } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { sendMessage, startConversation, usePendingReplies } from '@/lib/store';
import { excerpt, useScrollToBottom, useSelectedConversation } from '@/lib/useConversation';
import './ScreenConversations.css';

export default function ScreenConversations({ selectedId }: { selectedId?: string }) {
  const router = useRouter();
  const { data, selected, missing } = useSelectedConversation(selectedId);
  const pending = usePendingReplies();
  const typing = selected ? pending.has(selected.id) : false;
  const threadRef = useScrollToBottom<HTMLDivElement>([selected?.id, selected?.messages.length, typing]);
  const task = selected?.taskId ? data.tasks.find((t) => t.id === selected.taskId) : undefined;
  const domain = selected?.domainId ? getDomain(selected.domainId) : undefined;

  function create() {
    router.push(routes.conversation(startConversation()));
  }

  return (
    <div className="s-conv">
      <B.PrototypeBanner />
      <Shell
        active="chat"
        crumbs={<><span>{data.project.name}</span><B.Icon name="chevron-right" size={14} /><strong>Conversations</strong></>}
        actions={<B.Button variant="primary" size="sm" iconLeft="plus" onClick={create}>Nouvelle conversation</B.Button>}
      >
        <div className="head">
          <span className="label">Copilote IA · {data.conversations.length} {data.conversations.length > 1 ? 'conversations' : 'conversation'}</span>
          <h1 className="title-xl">Conversations</h1>
        </div>
        <div className="layout">
          <nav className="list" aria-label="Conversations">
            {data.conversations.length === 0 ? (
              <p className="empty body-s">Aucune conversation pour ce projet. Posez une question au copilote depuis une tâche ou avec « Nouvelle conversation ».</p>
            ) : null}
            {data.conversations.map((c) => {
              const d = c.domainId ? getDomain(c.domainId) : undefined;
              const active = c.id === selected?.id;
              return (
                <Link key={c.id} href={routes.conversation(c.id)} className={active ? 'item is-active' : 'item'} aria-current={active ? 'page' : undefined}>
                  <span className="item__top">
                    <span className="label">{d ? d.name : 'Question libre'}</span>
                    <span className="body-s item__date">{c.updatedLabel}</span>
                  </span>
                  <strong className="title-s">{c.title}</strong>
                  <span className="body-s item__ex">{excerpt(c)}</span>
                  {pending.has(c.id) ? <span className="pm-typing body-s"><B.Icon name="sparkle" size={14} />Réponse en cours…</span> : null}
                </Link>
              );
            })}
          </nav>
          <section className="thread" aria-label="Conversation">
            {selected ? (
              <>
                <div className="thread__head">
                  <span className="ic"><B.Icon name="sparkle" size={16} /></span>
                  <div>
                    <h2 className="title-m">{selected.title}</h2>
                    <p className="body-s">
                      {task
                        ? <>Rattachée à la tâche <Link href={routes.task(task.id)}>{task.title}</Link></>
                        : 'Question libre, sans tâche rattachée'}
                    </p>
                  </div>
                </div>
                <div className="thread__ctx body-s">
                  <B.Icon name="list" size={14} />
                  Contexte : description du projet{domain ? `, décisions ${domain.name}` : ''}
                </div>
                <div className="thread__body" ref={threadRef}>
                  <ChatMessages messages={selected.messages} typing={typing} empty="Posez votre question : le copilote répond en s’appuyant sur votre projet." />
                </div>
                <div className="thread__in">
                  <ChatComposer
                    key={selected.id}
                    onSend={(text) => void sendMessage(selected.id, text)}
                    busy={typing}
                    placeholder="Écrire au copilote…"
                    hint="Réponses simulées dans ce prototype."
                  />
                </div>
              </>
            ) : (
              <div className="thread__none">
                <p className="lead-serif">{missing ? 'Cette conversation n’existe plus.' : 'Aucune conversation sélectionnée.'}</p>
                <B.Button variant="secondary" iconLeft="plus" onClick={create}>Nouvelle conversation</B.Button>
              </div>
            )}
          </section>
        </div>
      </Shell>
    </div>
  );
}
