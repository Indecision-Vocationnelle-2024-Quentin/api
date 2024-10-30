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
 * @requires    Ressource  Modele des Ressources
 * @see         Ressource.js
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
//Relation ManyToMany entre Ressource et Questionnaire
Ressource.belongsToMany(Questionnaire, {
    through: 'RessourceQuestionnaire',
    foreignKey: 'IdRessource'
});
Questionnaire.belongsToMany(Ressource, {
    through: 'RessourceQuestionnaire',
    foreignKey: 'IdQuestionnaire'
});

module.exports = RessourceQuestionnaire;