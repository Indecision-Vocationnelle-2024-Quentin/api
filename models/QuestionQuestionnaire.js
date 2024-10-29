/**
 * @file QuestionQuestionnaire.js
 * 
 * @class       QuestionQuestionnaire
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre une question et un questionnaire,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'QuestionQuestionnaire' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux de la relation.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    Question  Modele des Questions
 * @see         Question.js
 * 
 * @requires    Questionnaire  Modele des Questionnaire
 * @see         Questionnaire.js
 * 
 * @version     1.0
 * @created        26/10/2024
 * 
 * @property   Cégep de Rivière-du-Loup
 * 
 * @author      Quentin Lecourt
 */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

const Question = require('./Question');
const Questionnaire = require('./Questionnaire');

class QuestionQuestionnaire extends Model { }

QuestionQuestionnaire.init({
    IdQuestionQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdQuestion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdQuestionnaire: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'QuestionQuestionnaire',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['IdQuestion', 'IdQuestionnaire']
        }
    ]
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

module.exports = QuestionQuestionnaire;