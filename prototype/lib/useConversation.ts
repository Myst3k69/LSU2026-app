import { useEffect, useRef } from 'react';
import { switchProject, useAppState } from './store';
import type { Conversation, ProjectData } from './types';

/**
 * Conversation affichée : celle de l'URL (le projet qui la contient devient
 * actif), sinon la plus récente du projet courant.
 */
export function useSelectedConversation(selectedId?: string): { data: ProjectData; selected: Conversation | undefined; missing: boolean } {
  const state = useAppState();
  const owner = selectedId
    ? state.projectOrder.find((id) => state.projects[id].conversations.some((c) => c.id === selectedId))
    : undefined;

  useEffect(() => {
    if (owner && owner !== state.currentProjectId) switchProject(owner);
  }, [owner, state.currentProjectId]);

  const data = state.projects[owner ?? state.currentProjectId];
  const selected = selectedId ? data.conversations.find((c) => c.id === selectedId) : data.conversations[0];
  return { data, selected, missing: Boolean(selectedId) && !owner };
}

/** Garde le bas d'un fil visible quand un message arrive. */
export function useScrollToBottom<T extends HTMLElement>(deps: unknown[]) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, deps);
  return ref;
}

/** Premier texte d'un message, pour l'aperçu dans la liste. */
export function excerpt(c: Conversation): string {
  const last = c.messages[c.messages.length - 1];
  if (!last) return 'Pas encore de message.';
  const block = last.body.find((b) => b.type === 'text' || b.type === 'p');
  const text = block && 'text' in block ? block.text : 'Document généré';
  return `${last.from === 'ai' ? 'Copilote : ' : 'Vous : '}${text}`;
}
