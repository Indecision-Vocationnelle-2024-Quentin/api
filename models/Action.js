/**
 * @file Action.js
 * 
 * @class       Action
 * @extends     Model
 * @summary     Modèle de données représentant une action, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Action' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'une action.
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

class Action extends Model { }

Action.init({
    IdAction: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdFacteur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Action: {
        type: DataTypes.STRING(300),
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Action',
    timestamps: false
});

module.exports = Action;