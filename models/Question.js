/**
 * @file Question.js
 * 
 * @class       Question
 * @extends     Model
 * @summary     Modèle de données représentant une question, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Question' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'une question ainsi que les relations
 *              ManyToMany et OneToMany avec d'autres entités comme Utilisateur, TypeQuestion, et Facteur.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    Utilisateur  Modèle Sequelize pour la table des utilisateurs
 * @see         Utilisateur.js
 * 
 * @requires    Questionnaire  Modèle Sequelize pour la table des questionnaires
 * @see         Questionnaire.js
 * 
 * @requires    TypeQuestion Modèle Sequelize pour la table des types de questions
 * @see         TypeQuestion.js
 * 
 * @requires    Facteur      Modèle Sequelize pour la table des facteurs
 * @see         Facteur.js
 * 
 * @version     1.0
 * @date        26/10/2024
 * 
 * @propriete   Cégep de Rivière-du-Loup
 * 
 * @author      Quentin Lecourt
 */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

const TypeQuestion = require('./TypeQuestion');
const Facteur = require('./Facteur');
const Utilisateur = require('./Utilisateur');
const Questionnaire = require('./Questionnaire');

class Question extends Model { }

Question.init({
    IdQuestion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdTypeQuestion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdFacteur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Question: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
    },
    Exemple: {
        type: DataTypes.STRING(450),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Questions',
    timestamps: false
});

//Relation ManyToMany avec Questionnaires
Question.belongsToMany(Questionnaire, {
    through: 'QuestionQuestionnaire',
    foreignKey: 'IdQuestion'
});
//Relation ManyToMany avec Utilisateur
Question.belongsToMany(Utilisateur, {
    through: 'QuestionUtilisateur',
    foreignKey: 'IdQuestion'
});

//Relation OneToMany avec TypeQuestion
Question.belongsTo(TypeQuestion, { foreignKey: 'IdTypeUtilisateur' });
//Relation OneToMany avec Facteur
Question.belongsTo(Facteur, { foreignKey: 'IdFacteur' });

module.exports = Question;
