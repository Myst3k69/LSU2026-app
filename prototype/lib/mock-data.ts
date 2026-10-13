// Données fictives du prototype de vision (projet Créno Vélo).
// Source unique de toutes les données affichées par les écrans. Les données
// de base (projet, domaines, tâches, décisions) reprennent BuildOS.Demo du
// design system ; lib/buildos.ts les réinjecte dans BuildOS.Demo pour que
// AppShell (barre latérale) affiche les mêmes compteurs.
// Module sans dépendance navigateur : utilisable côté serveur (routes).

import type { IconName, TaskStatusValue } from '../../design-system/components/index';

export type DomainId =
  | 'produit' | 'marche' | 'juridique' | 'finance'
  | 'marketing' | 'tech' | 'operations' | 'veille';

export interface Project {
  name: string;
  initial: string;
  founder: string;
  founderInitials: string;
  pitch: string;
  description: string;
}

export interface Domain {
  id: DomainId;
  /** Numéro sur deux chiffres, '01' à '08'. */
  index: string;
  name: string;
  icon: IconName;
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

/* ---------- Projet, domaines, tâches, décisions ---------- */

export const project: Project = {
  name: 'Créno Vélo',
  initial: 'C',
  founder: 'Camille Ferrand',
  founderInitials: 'CF',
  pitch: 'Une application qui permet aux Lyonnais de réserver en deux minutes un réparateur vélo indépendant, à domicile ou au bureau, sur un créneau garanti.',
  description: 'Je veux lancer une application de réservation pour les réparateurs vélo indépendants à Lyon. Le cycliste choisit un créneau, le réparateur se déplace à domicile ou au bureau, le paiement se fait en ligne. Je prends une commission sur chaque réservation. Lancement prévu au printemps sur 3 arrondissements.',
};

export const domains: Domain[] = [
  { id: 'produit', index: '01', name: 'Produit', icon: 'cube' },
  { id: 'marche', index: '02', name: 'Marché & clients', icon: 'users' },
  { id: 'juridique', index: '03', name: 'Juridique & admin', icon: 'scale' },
  { id: 'finance', index: '04', name: 'Finance', icon: 'euro' },
  { id: 'marketing', index: '05', name: 'Marketing & acquisition', icon: 'megaphone' },
  { id: 'tech', index: '06', name: 'Tech', icon: 'code' },
  { id: 'operations', index: '07', name: 'Opérations', icon: 'sliders' },
  { id: 'veille', index: '08', name: 'Veille', icon: 'eye' },
];

export const tasks: Task[] = [
  { id: 't1', domainId: 'produit', title: 'Définir le parcours de réservation en 3 écrans', status: 'done', meta: 'Validée le 30 sept.' },
  { id: 't2', domainId: 'produit', title: 'Lister les fonctionnalités indispensables du MVP', status: 'done', meta: '9 fonctionnalités retenues' },
  { id: 't3', domainId: 'produit', title: 'Fixer les règles d’annulation et de retard', status: 'todo', forgotten: true, meta: 'Échéance 20 oct.' },
  { id: 't4', domainId: 'produit', title: 'Tester la maquette avec 5 cyclistes lyonnais', status: 'todo', meta: 'Échéance 24 oct.' },
  { id: 't5', domainId: 'marche', title: 'Interroger 10 réparateurs vélo indépendants', status: 'done', meta: '10 entretiens' },
  { id: 't6', domainId: 'marche', title: 'Comparer les solutions déjà utilisées par les cyclistes', status: 'done', meta: '3 alternatives analysées' },
  { id: 't7', domainId: 'marche', title: 'Estimer le volume de réparations à Lyon', status: 'todo', meta: '2 ressources' },
  { id: 't8', domainId: 'marche', title: 'Valider le prix accepté pour un déplacement', status: 'postponed', meta: 'Après les tests maquette' },
  { id: 't9', domainId: 'juridique', title: 'Choisir le statut juridique', status: 'done', meta: 'SASU retenue' },
  { id: 't10', domainId: 'juridique', title: 'Rédiger les CGU de la plateforme et le modèle de CGV', status: 'todo', forgotten: true, meta: '4 documents générables' },
  { id: 't11', domainId: 'juridique', title: 'Vérifier le nom et déposer la marque', status: 'done', forgotten: true, meta: 'Dépôt effectué le 6 oct.' },
  { id: 't12', domainId: 'juridique', title: 'Tenir le registre des traitements de données', status: 'todo', forgotten: true, meta: '2 ressources' },
  { id: 't13', domainId: 'finance', title: 'Fixer la commission par réservation', status: 'done', meta: '12 % retenus' },
  { id: 't14', domainId: 'finance', title: 'Ouvrir un compte bancaire professionnel', status: 'done', meta: 'Ouvert le 1er oct.' },
  { id: 't15', domainId: 'finance', title: 'Construire le prévisionnel sur 12 mois', status: 'todo', meta: 'Échéance 31 oct.' },
  { id: 't16', domainId: 'finance', title: 'Clarifier la TVA applicable aux commissions', status: 'todo', forgotten: true, meta: '1 ressource' },
  { id: 't17', domainId: 'marketing', title: 'Publier une page « liste d’attente »', status: 'done', meta: '148 inscrits' },
  { id: 't18', domainId: 'marketing', title: 'Créer la fiche d’établissement sur les cartes en ligne', status: 'todo', meta: '30 min' },
  { id: 't19', domainId: 'marketing', title: 'Nouer 3 partenariats avec des magasins de vélo', status: 'postponed', meta: 'Après le MVP' },
  { id: 't20', domainId: 'tech', title: 'Choisir un prestataire de paiement en ligne', status: 'todo', meta: '3 options comparées' },
  { id: 't21', domainId: 'tech', title: 'Gérer créneaux et zones d’intervention', status: 'todo', meta: 'Échéance 7 nov.' },
  { id: 't22', domainId: 'tech', title: 'Héberger les données dans l’Union européenne', status: 'done', forgotten: true, meta: 'Hébergeur choisi' },
  { id: 't23', domainId: 'operations', title: 'Souscrire une assurance RC professionnelle', status: 'todo', forgotten: true, meta: 'Échéance 25 oct.' },
  { id: 't24', domainId: 'operations', title: 'Définir la procédure en cas de litige ou de dommage', status: 'todo', forgotten: true, meta: '1 document générable' },
  { id: 't25', domainId: 'operations', title: 'Rédiger le guide d’accueil des réparateurs', status: 'todo', meta: '1 document générable' },
  { id: 't26', domainId: 'veille', title: 'Suivre les dispositifs publics d’aide à la réparation', status: 'todo', meta: 'Alerte mensuelle' },
  { id: 't27', domainId: 'veille', title: 'Surveiller l’arrivée de nouveaux acteurs à Lyon', status: 'postponed', meta: 'Après le lancement' },
];

export const decisions: Decision[] = [
  { date: '12 oct.', domain: 'Finance', text: 'Commission fixée à 12 % par réservation, payée par le réparateur.' },
  { date: '9 oct.', domain: 'Juridique & admin', text: 'Statut retenu : SASU, avec ouverture du capital possible en 2027.' },
  { date: '7 oct.', domain: 'Marché & clients', text: 'Lancement limité aux 3e, 6e et 7e arrondissements.' },
  { date: '3 oct.', domain: 'Marketing & acquisition', text: 'Partenariats avec les magasins reportés après le MVP.' },
];

/* ---------- Accès et calculs ---------- */

export function getDomain(id: DomainId): Domain {
  const d = domains.find((x) => x.id === id);
  if (!d) throw new Error(`Domaine inconnu : ${id}`);
  return d;
}

export function getTask(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function tasksOf(domainId: DomainId): Task[] {
  return tasks.filter((t) => t.domainId === domainId);
}

export function getStats(domainId?: DomainId): Stats {
  const list = domainId ? tasksOf(domainId) : tasks;
  const s: Stats = { total: list.length, done: 0, todo: 0, postponed: 0, forgotten: 0, forgottenOpen: 0, pct: 0 };
  for (const t of list) {
    s[t.status]++;
    if (t.forgotten) {
      s.forgotten++;
      if (t.status !== 'done') s.forgottenOpen++;
    }
  }
  s.pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
  return s;
}

/** Prénom du fondateur, pour les salutations et la conversation. */
export const founderFirstName = project.founder.split(' ')[0];

/* ---------- Accueil ---------- */

export interface CompletenessItem {
  label: string;
  /** Libellé court (mobile). */
  short: string;
  done: boolean;
}

/** Ce que BuildOS a repéré dans la description du projet. */
export const completeness: CompletenessItem[] = [
  { label: 'Ville', short: 'Ville', done: true },
  { label: 'Cible', short: 'Cible', done: true },
  { label: 'Modèle de revenus', short: 'Revenus', done: true },
  { label: 'Budget', short: 'Budget', done: false },
  { label: 'Équipe', short: 'Équipe', done: false },
];

/** Exemples de sujets par domaine (bandeau de l'accueil) ; forgotten = étape souvent oubliée. */
export const domainHighlights: Record<DomainId, { label: string; forgotten?: boolean }[]> = {
  produit: [{ label: 'Parcours' }, { label: 'MVP' }, { label: 'annulations', forgotten: true }],
  marche: [{ label: 'Entretiens' }, { label: 'taille du marché' }, { label: 'prix' }],
  juridique: [{ label: 'Statut' }, { label: 'CGU', forgotten: true }, { label: 'marque', forgotten: true }, { label: 'RGPD', forgotten: true }],
  finance: [{ label: 'Prévisionnel' }, { label: 'commission' }, { label: 'TVA', forgotten: true }],
  marketing: [{ label: 'Liste d’attente' }, { label: 'partenariats' }],
  tech: [{ label: 'Paiement' }, { label: 'créneaux' }, { label: 'hébergement', forgotten: true }],
  operations: [{ label: 'Assurance', forgotten: true }, { label: 'litiges', forgotten: true }, { label: 'onboarding' }],
  veille: [{ label: 'Aides publiques' }, { label: 'concurrence' }],
};

/* ---------- Plan ---------- */

export const plan = {
  generatedOn: '28 sept.',
  updatedLabel: 'mis à jour aujourd’hui',
  /** Tâche mise en avant (contour bleu) dans le plan desktop. */
  highlightedTaskId: 't10',
  /** Domaines dont les tâches faites restent dépliées. */
  expandedDomains: ['juridique'] as DomainId[],
  /** Domaines ouverts en mobile ; les autres sont repliés en lignes. */
  mobileOpenDomains: ['produit', 'juridique'] as DomainId[],
};

/* ---------- Tableau de bord ---------- */

export const dashboard = {
  dateLabel: 'Mardi 13 octobre · semaine 3 du plan',
  weekSummary: ['3 tâches faites cette semaine', '2 décisions prises depuis lundi'],
  nextDeadline: { date: '20 oct.', taskId: 't3' },
  copilot: {
    headline: 'Trois points à trancher avant vos tests utilisateurs du 24 octobre.',
    suggestions: [
      'Fixer le délai d’annulation gratuite',
      'Choisir entre deux prestataires de paiement',
      'Préparer le script des 5 tests maquette',
    ],
  },
  /** Prochaines étapes, classées par urgence et impact. */
  nextTaskIds: ['t10', 't23', 't4', 't15'],
};

/* ---------- Détail d'une tâche ---------- */

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

export interface TaskDetail {
  /** Libellé court dans le fil d'Ariane. */
  crumb: string;
  due: string;
  blocks: string;
  why: string;
  reasons: { title: string; text: string; ref: string }[];
  forgottenWhy: string;
  docs: { title: string; detail: string; generated?: boolean; action: string }[];
  links: { title: string; source: string }[];
  messages: ChatMessage[];
}

/** Contenu détaillé maquetté. Les autres tâches s'affichent avec le même gabarit, sans ce contenu. */
export const taskDetails: Record<string, TaskDetail> = {
  t10: {
    crumb: 'CGU et CGV',
    due: 'Échéance 20 oct.',
    blocks: 'Bloque : ouverture des réservations payantes',
    why: 'Sans conditions générales, chaque réservation repose sur un accord flou : prix, annulation, responsabilité si le vélo est abîmé.',
    reasons: [
      { title: 'Vente à des particuliers', text: 'Avant de payer, le client doit connaître le prix, les frais de déplacement, les conditions d’annulation et son droit de rétractation.', ref: 'Code de la consommation' },
      { title: 'Plateforme de mise en relation', text: 'Vous devez expliquer comment les réparateurs sont référencés et classés, et qui vend la prestation.', ref: 'Article L111-7, Code de la consommation' },
      { title: 'Litiges', text: 'Un professionnel qui vend à des consommateurs doit leur indiquer un médiateur de la consommation.', ref: 'Médiation de la consommation' },
    ],
    forgottenWhy: 'Elle semble pouvoir attendre le lancement. En pratique, elle conditionne l’ouverture des réservations payantes et protège la plateforme dès le premier litige.',
    docs: [
      { title: 'CGU de la plateforme', detail: 'Généré · v1 · 11 articles · hier', generated: true, action: 'Ouvrir' },
      { title: 'Modèle de CGV pour les réparateurs', detail: 'Prix, frais de déplacement, garantie, annulation', action: 'Générer' },
      { title: 'Formulaire de rétractation', detail: 'À joindre à la confirmation de réservation', action: 'Générer' },
      { title: 'Page « Comment sont classés les réparateurs »', detail: 'Information loyale des utilisateurs de la plateforme', action: 'Générer' },
    ],
    links: [
      { title: 'Conditions générales de vente : obligations', source: 'entreprendre.service-public.fr' },
      { title: 'Plateformes en ligne : obligations d’information', source: 'economie.gouv.fr/dgccrf' },
      { title: 'Médiation de la consommation', source: 'economie.gouv.fr/mediation-conso' },
      { title: 'Politique de confidentialité et données clients', source: 'cnil.fr' },
    ],
    messages: [
      { from: 'user', time: 'Hier, 18:02', body: [{ type: 'text', text: 'Les réparateurs doivent-ils aussi avoir leurs propres CGV ?' }] },
      {
        from: 'ai', time: 'Hier, 18:02', body: [
          { type: 'p', text: 'Oui. Chaque réparateur vend sa prestation au client : il doit l’informer de ses prix, frais de déplacement et garanties. Votre plateforme, elle, encadre la mise en relation.' },
          { type: 'p', text: 'Je vous propose :' },
          { type: 'ol', items: ['des CGU pour la plateforme ;', 'un modèle de CGV que chaque réparateur adapte ;', 'une page qui explique le classement des réparateurs.'] },
        ],
      },
      { from: 'user', time: 'Hier, 18:05', body: [{ type: 'text', text: 'Génère la trame des CGU, avec une annulation gratuite jusqu’à 24 h avant.' }] },
      {
        from: 'ai', time: 'Hier, 18:05',
        actions: [{ label: 'Ouvrir les CGU', icon: 'doc' }, { label: 'Modèle de CGV', icon: 'doc-plus' }],
        body: [
          { type: 'doc', title: 'CGU de la plateforme · v1', detail: '11 articles · annulation gratuite jusqu’à 24 h' },
          { type: 'p', text: 'Deux points à valider avec un juriste : la responsabilité en cas de dommage au vélo et la procédure de médiation.' },
        ],
      },
    ],
  },
};
