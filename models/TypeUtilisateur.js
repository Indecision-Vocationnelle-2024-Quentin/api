/**
 * @file TypeUtilisateur.js
 * 
 * @class       TypeUtilisateur
 * @extends     Model
 * @summary     Modèle de données représentant un type d'utilisateur,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'TypeUtilisateur' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un type d'utilisteur ainsi que la relations
 *              OneToMany avec l'entités Utilisateur.
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
    modelName: 'TypeUtilisateurs',
    timestamps: false
});
TypeUtilisateur.belongsToMany(Utilisateur, {
    through: 'UtilisateurTypeUtilisteur',
    foreignKey: 'IdTypeUtilisateur'
})
module.exports = TypeUtilisateur;
