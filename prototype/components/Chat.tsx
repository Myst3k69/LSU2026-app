'use client';

import { useState, type KeyboardEvent } from 'react';
import { B } from '@/lib/buildos';
import { useCurrentProject } from '@/lib/store';
import type { ChatMessage, MessageBlock } from '@/lib/types';
import './ui.css';

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
        <div className="pm-gen">
          <B.Icon name="doc" size={20} />
          <div><strong>{block.title}</strong><span className="body-s">{block.detail}</span></div>
        </div>
      );
  }
}

/** Fil de messages ; typing affiche l'attente de la réponse du copilote. */
export function ChatMessages({ messages, typing, empty }: { messages: ChatMessage[]; typing?: boolean; empty?: string }) {
  const { project } = useCurrentProject();
  const firstName = project.founder.split(' ')[0];
  return (
    <div className="pm-thread" aria-live="polite">
      {messages.length === 0 && !typing ? <p className="pm-thread__empty body-s">{empty ?? 'Aucun échange pour l’instant.'}</p> : null}
      {messages.map((m, i) => {
        const body = m.body.map((b, j) => <Block key={j} block={b} />);
        return m.from === 'user'
          ? <B.ChatBubble key={i} from="user" initials={project.founderInitials} author={firstName} time={m.time}>{body}</B.ChatBubble>
          : <B.ChatBubble key={i} from="ai" time={m.time} actions={m.actions}>{body}</B.ChatBubble>;
      })}
      {typing ? <p className="pm-typing body-s" role="status"><B.Icon name="sparkle" size={16} />Le copilote rédige sa réponse…</p> : null}
    </div>
  );
}

/** Zone de saisie : Entrée envoie, Maj + Entrée passe à la ligne. */
export function ChatComposer({ onSend, busy, hint, placeholder }: {
  onSend: (text: string) => void;
  busy?: boolean;
  hint: string;
  placeholder: string;
}) {
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0 && !busy;

  function send() {
    if (!canSend) return;
    onSend(text);
    setText('');
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <B.Input
      multiline
      rows={2}
      placeholder={placeholder}
      aria-label="Message au copilote"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={onKeyDown}
      footer={
        <div className="pm-sendrow">
          <span className="grow body-s">{hint}</span>
          <B.Button variant="primary" size="sm" icon="send" onClick={send} disabled={!canSend}>Envoyer</B.Button>
        </div>
      }
    />
  );
}
