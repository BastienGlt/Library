# 📚 Library - Bibliothèque Municipale

Application web de gestion et de recherche de livres développée avec React et TypeScript, utilisant l'API Open Library.

Disponnible en ligne : https://libraryvercel-2irn.vercel.app

## 🎯 Description du Projet

Ce projet est une application frontend moderne permettant aux utilisateurs de :
- Parcourir les derniers livres ajoutés à la bibliothèque
- Rechercher des livres par titre, auteur, sujet et année de publication
- Consulter les détails complets d'un livre (description, auteurs, éditions, etc.)
- Visualiser les informations enrichies via l'API Wikipedia
- Profiter d'une interface responsive avec thème clair/sombre

## ✨ Fonctionnalités Principales

### 🏠 Page d'Accueil
- Affichage des derniers livres ajoutés
- Interface Hero accueillante
- Navigation rapide vers la recherche avancée

### 🔍 Recherche Avancée
- Recherche par mots-clés
- Filtres multiples : auteur, titre, sujet, langue
- Filtrage par période de publication (année de début et de fin)
- Tri des résultats (récent, ancien, aléatoire)
- Pagination des résultats
- Debouncing pour optimiser les performances

### 📖 Page de Détail
- Informations complètes sur le livre
- Biographie de l'auteur via Wikipedia
- Couvertures en différentes tailles

### 🎨 Interface Utilisateur
- Design moderne et responsive (mobile, tablette, desktop)
- Thème clair/sombre persistant
- Animations fluides
- Gestion des états de chargement et d'erreur
- Cartes de livres interactives

## 🛠️ Technologies Utilisées

### Frontend
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **React Router 7** - Navigation et routing

### Gestion d'État
- **TanStack Query (React Query)** - Gestion du cache et des requêtes API
- **Jotai** - Gestion d'état atomique (thème)

### Styling
- **Tailwind CSS 4** - Framework CSS utilitaire
- **Lucide React** - Icônes

### Développement & Tests
- **ESLint** - Linting du code
- **Playwright** - Tests end-to-end
- **MSW (Mock Service Worker)** - Mocking des API pour les tests

### Utilitaires
- **use-debounce** - Optimisation de la recherche

## 📁 Architecture du Projet

```
src/
├── components/        # Composants réutilisables (Button, BookCard, SearchBar, etc.)
├── config/           # Configuration des dev tools et mode développeur
├── hooks/            # Custom hooks (useBookSearch, useBookDetail, useTheme, etc.)
├── layout/           # Composants de mise en page (Header, Footer, Layout)
├── lib/              # Utilitaires et configurations
├── mocks/            # Configuration MSW pour les tests
├── pages/            # Pages de l'application (Home, Search, BookDetail, NotFound)
├── services/         # Services API (book.service, wikipedia.service)
├── store/            # Gestion d'état globale (Jotai atoms pour le thème)
├── types/            # Définitions TypeScript
└── routes.ts         # Configuration du routeur
```

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 18 ou supérieure recommandée)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone https://github.com/BastienGlt/Library.git

# Accéder au dossier
cd Library

# Installer les dépendances
npm install
```

### Lancement en développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`

## 🧪 Tests

Le projet utilise Playwright pour les tests end-to-end.

```bash
# Lancer les tests
npm run test

# Lancer les tests avec interface UI
npm run test:ui

# Lancer les tests en mode visible
npm run test:headed

# Déboguer les tests
npm run test:debug
```

## 📡 APIs Utilisées

### Open Library API
- **Base URL** : `https://openlibrary.org`
- **Endpoints** :
  - `/search.json` - Recherche de livres
  - `/works/{id}.json` - Détails d'une œuvre
  - `/authors/{id}.json` - Informations auteur
  - `/recentchanges.json` - Derniers changements

### Wikipedia API
- **Base URL** : `https://en.wikipedia.org/api/rest_v1`
- **Endpoint** :
  - `/page/summary/{title}` - Résumé d'une page Wikipedia

## 🎨 Fonctionnalités Techniques

### Optimisations
- **React Query** : Cache automatique des requêtes, refetch intelligent
- **Debouncing** : Optimisation de la barre de recherche (500ms)
- **Code splitting** : Chargement optimisé des composants
- **Lazy loading** : Chargement différé des images

### Gestion des Erreurs
- Messages d'erreur personnalisés
- Fallbacks pour les images manquantes
- Gestion des 404
- États de chargement visuels

## 🎓 Concepts React Utilisés

- **Custom Hooks** : Réutilisation de la logique métier
- **Context API** : Non utilisé, remplacé par Jotai pour une meilleure performance
- **React Router 7** : Routing moderne avec data loading
- **Composition de composants** : Architecture modulaire
- **TypeScript strict** : Typage fort pour éviter les bugs
- **Suspense & Error Boundaries** : Gestion asynchrone élégante

## 📊 Gestion d'État

### TanStack Query
- Cache des requêtes API
- Invalidation automatique
- Background refetching
- Optimistic updates

### Jotai
- Gestion du thème (clair/sombre)
- Persistance dans le localStorage
- État atomique léger et performant

## 🔧 Configuration

### Mode Développeur
L'application dispose d'un mode développeur configurable via le fichier `src/config/devTools.ts` qui permet d'activer :
- **React Query DevTools** : Interface de débogage pour visualiser l'état du cache, les requêtes en cours, et les données mises en cache
- **MSW (Mock Service Worker)** : Système de mock des APIs pour le développement et les tests

Pour activer/désactiver ces outils en développement, modifiez les paramètres dans le fichier de configuration.

### Variables d'Environnement
Aucune variable d'environnement n'est requise. Les URLs des APIs sont codées en dur dans les services.

### Configuration TypeScript
- Mode strict activé
- Path aliases configurés (`@/`, `@pages/`, etc.)
- Types générés automatiquement

## 🐛 Problèmes Connus et Limitations

- L'API Open Library peut être lente lors de certaines requêtes
- Certains livres n'ont pas de couverture disponible
- Les descriptions de livres ne sont pas toujours disponibles

## 👨‍💻 Auteur

Bastien Guillemet
Projet réalisé dans le cadre du cours de développement frontend React à SUPINFO.

## 📄 Licence

Ce projet est réalisé à des fins éducatives.

---

**Note** : Ce projet utilise les APIs publiques d'Open Library et Wikipedia qui sont gratuites et ne nécessitent pas de clé API.
