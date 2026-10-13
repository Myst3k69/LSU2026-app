// Point d'entrée unique vers les composants du design system.
// À n'importer que depuis du code exécuté dans le navigateur : bundle.js
// s'appuie sur window (les écrans sont chargés avec ssr: false).
import './react-global';
import '../../design-system/components/bundle.js';
import type {} from '../../design-system/components/index';
import { project, domains, tasks, decisions } from './mock-data';

export const B = window.BuildOS;

// AppShell lit BuildOS.Demo en interne (projet, compteurs de la barre latérale) :
// on y injecte lib/mock-data.ts pour garder une seule source de données.
Object.assign(B.Demo as object, {
  project,
  domains,
  tasks: tasks.map((t) => ({ ...t, d: t.domainId })),
  decisions,
});
