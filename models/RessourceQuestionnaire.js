/**
 * @file RessourceQuestionnaire.js
 * 
 * @class       RessourceQuestionnaire
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre une ressource et un questionnaire,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'RessourceQuestionnaire' dans la base de données SQL.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @version     1.1
 * @created        26/10/2024
 * 
 * @property   Cégep de Rivière-du-Loup
 * 
 * @author      Quentin Lecourt
 */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

const Ressource = require('./Ressource');
const Questionnaire = require('./Questionnaire');

class RessourceQuestionnaire extends Model { }

RessourceQuestionnaire.init({
    IdRessourceQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdRessource: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdQuestionnaire: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'RessourceQuestionnaire',
    
    indexes: [
        {
            unique: true,
            fields: ['IdRessource', 'IdQuestionnaire']
        }
    ]
});


module.exports = RessourceQuestionnaire;