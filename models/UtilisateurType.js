/**
 * @file UtilisateurType.js
 * 
 * @class       UtilisateurType
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre un utilisateur et son type,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'UtilisateurType' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux de la relation.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    TypeUtilisateur  Modele des TypeUtilisateurs
 * @see         TypeUtilisateur.js
 * 
 * @requires    Utilisateur  Modele des Utilisateurs
 * @see         Utilisateur.js
 * 
 * @version     2.1
 * @created  26/10/2024
 * 
 * @updated  29/20/2024
 * @details      Changement de nom (trop long)
 * 
 * @property   Cégep de Rivière-du-Loup
 * 
 * @author      Quentin Lecourt
 */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

const Utilisateur = require('./Utilisateur');
const TypeUtilisateur = require('./TypeUtilisateur');

class UtilisateurType extends Model { }

UtilisateurType.init({
    IdUtilisateurType: {
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
    modelName: 'UtilisateurType',
    
    indexes: [
        {
            unique: true,
            fields:['IdTypeUtilisateur', 'IdUtilisateur']
        }
    ]
});
//Relation ManyToMany entre Ressource et Questionnaire
Utilisateur.belongsToMany(TypeUtilisateur, {
    through: 'UtilisateurType',
    foreignKey: 'IdUtilisateur'
});
TypeUtilisateur.belongsToMany(Utilisateur, {
    through: 'UtilisateurType',
    foreignKey: 'IdTypeUtilisateur'
});

module.exports = UtilisateurType;