/**
 * @file TypeAuthorisation.js
 * 
 * @class       TypeAuthorisation
 * @extends     Model
 * @summary     Modèle de données représentant un type d'authorisation,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'TypeAuthorisation' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un type d'authorisation ainsi que la relation
 *              OneToMany avec l'entité Utilisateur.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    Utilisateur Modèle Sequelize pour la table des utilisateurs
 * @see         Utilisateur.js
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

const Utilisateur = require('./Utilisateur');

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
//Relation OneToMany avec Utilisateur (un utilisateur à un seul type d'authorisation)
TypeAuthorisation.hasMany(Utilisateur, { foreignKey: 'IdAuthorisation' });
module.exports = TypeAuthorisation;
