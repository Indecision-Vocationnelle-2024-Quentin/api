/**
 * @file TypeUtilisateur.js
 * 
 * @class       TypeUtilisateur
 * @extends     Model
 * @summary     Modèle de données représentant un type d'utilisateur,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'TypeUtilisateur' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un type d'utilisteur.
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

class TypeUtilisateur extends Model { }

TypeUtilisateur.init({
    IdTypeUtilisateur: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type: {
        type: DataTypes.STRING(75),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TypeUtilisateur'
    
});
module.exports = TypeUtilisateur;