/**
 * @file ActionUtilisateur.js
 * 
 * @class       ActionUtilisateur
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre une action et un utilisateur,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'ActionUtilisateur' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux de la relation.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    Action  Modele des Actions
 * @see         Actions.js
 * 
 * @requires    Utilisateur  Modele des Utilisateurs
 * @see         Utilisateur.js
 * 
 * @version     1.0
 * @created        26/10/2024
 * 
 * @property   Cégep de Rivière-du-Loup
 * 
 * @author      Quentin Lecourt
 */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

const Action = require('./Action');
const Utilisateur = require('./Utilisateur');

class ActionUtilisateur extends Model { }

ActionUtilisateur.init({
    IdActionReponse: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdAction: {
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
    modelName: 'ActionUtilisateur',
    
    indexes: [
        {
            unique: true,
            fields: ['IdAction', 'IdUtilisateur']
        }
    ]
});
//Relation ManyToMany Entre Action et Utilisateur
Action.belongsToMany(Utilisateur, {
    through: 'ActionUtilisateur',
    foreignKey: 'IdAction'
});
Utilisateur.belongsToMany(Action, {
    through: 'ActionUtilisateur',
    foreignKey: 'IdUtilisateur'
});

module.exports = ActionUtilisateur;