/**
 * @file Ressource.js
 * 
 * @class       Ressource
 * @extends     Model
 * @summary     Modèle de données représentant une ressource, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Ressource' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'une ressource ainsi que les relations
 *              ManyToMany et OneToMany avec d'autres entités comme Utilisateur, Questionnaire, et Facteur.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    Utilisateur  Modèle Sequelize pour la table des utilisateurs
 * @see         Utilisateur.js
 * 
 * @requires    Questionnaire  Modèle Sequelize pour la table des questionnaires
 * @see         Questionnaire.js
 * 
 * @requires    Facteur      Modèle Sequelize pour la table des facteurs
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

const Facteur = require('./Facteur');
const Questionnaire = require('./Questionnaire');
const Utilisateur = require('./Utilisateur');

class Ressource extends Model { }

Ressource.init({
    IdRessource: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdFacteur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Ressource: {
        type: DataTypes.STRING(400),
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Ressources',
    timestamps: false
});

//Relation ManyToMany avec Questionnaire
Ressource.belongsToMany(Questionnaire, {
    through: 'RessourceQuestionnaire',
    foreignKey: 'IdRessource'
});
//Relation ManyToMany avec Utilisateur
Ressource.belongsToMany(Utilisateur, {
    through: 'RessourceUtilisateur',
    foreignKey: 'IdRessource'
});
//Relation OneToMnay avec les facteurs
Ressource.belongsTo(Facteur, { foreignKey: 'IdFacteur' });
module.exports = Ressource;
