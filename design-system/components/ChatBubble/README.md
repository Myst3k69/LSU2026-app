# ChatBubble

Une bulle de la conversation avec le copilote IA, rattachée à une tâche.

- `from="user"` : aplat `ink`, texte `surface`, aligné à droite, coin bas-droit en radius-xs.
- `from="ai"` : fond `bleu-soft`, texte `ink`, avatar étincelle `bleu`, aligné à gauche.
- L'en-tête porte l'auteur en capitales et l'heure. Le consommateur fournit le contenu (paragraphes, listes, carte de document).
- `actions` ajoute des boutons `secondary` `sm` sous une réponse (« Ouvrir les CGU », « Générer »).
- Une réponse juridique ou fiscale rappelle de faire valider par un professionnel.
