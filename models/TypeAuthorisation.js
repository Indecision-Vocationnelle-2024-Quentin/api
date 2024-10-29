/**
 * @file TypeAuthorisation.js
 * 
 * @class       TypeAuthorisation
 * @extends     Model
 * @summary     Modèle de données représentant un type d'authorisation,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'TypeAuthorisation' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un type d'authorisation.
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

class TypeAuthorisation extends Model { }

TypeAuthorisation.init({
    IdTypeAuthorisation: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TypeAuthorisation',
    timestamps: false
});

module.exports = TypeAuthorisation;