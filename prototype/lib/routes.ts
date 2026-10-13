export const routes = {
  home: '/',
  plan: '/plan',
  project: '/projet',
  task: (id: string) => `/tache/${id}`,
};
