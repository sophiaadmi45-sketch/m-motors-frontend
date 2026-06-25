# M-Motors - Application Client (React)

Ce dépôt contient l'interface utilisateur web (Front-End) de la solution de refonte digitale de M-Motors, permettant une expérience client fluide pour la recherche de véhicules, la soumission et le suivi de dossiers dématérialisés.

## 🛠️ Stack Technique & Outils Utilisés
* **Framework :** React (Vite)
* **Navigation :** React Router DOM
* **Design & Responsive :** CSS Mobile-First
* **Déploiement :** Render Cloud Services

---

## 🌿 Stratégie de Gestion des Branches Git
Pour garantir la qualité et la traçabilité du code, nous appliquons un flux de travail structuré inspiré de Git Flow, basé sur l'isolation stricte de chaque fonctionnalité :

* **`main` (Branche principale) :** Contient le code stable et validé en production. Chaque fusion validée sur cette branche déclenche le déploiement continu vers le serveur de production Render.
* **Branches `feature/us-XXX` (Branches de fonctionnalités) :** Pour chaque User Story spécifiée sur Trello, une branche éphémère dédiée a été créée afin de garantir l'étanchéité du code en cours de développement.

### Historique des branches vérifiable sur ce dépôt Front-End :
* `feature/us-001-inscription` (US-001 - Inscription client)
* `feature/us-002-connexion` (US-002 - Connexion client)
* `feature/us-003-frontend` / `feature/us-003-vehicle-search` (US-003 - Recherche de véhicules)
* `feature/us-004-vehicle-detail` (US-004 - Détail véhicule)
* `feature/us-005-depot-dossier` (US-005 - Dépôt de dossier)
* `feature/us-006-suivi-dossier` (US-006 - Suivi de mon dossier)
* `feature/us-007-back-vehicules` (US-007 - Ajout / Modification véhicule)
* `feature/us-008-front-finalisation` / `feature/us-008-validation-backoffice` (US-008 - Visualisation et validation des dossiers)

---

## 🔄 Démarche de Développement d'une User Story (Agile)
Chaque fonctionnalité suit un cycle de vie strict pour valider les critères de la *Definition of Done* (DoD) :
1. **Spécification :** Analyse des critères d'acceptation de la User Story sur Trello.
2. **Isolation :** Création et bascule sur la branche locale correspondante `feature/us-XXX`.
3. **Implémentation :** Écriture des composants React et intégration des règles de responsive design.
4. **Validation :** Exécution des tests unitaires sur les composants critiques (objectif de 80% de couverture minimum).
5. **Merge & Déploiement :** Fusion de la fonctionnalité dans `main` et vérification du comportement en ligne sur Render.

---

## 🌐 Externalisation et Configuration Dynamique des API
Pour se conformer aux bonnes pratiques architecturales et assurer la maintenabilité de la solution lors d'une opération "Move to Cloud", **aucune URL de service n'est écrite en dur dans les composants fonctionnels** :
* La racine de l'API est externalisée de manière unique dans une constante `API_BASE_URL` au sein du fichier `config.js`.
* Tous les composants importent cette variable pour exécuter leurs requêtes `fetch` de manière invariable.
* En cas de migration d'infrastructure, le changement d'adresse s'opère en une seule fois sans modification du code source.

---

## 📱 Conception Mobile-First & Navigation Adaptative
L'architecture CSS a été entièrement pensée suivant une méthodologie rigoureuse en **Mobile-First** afin d'éradiquer les chevauchements d'éléments sur petits écrans :
* **Sur Mobile :** Les éléments de la barre d'outils et de navigation (`.nav-top-row` et `.nav-links-row`) s'empilent verticalement. Les e-mails utilisateurs s'adaptent avec une règle `word-break: break-all` pour préserver l'intégrité de la mise en page.
* **Sur Écrans Larges (Tablettes & PC) :** Via l'usage ciblé de requêtes de médias (`@media (min-width: 48rem)`), la mise en page bascule horizontalement en `flex-direction: row`.

---

## 🧪 Lancement des Tests Unitaires
Pour exécuter la suite de tests unitaires de l'interface React, le fichier principal concerné pour la validation de la connexion est **`Login.test.jsx`**. Lancez la commande suivante dans votre terminal :

```bash
npm run test