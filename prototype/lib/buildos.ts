// Point d'entrée unique vers les composants du design system.
// À n'importer que depuis du code exécuté dans le navigateur : bundle.js
// s'appuie sur window (les écrans sont chargés avec ssr: false).
import './react-global';
import '../../design-system/components/bundle.js';
import type {} from '../../design-system/components/index';
import { domains } from './mock-data';
import { getState, subscribe } from './store';

export const B = window.BuildOS;

// AppShell lit BuildOS.Demo en interne (projet, compteurs de la barre latérale) :
// on y recopie le projet courant à chaque changement d'état. Cet abonnement est
// enregistré avant ceux des composants, donc Demo est à jour quand ils se rendent.
function syncDemo() {
  const s = getState();
  const p = s.projects[s.currentProjectId];
  Object.assign(B.Demo as object, {
    project: p.project,
    domains,
    tasks: p.tasks.map((t) => ({ ...t, d: t.domainId })),
    decisions: p.decisions,
  });
}
syncDemo();
subscribe(syncDemo);
