'use client';

// Écran Conversations (mobile) : liste, puis fil plein écran. Pas de maquette :
// en-tête et barre d'onglets du Plan mobile, ChatBubble et Input du design system.
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { B } from '@/lib/buildos';
import { ChatComposer, ChatMessages } from '@/components/Chat';
import { MobileHeader, TabBar } from '@/components/Mobile';
import { getDomain } from '@/lib/mock-data';
import { routes } from '@/lib/routes';
import { sendMessage, startConversation, usePendingReplies } from '@/lib/store';
import { excerpt, useSelectedConversation } from '@/lib/useConversation';
import '@/components/ui.css';
import './ScreenConversationsMobile.css';

export default function ScreenConversationsMobile({ selectedId }: { selectedId?: string }) {
  const router = useRouter();
  const { data, selected, missing } = useSelectedConversation(selectedId);
  const pending = usePendingReplies();

  function create() {
    router.push(routes.conversation(startConversation()));
  }

  // Sans identifiant : la liste.
  if (!selectedId) {
    return (
      <div className="s-conv-m pm-mpage">
        <B.PrototypeBanner />
        <MobileHeader actions={<button className="pm-icbtn" aria-label="Nouvelle conversation" onClick={create}><B.Icon name="plus" size={20} /></button>} />
        <div className="head">
          <span className="label">Copilote IA</span>
          <h1 className="title-xl">Conversations</h1>
        </div>
        <nav className="list" aria-label="Conversations">
          {data.conversations.length === 0 ? <p className="empty body-s">Aucune conversation pour ce projet.</p> : null}
          {data.conversations.map((c) => (
            <Link key={c.id} href={routes.conversation(c.id)} className="item">
              <span className="item__top">
                <span className="label">{c.domainId ? getDomain(c.domainId).name : 'Question libre'}</span>
                <span className="body-s item__date">{c.updatedLabel}</span>
              </span>
              <strong className="title-s">{c.title}</strong>
              <span className="body-s item__ex">{pending.has(c.id) ? 'Réponse du copilote en cours…' : excerpt(c)}</span>
            </Link>
          ))}
        </nav>
        <div className="new">
          <B.Button variant="primary" size="lg" block iconLeft="plus" onClick={create}>Nouvelle conversation</B.Button>
        </div>
        <TabBar active="chat" />
      </div>
    );
  }

  return <Thread selectedId={selectedId} data={data} selected={selected} missing={missing} />;
}

function Thread({ data, selected, missing }: ReturnType<typeof useSelectedConversation> & { selectedId: string }) {
  const pending = usePendingReplies();
  const typing = selected ? pending.has(selected.id) : false;
  const endRef = useRef<HTMLDivElement>(null);
  const task = selected?.taskId ? data.tasks.find((t) => t.id === selected.taskId) : undefined;

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [selected?.messages.length, typing]);

  return (
    <div className="s-conv-m s-conv-m--thread">
      <B.PrototypeBanner />
      <header className="pm-mbar">
        <Link className="pm-icbtn" href={routes.conversations} aria-label="Toutes les conversations"><B.Icon name="arrow-left" size={20} /></Link>
        <div className="pm-mbar__p">
          <span className="label">Copilote IA</span>
          <strong className="ui">{selected?.title ?? 'Conversation'}</strong>
        </div>
      </header>
      {selected ? (
        <>
          {task ? <p className="ctx body-s"><B.Icon name="list" size={14} /><span>Tâche : <Link href={routes.task(task.id)}>{task.title}</Link></span></p> : null}
          <div className="body">
            <ChatMessages messages={selected.messages} typing={typing} empty="Posez votre question : le copilote répond en s’appuyant sur votre projet." />
            <div ref={endRef} />
          </div>
          <div className="composer">
            <ChatComposer
              key={selected.id}
              onSend={(text) => void sendMessage(selected.id, text)}
              busy={typing}
              placeholder="Écrire au copilote…"
              hint="Réponses simulées."
            />
          </div>
        </>
      ) : (
        <div className="none">
          <p className="lead-serif">{missing ? 'Cette conversation n’existe plus.' : 'Conversation introuvable.'}</p>
          <Link className="pm-link ui" href={routes.conversations}>Voir toutes les conversations</Link>
        </div>
      )}
    </div>
  );
}
