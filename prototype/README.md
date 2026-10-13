# BuildOS — prototype de vision

Prototype Next.js assemblé avec les composants du design system (`../design-system`). Données fictives, aucun appel réseau.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

| Route | Écran |
| --- | --- |
| `/` | Accueil (version mobile sous 768px) |
| `/plan` | Plan de lancement (version mobile sous 768px) |
| `/tache/[id]` | Détail d'une tâche (`t1` à `t27` ; contenu maquetté pour `t10`) |
| `/projet` | Tableau de bord |

- `lib/buildos.ts` charge `bundle.js` (qui lit `window.React`) et expose `window.BuildOS`, typé par `index.d.ts`.
- `scripts/build-tokens.mjs` génère `styles/tokens.css` depuis `tokens.json` avant `dev` et `build`.
- `screens/` : écrans portés depuis les `preview.html` du design system, styles préfixés par écran.
- `lib/mock-data.ts` : toutes les données affichées ; elles sont aussi injectées dans `BuildOS.Demo` pour la barre latérale d'`AppShell`.
