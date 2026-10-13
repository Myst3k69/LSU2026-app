# Input

Champ de saisie : une ligne, ou zone de texte avec `multiline`.

- Fond `surface`, bordure `line-control` 1,5px, radius-sm ; au focus, bordure et anneau `bleu`.
- `label` s'affiche en capitales `label` couleur `ink-3` ; sans label, fournir `aria-label`.
- `size="lg"` + `multiline` : la zone « Décrivez votre projet » de l'accueil (texte `body-l`).
- `footer` place une barre dans le cadre, sous la saisie : puces de complétude, compteur, bouton « Générer mon plan » ou « Envoyer ».
- `hint` pour une aide d'une phrase. Pas d'état d'erreur rouge dans ce système : une erreur s'écrit dans le hint.
