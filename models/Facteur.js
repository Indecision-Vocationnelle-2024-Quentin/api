/**
 * @file Facteur.js
 * 
 * @class       Facteur
 * @extends     Model
 * @summary     Modèle de données représentant un facteur, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Facteur' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un facteur.
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

class Facteur extends Model { }

Facteur.init({
    IdFacteur: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Lettre: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Facteur',
    timestamps: false
});

module.exports = Facteur;