# BuildOS — prototype de vision

Prototype Next.js assemblé avec les composants du design system (`../design-system`). Front uniquement : données fictives, aucun appel réseau.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

| Route | Écran | Mobile (< 768px) |
| --- | --- | --- |
| `/` | Accueil : description du projet, création d'un projet (plan type) | oui |
| `/plan` | Plan de lancement, ajout de tâche ; `/plan#juridique` cible un domaine | oui |
| `/tache/[id]` | Détail d'une tâche : statut, documents, conversation avec le copilote | — |
| `/projet` | Tableau de bord du projet actif | — |
| `/conversations`, `/conversations/[id]` | Conversations avec le copilote (réponses simulées) | oui |
| `/documents` | Documents générables (génération simulée, aperçu de la trame) | oui |
| `/projets` | Mes projets : bascule, création, réinitialisation de la démo | oui |

- `lib/mock-data.ts` : toutes les données fictives (3 projets, plan type, réponses du copilote, détail maquetté de la tâche `t10`).
- `lib/store.ts` : état côté navigateur, copié des données fictives puis conservé dans `localStorage` (« Réinitialiser la démo » sur `/projets` le remet à zéro). Le projet actif est recopié dans `BuildOS.Demo` pour la barre latérale d'`AppShell`.
- `lib/buildos.ts` charge `bundle.js` (qui lit `window.React`) et expose `window.BuildOS`, typé par `index.d.ts`.
- `scripts/build-tokens.mjs` génère `styles/tokens.css` depuis `tokens.json` avant `dev` et `build`.
- `screens/` : écrans portés depuis les `preview.html` du design system, et écrans sans maquette (Conversations, Documents, Mes projets) composés avec ses composants et ses tokens ; styles préfixés par écran.
- `components/` : AppShell branché sur les routes (`Shell`), fenêtres, conversation, documents, navigation mobile.
