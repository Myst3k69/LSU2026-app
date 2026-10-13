// État du prototype, côté navigateur uniquement : copie des données fictives
// (lib/mock-data.ts) enrichie par les actions de l'utilisateur et conservée
// dans localStorage. Aucun appel réseau.
import { useSyncExternalStore } from 'react';
import { copilotReply, documentTemplate, planTemplate, seedProjects } from './mock-data';
import { longDate, normalize, shortDate, shortDateFromInput, timeLabel } from './format';
import type { TaskStatusValue } from '../../design-system/components/index';
import type {
  AppState, Conversation, DocumentItem, DomainId, ProjectData, Task,
} from './types';

const STORAGE_KEY = 'buildos-prototype';
const VERSION = 1;
/** Délai avant la réponse simulée du copilote et la génération d'un document. */
export const SIMULATED_DELAY_MS = 1200;

function seedState(): AppState {
  const projects = structuredClone(seedProjects);
  return {
    version: VERSION,
    currentProjectId: projects[0].project.id,
    projectOrder: projects.map((p) => p.project.id),
    projects: Object.fromEntries(projects.map((p) => [p.project.id, p])),
    nextId: 1,
  };
}

function load(): AppState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const s = JSON.parse(raw) as AppState;
      if (s?.version === VERSION && s.projects?.[s.currentProjectId]) return s;
    }
  } catch {
    // stockage indisponible ou contenu illisible : on repart des données fictives
  }
  return seedState();
}

let state: AppState | null = null;
const listeners = new Set<() => void>();
const serverSnapshot = seedState();

export function getState(): AppState {
  if (!state) state = load();
  return state;
}

function emit() {
  listeners.forEach((l) => l());
}

function setState(next: AppState) {
  state = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // navigation privée ou quota : l'état reste valable pour cet onglet
  }
  emit();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// Garde plusieurs onglets synchronisés.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      state = load();
      emit();
    }
  });
}

/* ---------- Opérations en cours (non conservées) ---------- */

// Identifiants des documents en génération et des conversations qui attendent
// la réponse du copilote : partagés entre écrans, perdus au rechargement.
function createPendingSet() {
  let current: ReadonlySet<string> = new Set();
  const subs = new Set<() => void>();
  const sub = (l: () => void) => {
    subs.add(l);
    return () => subs.delete(l);
  };
  return {
    add(id: string) { current = new Set([...current, id]); subs.forEach((l) => l()); },
    remove(id: string) { const next = new Set(current); next.delete(id); current = next; subs.forEach((l) => l()); },
    use(): ReadonlySet<string> { return useSyncExternalStore(sub, () => current, () => current); },
  };
}

const pendingDocs = createPendingSet();
const pendingReplies = createPendingSet();
export const usePendingDocs = pendingDocs.use;
export const usePendingReplies = pendingReplies.use;

/* ---------- Lecture ---------- */

export function useAppState(): AppState {
  return useSyncExternalStore(subscribe, getState, () => serverSnapshot);
}

/** Projet courant (données complètes). */
export function useCurrentProject(): ProjectData {
  const s = useAppState();
  return s.projects[s.currentProjectId];
}

export function findTask(s: AppState, taskId: string): { projectId: string; task: Task } | null {
  for (const id of s.projectOrder) {
    const task = s.projects[id].tasks.find((t) => t.id === taskId);
    if (task) return { projectId: id, task };
  }
  return null;
}

function findConversation(s: AppState, convId: string): { projectId: string; conv: Conversation } | null {
  for (const id of s.projectOrder) {
    const conv = s.projects[id].conversations.find((c) => c.id === convId);
    if (conv) return { projectId: id, conv };
  }
  return null;
}

/* ---------- Écriture ---------- */

function updateProject(s: AppState, projectId: string, fn: (p: ProjectData) => ProjectData): AppState {
  return { ...s, projects: { ...s.projects, [projectId]: fn(s.projects[projectId]) } };
}

/** Identifiant créé dans le navigateur ; les préfixes ne recoupent pas ceux des données fictives. */
function takeId(prefix: string): string {
  const s = getState();
  const id = `${prefix}${s.nextId}`;
  state = { ...s, nextId: s.nextId + 1 };
  return id;
}

export function switchProject(projectId: string) {
  const s = getState();
  if (s.projects[projectId] && s.currentProjectId !== projectId) setState({ ...s, currentProjectId: projectId });
}

/** Crée un projet à partir de la description, avec un plan type, et en fait le projet courant. */
export function createProject(input: { name: string; description: string }): string {
  const projectId = takeId('projet-');
  const s = getState();
  const founder = s.projects[s.currentProjectId].project;
  const today = shortDate();
  const description = input.description.trim();
  const firstSentence = description.split(/(?<=\.)\s/)[0] ?? description;

  const keyToId = new Map<string, string>();
  const tasks: Task[] = planTemplate.map((t, i) => {
    const id = `${projectId}-t${i + 1}`;
    keyToId.set(t.key, id);
    return { id, domainId: t.domainId, title: t.title, forgotten: t.forgotten, status: 'todo', meta: 'À planifier' };
  });
  const documents: DocumentItem[] = documentTemplate.map((d, i) => ({
    id: `${projectId}-d${i + 1}`, title: d.title, detail: d.detail, domainId: d.domainId,
    taskId: keyToId.get(d.taskKey), status: 'available', outline: d.outline,
  }));
  const forgotten = tasks.filter((t) => t.forgotten);

  const data: ProjectData = {
    project: {
      id: projectId,
      name: input.name.trim(),
      initial: input.name.trim().charAt(0).toUpperCase(),
      founder: founder.founder,
      founderInitials: founder.founderInitials,
      pitch: firstSentence,
      description,
    },
    createdOn: today,
    tasks,
    decisions: [],
    conversations: [],
    documents,
    plan: { generatedOn: today, updatedLabel: 'généré aujourd’hui', expandedDomains: [], mobileOpenDomains: ['produit', 'juridique'] },
    dashboard: {
      dateLabel: `${longDate()} · semaine 1 du plan`,
      weekSummary: ['Plan généré aujourd’hui', 'Aucune décision pour l’instant'],
      copilot: {
        headline: 'Commencez par les étapes souvent oubliées : ce sont elles qui retardent un lancement.',
        suggestions: forgotten.slice(0, 3).map((t) => t.title),
      },
      nextTaskIds: forgotten.slice(0, 4).map((t) => t.id),
    },
  };
  const cur = getState();
  setState({
    ...cur,
    currentProjectId: projectId,
    projectOrder: [projectId, ...cur.projectOrder],
    projects: { ...cur.projects, [projectId]: data },
  });
  return projectId;
}

/** Ajoute une tâche « À faire » au projet courant. due : valeur d'un champ date (AAAA-MM-JJ). */
export function addTask(input: { title: string; domainId: DomainId; due?: string; forgotten?: boolean }): string {
  const id = takeId('tache-');
  const s = getState();
  const task: Task = {
    id,
    domainId: input.domainId,
    title: input.title.trim(),
    status: 'todo',
    forgotten: input.forgotten || undefined,
    meta: input.due ? `Échéance ${shortDateFromInput(input.due)}` : `Ajoutée le ${shortDate()}`,
  };
  setState(updateProject(s, s.currentProjectId, (p) => ({
    ...p,
    tasks: [...p.tasks, task],
    plan: { ...p.plan, updatedLabel: 'mis à jour aujourd’hui' },
  })));
  return id;
}

export function setTaskStatus(taskId: string, status: TaskStatusValue) {
  const s = getState();
  const found = findTask(s, taskId);
  if (!found) return;
  setState(updateProject(s, found.projectId, (p) => ({
    ...p,
    tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
  })));
}

/** Ouvre la conversation rattachée à la tâche (ou une nouvelle conversation libre). */
export function startConversation(taskId?: string): string {
  // Réutilise la conversation de la tâche, ou une nouvelle conversation encore vide.
  const s0 = getState();
  const existing = s0.projects[s0.currentProjectId].conversations.find((c) => (taskId
    ? c.taskId === taskId
    : !c.taskId && c.messages.length === 0));
  if (existing) return existing.id;
  const id = takeId('conv-');
  const s = getState();
  const task = taskId ? findTask(s, taskId)?.task : undefined;
  const conv: Conversation = {
    id,
    title: task?.title ?? 'Nouvelle conversation',
    taskId: task?.id,
    domainId: task?.domainId,
    updatedLabel: shortDate(),
    messages: [],
  };
  setState(updateProject(s, s.currentProjectId, (p) => ({ ...p, conversations: [conv, ...p.conversations] })));
  return id;
}

function patchConversation(convId: string, fn: (c: Conversation) => Conversation) {
  const s = getState();
  const found = findConversation(s, convId);
  if (!found) return;
  setState(updateProject(s, found.projectId, (p) => ({
    ...p,
    // la conversation active remonte en tête de liste
    conversations: [fn(found.conv), ...p.conversations.filter((c) => c.id !== convId)],
  })));
}

/** Ajoute le message, puis la réponse simulée du copilote après un court délai. */
export function sendMessage(convId: string, text: string): Promise<void> {
  const body = text.trim();
  if (!body) return Promise.resolve();
  patchConversation(convId, (c) => ({
    ...c,
    title: !c.taskId && c.messages.length === 0 ? truncate(body, 60) : c.title,
    updatedLabel: shortDate(),
    messages: [...c.messages, { from: 'user', time: timeLabel(), body: [{ type: 'text', text: body }] }],
  }));
  pendingReplies.add(convId);
  return new Promise((resolve) => {
    window.setTimeout(() => {
      pendingReplies.remove(convId);
      patchConversation(convId, (c) => ({
        ...c,
        updatedLabel: shortDate(),
        messages: [...c.messages, { from: 'ai', time: timeLabel(), body: copilotReply(c.domainId) }],
      }));
      resolve();
    }, SIMULATED_DELAY_MS);
  });
}

/** Génère (ou régénère) la trame d'un document après un court délai simulé. */
export function generateDocument(docId: string): Promise<void> {
  pendingDocs.add(docId);
  return new Promise((resolve) => {
    window.setTimeout(() => {
      pendingDocs.remove(docId);
      const s = getState();
      const projectId = s.projectOrder.find((id) => s.projects[id].documents.some((d) => d.id === docId));
      if (projectId) {
        setState(updateProject(s, projectId, (p) => ({
          ...p,
          documents: p.documents.map((d) => (d.id === docId
            ? { ...d, status: 'generated', version: (d.version ?? 0) + 1, updatedLabel: shortDate() }
            : d)),
        })));
      }
      resolve();
    }, SIMULATED_DELAY_MS);
  });
}

/** Remet les données fictives d'origine (efface les ajouts du navigateur). */
export function resetDemo() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // rien à effacer
  }
  setState(seedState());
}

/* ---------- Utilitaires ---------- */

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/** Puces de complétude : critères repérés dans une description. */
export function detectCompleteness(description: string, rules: { label: string; short: string; keywords: string[] }[]) {
  const text = normalize(description);
  return rules.map((r) => ({ label: r.label, short: r.short, done: r.keywords.some((k) => text.includes(normalize(k))) }));
}

/** Prochaines étapes : celles du tableau de bord, sinon les premières tâches ouvertes (oubliées d'abord). */
export function nextSteps(p: ProjectData): Task[] {
  const open = p.tasks.filter((t) => t.status !== 'done');
  const listed = (p.dashboard.nextTaskIds ?? [])
    .map((id) => p.tasks.find((t) => t.id === id))
    .filter((t): t is Task => Boolean(t) && t!.status !== 'done');
  const rest = [...open.filter((t) => t.forgotten), ...open.filter((t) => !t.forgotten)].filter((t) => !listed.includes(t));
  return [...listed, ...rest].slice(0, 4);
}

