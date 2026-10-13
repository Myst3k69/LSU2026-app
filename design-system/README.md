BuildOS aide les fondateurs à passer de l'idée au plan d'action : il structure le projet en huit domaines, signale les étapes souvent oubliées et transforme les décisions en tâches. Le système est éditorial et sobre — papier crème, encre noire, un seul bleu électrique — comme un magazine économique mis en application.

## Contenu et ton

- Écrire en français, au vouvoiement, avec des phrases courtes et affirmatives. Exemple : « Décrivez votre idée. On en fait un plan. »
- Titres en casse de phrase, terminés par un point quand ils sont des affirmations (« Copilote IA. », « Le plan avance. »). Le dernier mot d'un titre manifeste peut passer en `bleu`, point compris.
- Libellés de boutons : un verbe à l'infinitif et son objet (« Générer mon plan », « Marquer comme faite », « Reporter »).
- Étiquettes éditoriales en CAPITALES espacées (`label`, `ink-3`), souvent sur deux ou trois lignes empilées : « DE L'IDÉE / AU PLAN D'ACTION ».
- Chiffres réels et vérifiables : « 10 tâches faites sur 27 », jamais de statistiques décoratives.
- Le copilote IA explique, propose, puis rappelle les limites : une réponse juridique, fiscale ou sociale invite à faire valider par un professionnel.
- Pas d'emoji, pas de point d'exclamation, pas de superlatifs.
- Termes fixes : « Souvent oubliée » (badge), « À faire / Faite / Reportée » (statuts), « Copilote IA », « Plan de lancement », et les huit domaines : Produit, Marché & clients, Juridique & admin, Finance, Marketing & acquisition, Tech, Opérations, Veille.

## Couleurs

- Fond de page `paper` ; cartes, champs et panneaux en `surface` ; zones en retrait (barre latérale, pistes) en `paper-deep`.
- Texte : `ink` pour les titres et le texte principal, `ink-2` pour les paragraphes secondaires, `ink-3` pour les métadonnées et étiquettes. Les trois tiennent 4.5:1 sur `paper`, `surface` et `paper-deep`.
- `bleu` est la couleur d'identité et d'action : bouton primaire, mot accentué, lien, progression, focus. Une seule action `bleu` par vue. Texte posé sur `bleu` : `on-bleu`.
- `bleu-soft` porte la voix du copilote IA (bulles, suggestions) et l'élément actif de la navigation.
- `orange` / `orange-ink` / `orange-soft` signifient uniquement « Souvent oubliée ». Texte orange toujours en `orange-ink`.
- `vert` / `vert-soft` signifient uniquement « Faite ».
- Aucun statut ne repose sur la couleur seule : chaque statut et badge porte un mot et une icône.
- Filets : `line` pour séparer, `line-control` pour borner un contrôle (3:1), et un filet `ink` de 1,5px pour fermer un en-tête de section ou de domaine.

## Typographie

- Deux familles, fichiers fournis dans `fonts/` : Schibsted Grotesk (`sans`, 400 à 800) pour l'interface et les titres, Newsreader (`serif`, 400, 400 italique, 600) pour les numéros et l'éditorial.
- Titres display en ExtraBold serré : `display-xl` (accueil), `display-l` (grands chiffres, accueil mobile), `title-xl` (titre de page), `title-l`, `title-m` (nom de domaine), `title-s` (titre de tâche).
- Texte : `body-l` pour les chapeaux, `body` pour le texte courant et les messages, `body-s` pour les métadonnées, `ui` pour les boutons et la navigation, `label` en capitales.
- Les numéros de domaine et de section sont en serif sur deux chiffres : `numeral` (72px) en desktop, `numeral-s` (36px) en mobile et en liste.
- `lead-serif` pour une phrase d'accroche ou la justification « Pourquoi c'est indispensable » ; `quote-serif` (italique) pour un exemple de question.

## Espacements, rayons, ombres

- Échelle de 4px : `space-1` (4) à `space-9` (96). Cartes de tâche : `space-4` de padding, `space-3` entre cartes ; panneaux : `space-5` ; sections : `space-7`.
- Le système est presque carré : `radius-xs` (4px) pour boutons, badges et statuts ; `radius-sm` (8px) pour champs et bulles ; `radius-md` (12px) pour cartes ; `radius-lg` (20px) pour cadres et grands encadrés ; `radius-full` pour avatars et disques décoratifs.
- Ombres discrètes : `shadow-card` au repos, `shadow-lift` au survol ou à la sélection, `shadow-frame` pour un panneau flottant sur une page éditoriale. Pas d'autres ombres, pas de dégradés.

## Mise en page

- Grilles éditoriales : colonnes séparées par des filets fins `line`, sections numérotées « 01 », « 02 » avec un filet `ink` de fermeture.
- Disques `bleu` pleins, coupés par le bord de l'écran, comme seul motif graphique ; jamais derrière du texte de lecture.
- Desktop : barre latérale de 264px (`AppShell`), marges de contenu `space-7`. Mobile : gouttière `space-4`, barre d'onglets en pied.
- Chaque écran de vision commence par `PrototypeBanner` (« Prototype de vision – données fictives »).

## États et interactions

- Focus clavier : anneau `focus` (alias de `bleu`) de 2px, décalé de 2px, sur tous les contrôles.
- Survol : bouton primaire en `bleu-press` ; secondaire et fantôme sur `paper-deep` ; carte de tâche en `shadow-lift`.
- Tâche sélectionnée : contour `bleu`. Tâche faite : titre en `ink-3`, pastille `vert`.
- Désactivé : opacité 45 %, curseur interdit.
- Transitions courtes (150ms) sur la couleur et l'ombre uniquement.

## Iconographie

- Jeu d'icônes linéaires propre au système (`Icon`) : grille 24px, trait 1,75 arrondi, `currentColor`. Pas de bibliothèque tierce.
- Chaque domaine a son icône : cube, users, scale, euro, megaphone, code, sliders, eye.
- `sparkle` (pleine) désigne exclusivement le copilote IA ; `alert` désigne exclusivement « Souvent oubliée ».

## Logo

- Logotype « BuildOS » en Schibsted Grotesk ExtraBold vectorisée : « Build » en `ink`, « OS » en `bleu`. Monogramme « B. » dans un carré `bleu` pour l'icône d'application.
- Fichiers dans le groupe Logos ; en code, utiliser `Logo` (variantes `full` / `icon`, tons `color` / `ink` / `reverse`).

## Composants et écrans

- Composants : `Button`, `Input`, `TaskCard`, `ForgottenBadge`, `DomainHeader`, `TaskStatus`, `ChatBubble` (demandés), plus `ProgressBar`, `PrototypeBanner`, `Logo`, `Icon` et `AppShell`, ajoutés parce que les écrans en ont besoin.
- Écrans de vision : Accueil, Plan, Détail d'une tâche, Tableau de bord en desktop ; Accueil et Plan en mobile. Ils utilisent les données fictives `BuildOS.Demo` (projet Créno Vélo : réservation de réparateurs vélo à domicile à Lyon).
- Les composants attendent React 18 sur la page et s'exposent sous `window.BuildOS`.
