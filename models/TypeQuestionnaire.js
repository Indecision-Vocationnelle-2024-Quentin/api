/**
 * @file TypeQuestionnaire.js
 * 
 * @class       TypeQuestionnaire
 * @extends     Model
 * @summary     Modèle de données représentant un type de questionnaire, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'TypeQuestionnaire' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un type de questionnaire ainsi que la relation
 *              OneToMany avec l'entités Questionnaire.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    Questionnaire Modèle Sequelize pour la table des questionnaires
 * @see         Questionnaire.js
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

const Questionnaire = require('./Questionnaire');

class TypeQuestionnaire extends Model { }

TypeQuestionnaire.init({
    IdTypeQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TypeQuestionnaires',
    timestamps: false
});
TypeQuestionnaire.hasMany(Questionnaire, { foreignKey: 'IdTypeQuestionnaire' });
module.exports = TypeQuestionnaire;
