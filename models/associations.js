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
 * @requires & @see   Facteur.js            Modèle pour les facteurs associés aux ressources et actions.
 * @requires & @see   Utilisateur.js        Modèle de gestion des utilisateurs de l'application.
 * @requires & @see   Questionnaire.js      Modèle pour les questionnaires créés et gérés.
 * @requires & @see   TypeAuthorisation.js  Modèle des types d'autorisations attribuées aux utilisateurs.
 * @requires & @see   Ressource.js          Modèle pour les ressources disponibles dans l'application.
 * @requires & @see   Action.js             Modèle pour les actions disponibles dans l'application.
 * @requires & @see   Question.js           Modèle pour les questions des différents questionnaires.
 * 
 * @version     1.0
 * @created     29/10/2024
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
const Facteur = require('./Facteur');
const Utilisateur = require('./Utilisateur');
const Questionnaire = require('./Questionnaire');
const TypeAuthorisation = require('./TypeAuthorisation');
const Ressource = require('./Ressource');
const Action = require('./Action');
const Question = require('./Question');
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








