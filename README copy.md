# Nom de Votre Projet

## Introduction
Bienvenue dans le projet XYZ ! Ce projet est une API Node.js avec une architecture modulaire pour la gestion de l'authentification des utilisateurs en utilisant JSON Web Tokens (JWT). Cette documentation vous guidera à travers l'architecture du projet, son installation et son utilisation de base.

## Architecture du Projet

Le projet suit une structure modulaire pour maintenir la clarté et la facilité d'extension. Voici une brève explication des différents dossiers et fichiers :

- **config/** : Contient les fichiers de configuration pour l'application, y compris la configuration de la base de données et la clé secrète JWT.
- **controllers/** : Gère la logique métier de l'application. Chaque fichier correspond généralement à une entité de l'API.
- **middleware/** : Contient les middlewares, tels que l'authentification JWT.
- **models/** : Définit la structure des données de l'application en utilisant Sequelize pour interagir avec la base de données MariaDB.
- **routes/** : Définit les points de terminaison de l'API en associant les routes aux contrôleurs correspondants.
- **services/** : Encapsule la logique métier réutilisable qui n'appartient pas directement aux contrôleurs.
- **app.js** : Le point d'entrée de l'application qui configure et lance le serveur.


## Configuration de l'environnement

1. Clonez ce référentiel sur votre machine locale.

   ```bash
      git clone https://github.com/MDS-NICE-B3-DEVWEB/Base_node_login.git
    ```

2. Installez les dépendances du projet.

   ```bash
      npm install
    ```

3. Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes.

   ```bash
      PORT=<port de votre application>
      DB_TYPE=<type de votre SGBD mysql,mariadb,postgresql etc...>
      DB_HOST=<hôte de votre base de données>
      DB_USER=<utilisateur de votre base de données>
      DB_PASS=<mot de passe de votre base de données>
      DB_NAME=<nom de votre base de données>
      JWT_SECRET=<clé secrète pour la génération des tokens JWT>
    ```

4. Créez une base de données MariaDB ou autre type de SGBD SQL avec le nom que vous avez spécifié dans le fichier `.env`.

5. Exécutez l'appication.

   ```bash
      npm start```


## Utilisation de l'API

1.Inscription d'un nouvel utilisateur :

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"username": "votre_nom_utilisateur", "password": "votre_mot_de_passe"}' http://localhost:3000/auth/register
    ```
    retourne un token JWT

2.Connexion d'un utilisateur :

    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"username": "votre_nom_utilisateur", "password": "votre_mot_de_passe"}' http://localhost:3000/auth/login
    ```

    retourne un token JWT

3. Tester l'authentification d'un utilisateur :

    ```bash
    curl -X GET -H "Authorization: Bearer VOTRE_TOKEN_JWT" http://localhost:3000/auth/protected
    ```
    retourne un message de succès si l'utilisateur est authentifié

