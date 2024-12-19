# Projet Leboncoin

Une application pour gérer les annonces et les utilisateurs.

## Installation

### Prérequis

- Node.js version 14 ou supérieure
- npm version 6 ou supérieure

### Étapes d'installation

1. **Cloner le dépôt :**

```bash
git clone [url-du-dépôt]
```

2. Accéder au dossier du projet

```bash
cd project_leboncoin
```

3. Installer les dépendances 

```bash
cd backend
npm install
cd ../frontend
npm install
```

4. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet et ajoutez-y les variables nécessaires.

5. Démarrer les serveurs

Ouvrez deux terminaux et lancez le serveur et le frontend.

```bash
npm run dev
```

Lien front: http://localhost:3000  
Lien API: http://localhost:8081

## Routes API

### Routes pour les utilisateurs

- `GET /` - Récupère tous les utilisateurs
- `GET /me` - Récupère l'utilisateur connecté (nécessite une authentification)
- `GET /:id` - Récupère un utilisateur par son ID (nécessite une authentification)
- `POST /register` - Enregistre un nouvel utilisateur
- `POST /login` - Connecte un utilisateur
- `PATCH /` - Modifie les informations de l'utilisateur connecté (nécessite une authentification)
- `DELETE /` - Supprime l'utilisateur connecté (nécessite une authentification)

### Routes pour les annonces

- `GET /` - Récupère toutes les annonces
- `GET /:id` - Récupère une annonce par son ID
- `POST /` - Crée une nouvelle annonce (nécessite une authentification)
- `PATCH /:id` - Modifie une annonce par son ID (nécessite une authentification)
- `DELETE /:id` - Supprime une annonce par son ID (nécessite une authentification)
