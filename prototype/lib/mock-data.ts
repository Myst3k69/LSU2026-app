// Données fictives du prototype de vision : source unique de tout le contenu.
// Les trois projets ci-dessous forment l'état initial (lib/store.ts le copie
// puis le conserve dans le navigateur) ; le reste est du contenu statique
// (gabarits, réponses simulées du copilote, détail maquetté d'une tâche).
// Module sans dépendance navigateur : utilisable côté serveur (routes).

import type {
  Domain, DomainId, MessageBlock, ProjectData, Stats, Task, TaskDetail,
} from './types';

export type * from './types';

/* ---------- Domaines (communs à tous les projets) ---------- */

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

export function getDomain(id: DomainId): Domain {
  const d = domains.find((x) => x.id === id);
  if (!d) throw new Error(`Domaine inconnu : ${id}`);
  return d;
}

export function isDomainId(id: string): id is DomainId {
  return domains.some((d) => d.id === id);
}

/* ---------- Calculs sur une liste de tâches ---------- */

export function tasksOf(tasks: Task[], domainId: DomainId): Task[] {
  return tasks.filter((t) => t.domainId === domainId);
}

export function getStats(tasks: Task[], domainId?: DomainId): Stats {
  const list = domainId ? tasksOf(tasks, domainId) : tasks;
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

/* ---------- Projet 1 : Créno Vélo (projet des maquettes) ---------- */

const creno: ProjectData = {
  project: {
    id: 'creno',
    name: 'Créno Vélo',
    initial: 'C',
    founder: 'Camille Ferrand',
    founderInitials: 'CF',
    pitch: 'Une application qui permet aux Lyonnais de réserver en deux minutes un réparateur vélo indépendant, à domicile ou au bureau, sur un créneau garanti.',
    description: 'Je veux lancer une application de réservation pour les réparateurs vélo indépendants à Lyon. Le cycliste choisit un créneau, le réparateur se déplace à domicile ou au bureau, le paiement se fait en ligne. Je prends une commission sur chaque réservation. Lancement prévu au printemps sur 3 arrondissements.',
  },
  createdOn: '28 sept.',
  tasks: [
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
  ],
  decisions: [
    { date: '12 oct.', domain: 'Finance', text: 'Commission fixée à 12 % par réservation, payée par le réparateur.' },
    { date: '9 oct.', domain: 'Juridique & admin', text: 'Statut retenu : SASU, avec ouverture du capital possible en 2027.' },
    { date: '7 oct.', domain: 'Marché & clients', text: 'Lancement limité aux 3e, 6e et 7e arrondissements.' },
    { date: '3 oct.', domain: 'Marketing & acquisition', text: 'Partenariats avec les magasins reportés après le MVP.' },
  ],
  conversations: [
    {
      id: 'c1', title: 'CGU et CGV de la plateforme', taskId: 't10', domainId: 'juridique', updatedLabel: 'Hier, 18:05',
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
    {
      id: 'c2', title: 'Prestataire de paiement', taskId: 't20', domainId: 'tech', updatedLabel: '10 oct.',
      messages: [
        { from: 'user', time: '10 oct., 09:14', body: [{ type: 'text', text: 'Quel type de prestataire de paiement me faut-il pour encaisser le client puis reverser au réparateur ?' }] },
        {
          from: 'ai', time: '10 oct., 09:14', body: [
            { type: 'p', text: 'Il vous faut une solution de paiement pour place de marché : elle encaisse le client, retient votre commission de 12 % et reverse le solde au réparateur.' },
            { type: 'p', text: 'Pour comparer les trois options retenues :' },
            { type: 'ol', items: ['frais par transaction et par versement ;', 'vérification d’identité des réparateurs incluse ;', 'délai de versement aux réparateurs.'] },
          ],
        },
      ],
    },
    {
      id: 'c3', title: 'Tester le prix du déplacement', taskId: 't8', domainId: 'marche', updatedLabel: '7 oct.',
      messages: [
        { from: 'user', time: '7 oct., 17:40', body: [{ type: 'text', text: 'Comment tester le prix du déplacement sans lancer l’application ?' }] },
        {
          from: 'ai', time: '7 oct., 17:41', body: [
            { type: 'p', text: 'Ajoutez la question aux 5 tests maquette du 24 octobre : montrez trois prix de déplacement et notez à partir duquel les cyclistes renoncent.' },
            { type: 'p', text: 'Vous déciderez ensuite à partir de réponses réelles plutôt que d’hypothèses.' },
          ],
        },
      ],
    },
  ],
  documents: [
    {
      id: 'd1', title: 'CGU de la plateforme', detail: '11 articles', domainId: 'juridique', taskId: 't10', status: 'generated', version: 1, updatedLabel: 'hier',
      outline: ['Objet', 'Définitions', 'Inscription et compte', 'Rôle de la plateforme', 'Réservation d’un créneau', 'Prix, frais de déplacement et paiement', 'Annulation et retard', 'Droit de rétractation', 'Responsabilité et dommages', 'Données personnelles', 'Médiation et litiges'],
    },
    {
      id: 'd2', title: 'Modèle de CGV pour les réparateurs', detail: 'Prix, frais de déplacement, garantie, annulation', domainId: 'juridique', taskId: 't10', status: 'available',
      outline: ['Identité du réparateur', 'Prestations et prix', 'Frais de déplacement', 'Garantie des réparations', 'Annulation', 'Droit de rétractation', 'Médiation de la consommation'],
    },
    {
      id: 'd3', title: 'Formulaire de rétractation', detail: 'À joindre à la confirmation de réservation', domainId: 'juridique', taskId: 't10', status: 'available',
      outline: ['Coordonnées du réparateur', 'Prestation concernée', 'Date de la réservation', 'Signature du client'],
    },
    {
      id: 'd4', title: 'Page « Comment sont classés les réparateurs »', detail: 'Information loyale des utilisateurs de la plateforme', domainId: 'juridique', taskId: 't10', status: 'available',
      outline: ['Critères de référencement', 'Critères de classement', 'Avis des clients', 'Relation commerciale avec les réparateurs'],
    },
    {
      id: 'd5', title: 'Procédure en cas de litige ou de dommage', detail: 'Étapes, délais et contacts si un vélo est abîmé', domainId: 'operations', taskId: 't24', status: 'available',
      outline: ['Signalement par le client', 'Constat contradictoire', 'Prise en charge par l’assurance', 'Délais de réponse', 'Recours à la médiation'],
    },
    {
      id: 'd6', title: 'Guide d’accueil des réparateurs', detail: 'Inscription, créneaux, paiement, bonnes pratiques', domainId: 'operations', taskId: 't25', status: 'available',
      outline: ['Bienvenue sur Créno Vélo', 'Créer son profil', 'Gérer ses créneaux et zones', 'Recevoir ses paiements', 'Règles d’annulation', 'Qualité de service'],
    },
  ],
  plan: {
    generatedOn: '28 sept.',
    updatedLabel: 'mis à jour aujourd’hui',
    highlightedTaskId: 't10',
    expandedDomains: ['juridique'],
    mobileOpenDomains: ['produit', 'juridique'],
    forgottenSummary: 'CGU et CGV, assurance RC professionnelle, TVA sur les commissions… Ce sont elles qui retardent le plus souvent une ouverture des réservations.',
  },
  dashboard: {
    dateLabel: 'Mardi 13 octobre · semaine 3 du plan',
    weekSummary: ['3 tâches faites cette semaine', '2 décisions prises depuis lundi'],
    nextDeadline: { date: '20 oct.', taskId: 't3' },
    copilot: {
      headline: 'Trois points à trancher avant vos tests utilisateurs du 24 octobre.',
      suggestions: ['Fixer le délai d’annulation gratuite', 'Choisir entre deux prestataires de paiement', 'Préparer le script des 5 tests maquette'],
    },
    nextTaskIds: ['t10', 't23', 't4', 't15'],
  },
};

/* ---------- Projet 2 : Bocal & Co ---------- */

const bocal: ProjectData = {
  project: {
    id: 'bocal',
    name: 'Bocal & Co',
    initial: 'B',
    founder: 'Camille Ferrand',
    founderInitials: 'CF',
    pitch: 'Une épicerie en vrac livrée à vélo à Villeurbanne, dans des bocaux consignés récupérés à la livraison suivante.',
    description: 'Je veux livrer à vélo des produits d’épicerie en vrac aux habitants de Villeurbanne. Les clients commandent en ligne, les produits arrivent dans des bocaux consignés que le livreur récupère à la livraison suivante. Je me rémunère sur la marge des produits, avec un abonnement mensuel optionnel.',
  },
  createdOn: '2 sept.',
  tasks: [
    { id: 'b1', domainId: 'produit', title: 'Définir le catalogue de lancement (60 références)', status: 'done', meta: 'Validé le 15 sept.' },
    { id: 'b2', domainId: 'produit', title: 'Fixer le montant et les règles de la consigne', status: 'todo', forgotten: true, meta: 'Échéance 22 oct.' },
    { id: 'b3', domainId: 'marche', title: 'Interroger 15 foyers de Villeurbanne', status: 'done', meta: '15 entretiens' },
    { id: 'b4', domainId: 'marche', title: 'Comparer avec les épiceries vrac du quartier', status: 'todo', meta: '2 ressources' },
    { id: 'b5', domainId: 'juridique', title: 'Choisir le statut juridique', status: 'done', meta: 'SAS retenue' },
    { id: 'b6', domainId: 'juridique', title: 'Vérifier les règles d’étiquetage des produits en vrac', status: 'todo', forgotten: true, meta: '1 ressource' },
    { id: 'b7', domainId: 'juridique', title: 'Rédiger les CGV de vente en ligne', status: 'todo', forgotten: true, meta: '1 document générable' },
    { id: 'b8', domainId: 'finance', title: 'Construire le prévisionnel sur 12 mois', status: 'done', meta: 'Validé le 30 sept.' },
    { id: 'b9', domainId: 'finance', title: 'Chiffrer le coût de lavage des bocaux', status: 'todo', forgotten: true, meta: 'Échéance 25 oct.' },
    { id: 'b10', domainId: 'marketing', title: 'Ouvrir les précommandes sur une page dédiée', status: 'todo', meta: '42 inscrits' },
    { id: 'b11', domainId: 'tech', title: 'Choisir l’outil de boutique en ligne', status: 'done', meta: '2 options comparées' },
    { id: 'b12', domainId: 'operations', title: 'Déclarer l’activité alimentaire auprès de la DDPP', status: 'todo', forgotten: true, meta: 'Échéance 30 oct.' },
    { id: 'b13', domainId: 'operations', title: 'Trouver un local de stockage', status: 'postponed', meta: 'Après les précommandes' },
    { id: 'b14', domainId: 'veille', title: 'Suivre la réglementation sur la consigne', status: 'todo', meta: 'Alerte mensuelle' },
  ],
  decisions: [
    { date: '24 sept.', domain: 'Juridique & admin', text: 'Statut retenu : SAS, avec un associé minoritaire.' },
    { date: '18 sept.', domain: 'Marché & clients', text: 'Livraison limitée aux quartiers Gratte-Ciel et Charpennes.' },
  ],
  conversations: [
    {
      id: 'bc1', title: 'Lavage des bocaux', taskId: 'b9', domainId: 'finance', updatedLabel: '8 oct.',
      messages: [
        { from: 'user', time: '8 oct., 11:20', body: [{ type: 'text', text: 'Faut-il laver les bocaux moi-même ou passer par un prestataire ?' }] },
        {
          from: 'ai', time: '8 oct., 11:21', body: [
            { type: 'p', text: 'Les deux sont possibles. Le lavage en interne demande un lave-vaisselle professionnel et un local conforme ; un prestataire facture à l’unité et vous évite l’investissement.' },
            { type: 'p', text: 'Pour trancher, comparez sur 500 bocaux par semaine :' },
            { type: 'ol', items: ['le coût unitaire chez deux prestataires ;', 'l’amortissement d’un lave-vaisselle professionnel ;', 'le temps de collecte et de tri.'] },
          ],
        },
      ],
    },
  ],
  documents: [
    {
      id: 'bd1', title: 'CGV de vente en ligne', detail: 'Commande, livraison, consigne, rétractation', domainId: 'juridique', taskId: 'b7', status: 'available',
      outline: ['Identité du vendeur', 'Commande', 'Prix et paiement', 'Livraison', 'Consigne des bocaux', 'Droit de rétractation', 'Médiation de la consommation'],
    },
    {
      id: 'bd2', title: 'Prévisionnel sur 12 mois', detail: 'Tableau mensuel, 3 scénarios', domainId: 'finance', taskId: 'b8', status: 'generated', version: 2, updatedLabel: '30 sept.',
      outline: ['Hypothèses de vente', 'Marge par famille de produits', 'Coûts de livraison', 'Coût de la consigne', 'Trésorerie mensuelle'],
    },
    {
      id: 'bd3', title: 'Déclaration d’activité alimentaire', detail: 'Informations à préparer pour la DDPP', domainId: 'operations', taskId: 'b12', status: 'available',
      outline: ['Identité de l’entreprise', 'Adresse du local', 'Nature des denrées manipulées', 'Mode de distribution'],
    },
  ],
  plan: {
    generatedOn: '2 sept.',
    updatedLabel: 'mis à jour le 8 oct.',
    expandedDomains: [],
    mobileOpenDomains: ['produit', 'finance'],
  },
  dashboard: {
    dateLabel: 'Mardi 13 octobre · semaine 6 du plan',
    weekSummary: ['1 tâche faite cette semaine', 'Aucune décision depuis lundi'],
    nextDeadline: { date: '22 oct.', taskId: 'b2' },
    copilot: {
      headline: 'Deux points à régler avant l’ouverture des précommandes.',
      suggestions: ['Fixer le montant de la consigne', 'Vérifier l’étiquetage des produits en vrac'],
    },
    nextTaskIds: ['b2', 'b9', 'b6', 'b10'],
  },
};

/* ---------- Projet 3 : Atelier Reprise ---------- */

const reprise: ProjectData = {
  project: {
    id: 'reprise',
    name: 'Atelier Reprise',
    initial: 'A',
    founder: 'Camille Ferrand',
    founderInitials: 'CF',
    pitch: 'Un service de retouche et de réparation de vêtements déposés et récupérés sur le lieu de travail, à la Part-Dieu.',
    description: 'Je veux proposer aux salariés des entreprises de la Part-Dieu de déposer leurs vêtements à retoucher ou à réparer dans un casier au bureau. Une couturière les récupère deux fois par semaine et les rapporte sous cinq jours. Les entreprises paient un abonnement, les salariés paient les retouches.',
  },
  createdOn: '6 oct.',
  tasks: [
    { id: 'r1', domainId: 'produit', title: 'Définir la grille des retouches proposées', status: 'todo', meta: 'Échéance 20 oct.' },
    { id: 'r2', domainId: 'produit', title: 'Fixer les règles en cas de vêtement abîmé', status: 'todo', forgotten: true, meta: '1 document générable' },
    { id: 'r3', domainId: 'marche', title: 'Rencontrer 5 responsables RH de la Part-Dieu', status: 'todo', meta: '1 rendez-vous pris' },
    { id: 'r4', domainId: 'marche', title: 'Tester l’intérêt auprès de 30 salariés', status: 'done', meta: '30 réponses' },
    { id: 'r5', domainId: 'juridique', title: 'Choisir le statut juridique', status: 'todo', meta: '2 options comparées' },
    { id: 'r6', domainId: 'juridique', title: 'Rédiger le contrat d’abonnement entreprise', status: 'todo', forgotten: true, meta: '1 document générable' },
    { id: 'r7', domainId: 'finance', title: 'Fixer le prix de l’abonnement entreprise', status: 'todo', meta: 'Échéance 27 oct.' },
    { id: 'r8', domainId: 'finance', title: 'Clarifier la TVA sur les retouches', status: 'todo', forgotten: true, meta: '1 ressource' },
    { id: 'r9', domainId: 'marketing', title: 'Préparer une plaquette pour les entreprises', status: 'todo', meta: '1 document générable' },
    { id: 'r10', domainId: 'tech', title: 'Choisir un outil de suivi des dépôts', status: 'todo', meta: '3 options' },
    { id: 'r11', domainId: 'operations', title: 'Souscrire une assurance pour les vêtements confiés', status: 'todo', forgotten: true, meta: 'Échéance 3 nov.' },
    { id: 'r12', domainId: 'veille', title: 'Suivre les aides à la réparation textile', status: 'todo', meta: 'Alerte mensuelle' },
  ],
  decisions: [
    { date: '9 oct.', domain: 'Marché & clients', text: 'Cible de départ : entreprises de plus de 200 salariés.' },
  ],
  conversations: [
    {
      id: 'rc1', title: 'Statut juridique', taskId: 'r5', domainId: 'juridique', updatedLabel: '11 oct.',
      messages: [
        { from: 'user', time: '11 oct., 14:05', body: [{ type: 'text', text: 'Micro-entreprise ou SASU pour démarrer ?' }] },
        {
          from: 'ai', time: '11 oct., 14:06', body: [
            { type: 'p', text: 'Tout dépend du chiffre d’affaires visé et de vos charges. La micro-entreprise est simple mais plafonnée et ne permet pas de déduire vos frais ; la SASU demande une comptabilité complète mais facilite l’arrivée d’associés.' },
            { type: 'p', text: 'Ce sont des repères généraux : faites valider votre choix par un expert-comptable, avec vos chiffres.' },
          ],
        },
      ],
    },
  ],
  documents: [
    {
      id: 'rd1', title: 'Contrat d’abonnement entreprise', detail: 'Durée, prix par salarié, casiers, résiliation', domainId: 'juridique', taskId: 'r6', status: 'available',
      outline: ['Objet du contrat', 'Durée et résiliation', 'Prix et facturation', 'Installation des casiers', 'Responsabilités', 'Données des salariés'],
    },
    {
      id: 'rd2', title: 'Règles en cas de vêtement abîmé', detail: 'Constat, prise en charge, indemnisation', domainId: 'produit', taskId: 'r2', status: 'available',
      outline: ['État du vêtement au dépôt', 'Signalement d’un dommage', 'Prise en charge', 'Plafond d’indemnisation'],
    },
    {
      id: 'rd3', title: 'Plaquette entreprises', detail: 'Présentation du service aux responsables RH', domainId: 'marketing', taskId: 'r9', status: 'available',
      outline: ['Le service en une phrase', 'Comment ça marche', 'Ce que l’entreprise finance', 'Mise en place en deux semaines'],
    },
  ],
  plan: {
    generatedOn: '6 oct.',
    updatedLabel: 'mis à jour le 11 oct.',
    expandedDomains: [],
    mobileOpenDomains: ['produit', 'juridique'],
  },
  dashboard: {
    dateLabel: 'Mardi 13 octobre · semaine 2 du plan',
    weekSummary: ['1 tâche faite cette semaine', '1 décision prise depuis lundi'],
    nextDeadline: { date: '20 oct.', taskId: 'r1' },
    copilot: {
      headline: 'Trois sujets à préparer avant vos rendez-vous RH.',
      suggestions: ['Chiffrer l’abonnement par salarié', 'Préparer la plaquette entreprises', 'Lister les cas de vêtement abîmé'],
    },
    nextTaskIds: ['r1', 'r3', 'r11', 'r7'],
  },
};

/** Projets de départ, dans l'ordre d'affichage. Le premier est le projet courant. */
export const seedProjects: ProjectData[] = [creno, bocal, reprise];

/* ---------- Nouveau projet : plan type ---------- */

/** Tâches d'un plan généré (clé locale pour relier les documents). */
export const planTemplate: (Omit<Task, 'id' | 'status' | 'meta'> & { key: string })[] = [
  { key: 'parcours', domainId: 'produit', title: 'Décrire le parcours client principal' },
  { key: 'mvp', domainId: 'produit', title: 'Lister les fonctionnalités indispensables du MVP' },
  { key: 'annulation', domainId: 'produit', title: 'Fixer les règles d’annulation et de remboursement', forgotten: true },
  { key: 'entretiens', domainId: 'marche', title: 'Interroger 10 clients potentiels' },
  { key: 'concurrence', domainId: 'marche', title: 'Identifier 3 concurrents ou alternatives' },
  { key: 'prix', domainId: 'marche', title: 'Valider le prix accepté par vos clients' },
  { key: 'statut', domainId: 'juridique', title: 'Choisir le statut juridique' },
  { key: 'cgv', domainId: 'juridique', title: 'Rédiger les CGU et CGV', forgotten: true },
  { key: 'marque', domainId: 'juridique', title: 'Vérifier le nom et déposer la marque', forgotten: true },
  { key: 'rgpd', domainId: 'juridique', title: 'Tenir le registre des traitements de données', forgotten: true },
  { key: 'previsionnel', domainId: 'finance', title: 'Construire le prévisionnel sur 12 mois' },
  { key: 'banque', domainId: 'finance', title: 'Ouvrir un compte bancaire professionnel' },
  { key: 'tva', domainId: 'finance', title: 'Clarifier le régime de TVA', forgotten: true },
  { key: 'attente', domainId: 'marketing', title: 'Publier une page « liste d’attente »' },
  { key: 'canal', domainId: 'marketing', title: 'Choisir un premier canal d’acquisition' },
  { key: 'outils', domainId: 'tech', title: 'Choisir les outils du MVP' },
  { key: 'hebergement', domainId: 'tech', title: 'Héberger les données dans l’Union européenne', forgotten: true },
  { key: 'assurance', domainId: 'operations', title: 'Souscrire une assurance RC professionnelle', forgotten: true },
  { key: 'litiges', domainId: 'operations', title: 'Définir la procédure en cas de litige', forgotten: true },
  { key: 'aides', domainId: 'veille', title: 'Suivre les aides publiques à la création' },
  { key: 'veille', domainId: 'veille', title: 'Surveiller les concurrents locaux' },
];

/** Documents générables d'un plan généré, rattachés aux tâches du gabarit par leur clé. */
export const documentTemplate: { taskKey: string; title: string; detail: string; domainId: DomainId; outline: string[] }[] = [
  { taskKey: 'cgv', title: 'CGU et CGV', detail: 'Conditions d’utilisation et de vente', domainId: 'juridique', outline: ['Objet', 'Commande et prix', 'Paiement', 'Annulation et remboursement', 'Droit de rétractation', 'Responsabilité', 'Médiation de la consommation'] },
  { taskKey: 'rgpd', title: 'Registre des traitements de données', detail: 'Données clients, finalités, durées de conservation', domainId: 'juridique', outline: ['Responsable du traitement', 'Finalités', 'Catégories de données', 'Durées de conservation', 'Mesures de sécurité'] },
  { taskKey: 'previsionnel', title: 'Prévisionnel sur 12 mois', detail: 'Hypothèses, chiffre d’affaires, trésorerie', domainId: 'finance', outline: ['Hypothèses de vente', 'Charges fixes', 'Charges variables', 'Trésorerie mensuelle'] },
];

/* ---------- Accueil ---------- */

/** Brouillon affiché dans la zone de description de l'accueil. */
export const homeDraft = creno.project.description;

/** Critères repérés dans la description (puces de complétude) : mots-clés recherchés sans accents. */
export const completenessRules: { label: string; short: string; keywords: string[] }[] = [
  { label: 'Ville', short: 'Ville', keywords: ['lyon', 'villeurbanne', 'paris', 'marseille', 'lille', 'nantes', 'bordeaux', 'toulouse', 'rennes', 'strasbourg', 'grenoble', 'montpellier', 'nice', 'ville', 'quartier', 'arrondissement'] },
  { label: 'Cible', short: 'Cible', keywords: ['client', 'cycliste', 'particulier', 'habitant', 'salarie', 'entreprise', 'etudiant', 'famille', 'professionnel', 'utilisateur'] },
  { label: 'Modèle de revenus', short: 'Revenus', keywords: ['commission', 'abonnement', 'marge', 'payant', 'paient', 'paie', 'prix', 'vente', 'tarif', 'facture'] },
  { label: 'Budget', short: 'Budget', keywords: ['budget', '€', 'euros', 'apport', 'financement', 'levee'] },
  { label: 'Équipe', short: 'Équipe', keywords: ['equipe', 'associe', 'cofondat', 'co-fondat', 'recrut', 'salaries a recruter'] },
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

/* ---------- Copilote IA : réponses simulées ---------- */

/** Réponse type par domaine. legal = rappel de faire valider par un professionnel. */
export const copilotPlaybook: Record<DomainId | 'general', { intro: string; steps: string[]; legal?: boolean }> = {
  produit: { intro: 'Pour avancer sur ce point produit, partez de l’usage réel : qui fait quoi, à quel moment, et ce qui se passe quand cela se passe mal.', steps: ['décrire le cas nominal en trois étapes ;', 'lister les cas d’échec (annulation, retard, erreur) ;', 'valider le tout avec 3 utilisateurs.'] },
  marche: { intro: 'Le plus fiable reste de confronter cette question à de vrais clients avant de trancher.', steps: ['formuler une question précise ;', 'la poser à 5 personnes de votre cible ;', 'noter les réponses mot pour mot avant de conclure.'] },
  juridique: { intro: 'Sur ce point juridique, voici les repères généraux à vérifier pour votre situation.', steps: ['identifier le texte applicable à votre activité ;', 'générer une trame depuis la page Documents ;', 'la faire relire avant publication.'], legal: true },
  finance: { intro: 'Pour ce sujet financier, chiffrez d’abord les hypothèses, puis comparez au moins deux scénarios.', steps: ['écrire les hypothèses chiffrées ;', 'construire un scénario prudent et un scénario cible ;', 'mesurer l’effet sur la trésorerie mensuelle.'], legal: true },
  marketing: { intro: 'Pour ce sujet d’acquisition, testez à petite échelle avant d’investir.', steps: ['choisir un seul canal à tester ;', 'fixer un objectif mesurable sur deux semaines ;', 'arrêter ou poursuivre selon le résultat.'] },
  tech: { intro: 'Pour ce choix technique, privilégiez ce qui vous permet de lancer vite et de changer plus tard.', steps: ['lister les fonctions indispensables ;', 'comparer deux solutions existantes ;', 'vérifier où sont hébergées les données.'] },
  operations: { intro: 'Pour ce sujet d’opérations, écrivez la procédure telle qu’elle se déroulera le premier jour.', steps: ['écrire chaque étape et son responsable ;', 'prévoir le cas où quelque chose tourne mal ;', 'tester la procédure une fois à blanc.'], legal: true },
  veille: { intro: 'Pour cette veille, fixez une source et un rythme de lecture plutôt que de tout suivre.', steps: ['choisir deux sources fiables ;', 'programmer une lecture mensuelle ;', 'noter ce qui change pour votre projet.'] },
  general: { intro: 'Voici comment je vous propose d’avancer.', steps: ['préciser la question ;', 'la rattacher à une tâche du plan ;', 'fixer une échéance.'] },
};

export const copilotLegalNote = 'Ce sont des repères généraux. Faites-les valider par un professionnel (avocat, expert-comptable ou assureur selon le cas) avant de les appliquer.';

export function copilotReply(domainId?: DomainId): MessageBlock[] {
  const play = copilotPlaybook[domainId ?? 'general'];
  const blocks: MessageBlock[] = [
    { type: 'p', text: play.intro },
    { type: 'p', text: 'Je vous propose :' },
    { type: 'ol', items: play.steps },
  ];
  if (play.legal) blocks.push({ type: 'p', text: copilotLegalNote });
  return blocks;
}

/* ---------- Détail maquetté d'une tâche ---------- */

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
    links: [
      { title: 'Conditions générales de vente : obligations', source: 'entreprendre.service-public.fr' },
      { title: 'Plateformes en ligne : obligations d’information', source: 'economie.gouv.fr/dgccrf' },
      { title: 'Médiation de la consommation', source: 'economie.gouv.fr/mediation-conso' },
      { title: 'Politique de confidentialité et données clients', source: 'cnil.fr' },
    ],
  },
};

/** Identifiants des tâches de départ (pré-rendu des routes /tache/[id]). */
export const seedTaskIds = seedProjects.flatMap((p) => p.tasks.map((t) => t.id));

export function findSeedTask(id: string): Task | undefined {
  for (const p of seedProjects) {
    const t = p.tasks.find((x) => x.id === id);
    if (t) return t;
  }
  return undefined;
}
