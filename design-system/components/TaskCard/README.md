# TaskCard

La carte d'une tâche du plan : case d'état, titre, statut, badge éventuel et une métadonnée.

- Le consommateur fournit `title`, `status` (`todo`, `done`, `postponed`), `forgotten`, `meta` (une seule info : échéance, ressources ou décision) et `onClick` pour la rendre cliquable.
- `domain` ajoute le nom du domaine en sur-titre : à utiliser seulement hors d'une section de domaine (tableau de bord, recherche).
- Faite : titre en `ink-3`, pastille `vert` cochée. Reportée : pastille `paper-deep`. À faire : cercle vide.
- `selected` entoure la carte de `bleu` (tâche ouverte dans le panneau de détail).
- `compact` réduit le padding pour les listes longues (plan, mobile).
- Jamais de bordure gauche colorée : l'information passe par le statut et le badge.
