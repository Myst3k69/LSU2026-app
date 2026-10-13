# Button

Le bouton d'action, presque carré (radius-xs), en Schibsted Grotesk 600.

- `primary` (aplat `bleu`, texte `on-bleu`) : l'action qui fait avancer l'écran — « Générer mon plan », « Marquer comme faite ». Une seule par vue.
- `ink` (aplat `ink`) : action forte qui n'est pas l'action principale, ou action principale d'un encadré coloré.
- `secondary` (contour `ink` 1,5px) : alternatives — « Reporter », « Voir un exemple ».
- `ghost` : actions tertiaires dans une liste.
- Tailles : `lg` (56px) pour l'accueil, `md` (44px) par défaut, `sm` (32px) dans les barres d'outils et les cartes.
- Le consommateur fournit le libellé (verbe à l'infinitif) et éventuellement `icon` / `iconLeft`. La flèche `arrow-right` signale une progression.
- Focus : anneau `focus` 2px décalé de 2px. Ne pas retirer l'outline.
