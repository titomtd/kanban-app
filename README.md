# Kanban App

Voici l'application pour l'api du Kanban développée sous Spring Boot.

La page d'accueil affiche tous les tableaux créés tout en offrant la possibilité d'en créer des nouveaux. Sur cette même page, il y a un menu à gauche qui permet d'accéder à l'onglet des différents utilisateurs et de gérer les différents tags présents dans l'application.

La page des utilisateurs utilise le même fonctionnement que la page d'accueil. On y découvre tous les utilisateurs de l'application. On peut en créer, les modifier ou les supprimer.

Via la page d'accueil, si on clique sur "Voir plus" via la carte d'un tableau, on accède aux détails d'un tableau avec les différents sections et leurs fiches associées. On peut créer une nouvelle section, les modifier ou les supprimer. Ensuiite, dans l'entente d'une section, on peut créer une carte qui sera ajouté dans la section selectionnée. Une fois ajoutée, la fiche est affichée, on peut la modifier ou la supprimer.

Important : Je n'ai pas trouvé le temps pour ajouter la possibilité à une fiche de changer de section. Cette fonctionnalité possède déjà une route côté API associée, mais le fait de vouloir l'implémenter via un drag and drop a fait que le temps m'avait manqué.
