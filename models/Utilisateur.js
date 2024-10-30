/**
 * @file Utilisateur.js
 * 
 * @class       Utilisateur
 * @extends     Model
 * @summary     Modèle de données représentant un utilisateur, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Utilisateur' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un utilisateur.
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

class Utilisateur extends Model { }

Utilisateur.init({
    UtilisateurId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Prenom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    IdAuthorisation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Courriel: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
    },
    MotDePasse: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Utilisateur'
    
});

module.exports = Utilisateur;
