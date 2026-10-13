// Modèle de données du prototype (front uniquement, données fictives).
import type { IconName, TaskStatusValue } from '../../design-system/components/index';

export type DomainId =
  | 'produit' | 'marche' | 'juridique' | 'finance'
  | 'marketing' | 'tech' | 'operations' | 'veille';

export interface Domain {
  id: DomainId;
  /** Numéro sur deux chiffres, '01' à '08'. */
  index: string;
  name: string;
  icon: IconName;
}

export interface Project {
  id: string;
  name: string;
  initial: string;
  founder: string;
  founderInitials: string;
  pitch: string;
  description: string;
}

export interface Task {
  id: string;
  domainId: DomainId;
  title: string;
  status: TaskStatusValue;
  /** Étape « Souvent oubliée ». */
  forgotten?: boolean;
  meta: string;
}

export interface Decision {
  date: string;
  domain: string;
  text: string;
}

export interface Stats {
  total: number;
  done: number;
  todo: number;
  postponed: number;
  forgotten: number;
  forgottenOpen: number;
  pct: number;
}

export type MessageBlock =
  | { type: 'text'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ol'; items: string[] }
  | { type: 'doc'; title: string; detail: string };

export interface ChatMessage {
  from: 'user' | 'ai';
  time: string;
  body: MessageBlock[];
  actions?: { label: string; icon?: IconName }[];
}

export interface Conversation {
  id: string;
  title: string;
  /** Tâche à laquelle la conversation est rattachée. */
  taskId?: string;
  /** Domaine de contexte (déduit de la tâche si elle existe). */
  domainId?: DomainId;
  updatedLabel: string;
  messages: ChatMessage[];
}

export interface DocumentItem {
  id: string;
  title: string;
  detail: string;
  domainId: DomainId;
  taskId?: string;
  status: 'generated' | 'available';
  version?: number;
  updatedLabel?: string;
  /** Plan de la trame (titres d'articles ou de sections). */
  outline: string[];
}

export interface PlanMeta {
  generatedOn: string;
  updatedLabel: string;
  /** Tâche mise en avant (contour bleu) dans le plan desktop. */
  highlightedTaskId?: string;
  /** Domaines dont les tâches faites restent dépliées. */
  expandedDomains: DomainId[];
  /** Domaines ouverts en mobile ; les autres sont repliés en lignes. */
  mobileOpenDomains: DomainId[];
  /** Texte de l'encadré « souvent oubliées » ; à défaut, il cite les premières tâches ouvertes. */
  forgottenSummary?: string;
}

export interface DashboardMeta {
  dateLabel: string;
  weekSummary: string[];
  nextDeadline?: { date: string; taskId: string };
  copilot: { headline: string; suggestions: string[] };
  /** Prochaines étapes ; à défaut, les premières tâches ouvertes. */
  nextTaskIds?: string[];
}

export interface ProjectData {
  project: Project;
  createdOn: string;
  tasks: Task[];
  decisions: Decision[];
  conversations: Conversation[];
  documents: DocumentItem[];
  plan: PlanMeta;
  dashboard: DashboardMeta;
}

export interface TaskDetail {
  /** Libellé court dans le fil d'Ariane. */
  crumb: string;
  due: string;
  blocks: string;
  why: string;
  reasons: { title: string; text: string; ref: string }[];
  forgottenWhy: string;
  links: { title: string; source: string }[];
}

export interface AppState {
  version: number;
  currentProjectId: string;
  projectOrder: string[];
  projects: Record<string, ProjectData>;
  /** Compteur pour les identifiants créés dans le navigateur. */
  nextId: number;
}
