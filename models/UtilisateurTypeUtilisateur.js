/**
 * @file UtilisateurTypeUtilisateur.js
 * 
 * @class       UtilisateurTypeUtilisateur
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre un utilisateur et son type,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'UtilisateurTypeUtilisateur' dans la base de données SQL.
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

class UtilisateurTypeUtilisateur extends Model { }

UtilisateurTypeUtilisateur.init({
    IdUtilisateurTypeUtilisateur: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdTypeUtilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdUtilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'UtilisateurTypeUtilisateur',
    timestamps: false,
    indexes: [
        {
            unique: ['IdTypeUtilisateur', 'IdUtilisateur']
        }
    ]
});

module.exports = UtilisateurTypeUtilisateur;
