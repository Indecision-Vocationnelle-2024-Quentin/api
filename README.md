# Indécision vocationnelle

Cette API appartient au projet indecision vocationnelle. 
Ecrit dans un premier temps par Rino Gamache, le projet à été repris par les étudiants de 3 ème annéee (2024)
Celui-ci est retouché par Quentin Lecourt

## Prérequis

- Visual Studio Code (avec REST client)
- Git
- Node.js (avec npm et chocolatery)
- Un SGBD MySQL (en utilisant Sequelize) et ajouter le répertoire bin dans le PATH
- Comprendre les conceptes de JSON WEB Token.
- Postman (et créer un compte)


## Configuration

Ce projet utilise des variables d'environnement pour la configuration. Vous devez créer un fichier .env à la racine du projet et y définir les variables d'environnement suivantes :

```bash
CREATION_PASS = "votre_mot_de_passe_secret"
CREATION_EMAIL = "votre_courriel_secret"
ACCESS_TOKEN_SECRET = "votre_cle_secret"
BEARER_TOKEN_EXPIRE = "2h" // peut etre en minute, heure, jour mois...
PORT=3001 // exemple, spécifier votre port à vous
#Séction de la base de données
DB_HOST = "localhost"
DB_NAME = "bdd_dev"
DB_USER = "usagerDeLaBDD"
DB_PWRD = "motDePasse"
SGBD    = "mysql"
```

Remplacez les valeurs par ceux qui correspondent à votre réalité

## Modification
# 18 octobre 2024
- Initialisation et remise en fonction de l'API avec Mongo
- Mise à jour de l'arborescence

# 21 octobre 2024
- Adaptation du controleur user
- Le login est foctionnel

# 24 octobre 2024
- Ecriture de tous les autres modeles
- Test et debug des nouveaux modeles

# 30 octobre 2024
- Maj variable environemment
- Suppression de mongo et passage concrait à mySql
- Début du controleur pour le questionnaireVraiFaux
