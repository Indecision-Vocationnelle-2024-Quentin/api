/**
 * @file Action.js
 * 
 * @class       Action
 * @extends     Model
 * @summary     Modèle de données représentant une action, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Action' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'une action ainsi que la relation
 *              OneToMany avec l'entités TypeQuestionnaire.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    TypeQuestionnaire Modèle Sequelize pour la table des types de questionnaires
 * @see         TypeQuestionnaire.js
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

const TypeQuestionnaire = require('./TypeQuestionnaire');

class Questionnaire extends Model { }

Questionnaire.init({
    IdQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdTypeQuestionnaire: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Titre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(600),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Questionnaires',
    timestamps: false
});
//Relation ManyToMany avec Question
Questionnaire.belongsToMany(Questions, {
    through: 'QuestionQuestionnaire',
    foreignKey: 'IdQuestionnaire'
});
//Relation OneToMany avec Les TypeQuestionnaire
Questionnaire.belongsTo(TypeQuestionnaire, { foreignKey: 'IdTypeQuestionnaire' })



module.exports = Questionnaire;
