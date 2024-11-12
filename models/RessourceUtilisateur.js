/**
 * @file RessourceUtilisateur.js
 * 
 * @class       RessourceUtilisateur
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre une ressource et un utilisateur,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'RessourceUtilisateur' dans la base de données SQL.
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
const Utilisateur = require('./Utilisateur');

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
    
    indexes: [
        {
            unique: true,
            fields: ['IdRessource', 'IdUtilisateur']
        }
    ]
});

module.exports = RessourceUtilisateur;