# AppShell

Le cadre de l'application : barre latérale `paper-deep` (logo, projet, navigation, domaines), barre supérieure (fil d'Ariane, accès au copilote, actions) et zone de contenu.

- Le consommateur fournit `active` (rubrique), `domain` (domaine mis en avant), `crumbs`, `actions` (au plus un bouton `primary` `sm`) et le contenu.
- Les compteurs de domaines viennent des données du projet (`BuildOS.Demo` dans le prototype).
- Desktop uniquement : en mobile, utiliser une barre d'en-tête et une barre d'onglets (voir l'écran Plan mobile).
