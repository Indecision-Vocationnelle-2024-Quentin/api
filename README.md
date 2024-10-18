# Indécision vocationnelle

Ce projet est une API construite avec Node.js. Pour commencer à l'utiliser, suivez les instructions ci-dessous.

La première version a été écrite par Rino à l'hiver 2024 pour son ptojet ESP
Elle a été modifié par Alain pour permettre de l'utiliser et en faire une version qui sera améliorée par les étudiants de l'A2024

Pour plus d'informations, lire le document : userGuide.pdf

## Prérequis

- Visual Studio Code (avec REST client)
- Git
- Node.js (avec npm et chocolatery)
- MongoDB (avec MongoDB Compass) et ajouter le répertoire bin dans le PATH
- Postman (et créer un compte)


## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Importer les données
```bash
  o	Creer la base de données (mongodb) avec Compass (ou autre) : (nom : apiVocation)
  o	Créer les 4 collections
    	USERS
    	QUESTIONNAIRE_MOYENS_POUR_REUSSIR
    	QUESTIONNAIRE_MON_PROGRAMME_ETUDE
    	QUESTIONNAIRE_MON_CHOIX_PROGRAMME
```
7. Naviguez jusqu'au répertoire du projet dans votre terminal.
8. Installez les dépendances du projet en exécutant la commande suivante :

```bash
npm i
```
ou
```bash
npm install
```

## Configuration

Ce projet utilise des variables d'environnement pour la configuration. Vous devez créer un fichier .env à la racine du projet et y définir les variables d'environnement suivantes :

```bash
CREATION_PASS = "votre_mot_de_passe_secret"
CREATION_EMAIL = "votre_courriel_secret"
ACCESS_TOKEN_SECRET = "votre_cle_secret"
BEARER_TOKEN_EXPIRE = "2h" // peut etre en minute, heure, jour mois...
DB_URL=mongodb://localhost:27017/base_de_donnees // specifiez vos valeurs
PORT=3001 // exemple, spécifier votre port à vous
```

Remplacez les valeurs par ceux qui correspondent à votre réalité

## Lancer le service

```bash
  node app.js
```


## Utilisation
Une fois l'API démarrée, vous pouvez envoyer des requêtes HTTP à http://localhost:3001


## Documentation de l'API

Une fois l'API démarrée, vous pouvez demander sa documentation à http://localhost:3001/myApiDocs

# Collaboration

n'hésitez pas à faire un issue ou une pull request de vos modification !
