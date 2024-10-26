/**
 * @file RessourceQuestionnaire.js
 * 
 * @class       RessourceQuestionnaire
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre une ressource et un questionnaire,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'RessourceQuestionnaire' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux de la relation.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
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
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['IdRessource', 'IdQuestionnaire']
        }
    ]
});

module.exports = RessourceQuestionnaire;
