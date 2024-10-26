/**
 * @file RessourceUtilisateur.js
 * 
 * @class       RessourceUtilisateur
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre une ressource et un utilisateur,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'RessourceUtilisateur' dans la base de données SQL.
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

class RessourceUtilisateur extends Model { }

RessourceUtilisateur.init({
    IdRessourceReponse: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdRessource: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdUtilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Reponse: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'RessourceUtilisateur',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['IdRessource', 'IdUtilisateur']
        }
    ]
});

module.exports = RessourceUtilisateur;
