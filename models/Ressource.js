/**
 * @file Ressource.js
 * 
 * @class       Ressource
 * @extends     Model
 * @summary     Modèle de données représentant une ressource, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Ressource' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'une ressource.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @version     1.1
 * @created  26/10/2024
 * 
 * @updated  29/20/2024
 * @details      Voir associations.js
 * 
 * @property   Cégep de Rivière-du-Loup
 * 
 * @author      Quentin Lecourt
 */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

const Facteur = require('./Facteur');
const Questionnaire = require('./Questionnaire');
const Utilisateur = require('./Utilisateur');

class Ressource extends Model { }

Ressource.init({
    IdRessource: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdFacteur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Ressource: {
        type: DataTypes.STRING(400),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Ressource'
    
});

module.exports = Ressource;