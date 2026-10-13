export const routes = {
  home: '/',
  plan: '/plan',
  /** Section d'un domaine dans le plan (ancre = identifiant du domaine). */
  domain: (id: string) => `/plan#${id}`,
  project: '/projet',
  task: (id: string) => `/tache/${id}`,
};
