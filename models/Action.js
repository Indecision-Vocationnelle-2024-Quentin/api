/**
 * @file Action.js
 * 
 * @class       Action
 * @extends     Model
 * @summary     Modèle de données représentant une action, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Action' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'une action ainsi que les relations
 *              ManyToMany et OneToMany avec d'autres entités comme Utilisateur, Questionnaire, et Facteur.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    Utilisateur Modèle Sequelize pour la table des utilisateurs
 * @see         Utilisateur.js
 * 
 * @requires    Questionnaire Modèle Sequelize pour la table des questionnaires
 * @see         Questionnaire.js
 * 
 * @requires    Facteur Modèle Sequelize pour la table des facteurs
 * @see         Facteur.js
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
const Questionnaire = require('./Questionnaire');
const Facteur = require('./Facteur');

class Action extends Model { }

Action.init({
    IdAction: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdFacteur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Action: {
        type: DataTypes.STRING(300),
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Actions',
    timestamps: false
});

//Relation ManyToMany avec Utilisateur
Action.belongsToMany(Utilisateur, {
    through: 'ActionUtilisateur',
    foreignKey: 'IdAction'
});
//Relation ManyToMany avec Questionnaire
Action.belongsToMany(Questionnaire, {
    through: 'ActionQuestionnaire',
    foreignKey: 'IdAction'
});

//Relation OneToMany avec Facteur
Action.belongsTo(Facteur, { foreignKey: 'IdFacteur' });

module.exports = Action;
