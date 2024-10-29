/**
 * @file models.js
 *
 * @summary     Appel de tous les models dans un ordre particulier pour initialisation du programme
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @version     1.0
 * @created  29/10/2024
 * 
 * @property   Cégep de Rivière-du-Loup
 * 
 * @author      Quentin Lecourt
 */
const Action = require('./Action');
const Facteur = require('./Facteur');
const Question = require('./Question');
const Questionnaire = require('./Questionnaire');
const Ressource = require('./Ressource');
const TypeAuthorisation = require('./TypeAuthorisation');
const TypeQuestion = require('./TypeQuestion');
const TypeQuestionnaire = require('./TypeQuestionnaire');
const TypeUtilisateur = require('./TypeUtilisateur');
const Utilisateur = require('./Utilisateur');

//Table de jointure
const ActionQuestionnaire = require('./ActionQuestionnaire');
const ActionUtilisateur = require('./ActionUtilisateur');

const QuestionQuestionnaire = require('./QuestionQuestionnaire');
const QuestionUtilisateur = require('./QuestionUtilisateur');

const RessourceQuestionnaire = require('./RessourceQuestionnaire');
const RessourceUtilisateur = require('./RessourceUtilisateur');

const UtilisateurType = require('./UtilisateurType');

// Associe les modèles entre eux
require('./associations');