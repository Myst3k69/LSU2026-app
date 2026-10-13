export const routes = {
  home: '/',
  plan: '/plan',
  /** Section d'un domaine dans le plan (ancre = identifiant du domaine). */
  domain: (id: string) => `/plan#${id}`,
  /** Tableau de bord du projet courant. */
  project: '/projet',
  /** Liste des projets. */
  projects: '/projets',
  task: (id: string) => `/tache/${id}`,
  conversations: '/conversations',
  conversation: (id: string) => `/conversations/${id}`,
  documents: '/documents',
};
