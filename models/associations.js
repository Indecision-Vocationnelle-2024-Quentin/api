/**
 * @file        associations.js
 * 
 * @summary     Définition des associations Sequelize entre les modèles de l'application.
 * 
 * @description Ce fichier gère les relations entre les modèles en configurant les associations
 *              Sequelize. Les associations incluent les relations `OneToMany` entre les entités.
 * 
 * @requires & @see   TypeQuestion.js       Modèle représentant les différents types de questions.
 * @requires & @see   TypeQuestionnaire.js  Modèle représentant les types de questionnaires.
 * @requires & @see   TypeUtilisateur       Modèle représentant les types d'utilisateurs.
 * @requires & @see   Facteur.js            Modèle pour les facteurs associés aux ressources et actions.
 * @requires & @see   Utilisateur.js        Modèle de gestion des utilisateurs de l'application.
 * @requires & @see   Questionnaire.js      Modèle pour les questionnaires créés et gérés.
 * @requires & @see   TypeAuthorisation.js  Modèle des types d'autorisations attribuées aux utilisateurs.
 * @requires & @see   Ressource.js          Modèle pour les ressources disponibles dans l'application.
 * @requires & @see   Action.js             Modèle pour les actions disponibles dans l'application.
 * @requires & @see   Question.js           Modèle pour les questions des différents questionnaires.
 * 
 * @version     1.1
 * @created     29/10/2024
 * @update      12/11/2024 -> Relation des tables de jointures 
 * 
 * @details     - Relation OneToMany entre `TypeAuthorisation` et `Utilisateur`
 *              - Relation OneToMany entre `TypeQuestion` et `Question`
 *              - Relation OneToMany entre `TypeQuestionnaire` et `Questionnaire`
 *              - Relation OneToMany entre `Facteur` et `Ressource`
 *              - Relation OneToMany entre `Facteur` et `Action`
 *              - Relation OneToMany entre `Facteur` et `Question`
 * 
 * @property    Cégep de Rivière-du-Loup
 * 
 * @note        Pour garantir la cohérence des relations, importer ce fichier avant toute
 *              synchronisation des modèles avec la base de données.
 * 
 *              Aussi, il est important que la relation hasMany soit appellé avant belongsTo
 *              Sinon, une erreur est generé, c'est pourquoi ce fichier existe et que les associations
 *              ne se trouvent plus dans les modeles eux meme (Ordre d'initialisation des modeles)
 * 
 * @author      Quentin Lecourt
 */
const TypeQuestion = require('./TypeQuestion');
const TypeQuestionnaire = require('./TypeQuestionnaire');
const TypeUtilisateur = require('./TypeUtilisateur');
const Facteur = require('./Facteur');
const Utilisateur = require('./Utilisateur');
const Questionnaire = require('./Questionnaire');
const TypeAuthorisation = require('./TypeAuthorisation');
const Ressource = require('./Ressource');
const Action = require('./Action');
const Question = require('./Question');

//Table de jointure
const ActionQuestionnaire = require('./ActionQuestionnaire');
const ActionUtilisateur = require('./ActionUtilisateur');

const QuestionQuestionnaire = require('./QuestionQuestionnaire');
const QuestionUtilisateur = require('./QuestionUtilisateur');

const RessourceQuestionnaire = require('./RessourceQuestionnaire');
const RessourceUtilisateur = require('./RessourceUtilisateur');

const UtilisateurType = require('./UtilisateurType');
//-----------------Relation OneToMany-----------------//
//Un utilisateur a un seul type d'authorisation
TypeAuthorisation.hasMany(Utilisateur, { foreignKey: 'IdAuthorisation' });
Utilisateur.belongsTo(TypeAuthorisation, { foreignKey: 'IdAuthorisation' });

//Une question a un seul type
TypeQuestion.hasMany(Question, { foreignKey: 'IdTypeQuestion' });
Question.belongsTo(TypeQuestion, { foreignKey: 'IdTypeQuestion' });

TypeQuestionnaire.hasMany(Questionnaire, { foreignKey: 'IdTypeQuestionnaire' });
Questionnaire.belongsTo(TypeQuestionnaire, { foreignKey: 'IdTypeQuestionnaire' });

//Une ressource a un facteur
Facteur.hasMany(Ressource, { foreignKey: 'IdFacteur' });
Ressource.belongsTo(Facteur, { foreignKey: 'IdFacteur' });

//Une Action a un facteur
Facteur.hasMany(Action, { foreignKey: 'IdFacteur' });
Action.belongsTo(Facteur, { foreignKey: 'IdFacteur' });

//Une Question a un facteur
Facteur.hasMany(Question, { foreignKey: 'IdFacteur' });
Question.belongsTo(Facteur, { foreignKey: 'IdFacteur' });

//Relation ManyToMany entre Action et Questionnaire
Action.belongsToMany(Questionnaire, {
    through: 'ActionQuestionnaire',
    foreignKey: 'IdAction'
});
Questionnaire.belongsToMany(Action, {
    through: 'ActionQuestionnaire',
    foreignKey: 'IdQuestionnaire'
});

//Relation ManyToMany Entre Action et Utilisateur
Action.belongsToMany(Utilisateur, {
    through: 'ActionUtilisateur',
    foreignKey: 'IdAction'
});
Utilisateur.belongsToMany(Action, {
    through: 'ActionUtilisateur',
    foreignKey: 'IdUtilisateur'
});

//Relation ManyToMany entre Question et Questionnaires
Question.belongsToMany(Questionnaire, {
    through: 'QuestionQuestionnaire',
    foreignKey: 'IdQuestion'
});
Questionnaire.belongsToMany(Question, {
    through: 'QuestionQuestionnaire',
    foreignKey: 'IdQuestionnaire'
});

// Relation Many-to-Many entre Question et Utilisateur via la table 'QuestionUtilisateur'
Question.belongsToMany(Utilisateur, {
    through: 'QuestionUtilisateur',
    foreignKey: 'IdQuestion',
    otherKey: 'IdUtilisateur'  // Définir explicitement la clé étrangère de l'autre modèle
});

Utilisateur.belongsToMany(Question, {
    through: 'QuestionUtilisateur',
    foreignKey: 'IdUtilisateur',
    otherKey: 'IdQuestion'  // Définir explicitement la clé étrangère de l'autre modèle
});

//Relation ManyToMany entre Ressource et Questionnaire
Ressource.belongsToMany(Questionnaire, {
    through: 'RessourceQuestionnaire',
    foreignKey: 'IdRessource'
});
Questionnaire.belongsToMany(Ressource, {
    through: 'RessourceQuestionnaire',
    foreignKey: 'IdQuestionnaire'
});

//Relation ManyToMany entre Ressource et Utilisateur
Ressource.belongsToMany(Utilisateur, {
    through: 'RessourceUtilisateur',
    foreignKey: 'IdRessource'
});
Utilisateur.belongsToMany(Ressource, {
    through: 'RessourceUtilisateur',
    foreignKey: 'IdUtilisateur'
});

//Relation ManyToMany entre Ressource et Questionnaire
Utilisateur.belongsToMany(TypeUtilisateur, {
    through: 'UtilisateurType',
    foreignKey: 'IdUtilisateur'
});
TypeUtilisateur.belongsToMany(Utilisateur, {
    through: 'UtilisateurType',
    foreignKey: 'IdTypeUtilisateur'
});

