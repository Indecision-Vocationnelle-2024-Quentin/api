/**
 * @file Facteur.js
 * 
 * @class       Facteur
 * @extends     Model
 * @summary     Modèle de données représentant un facteur, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Facteur' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un facteur ainsi que la relation
 *              HasMany avec d'autres entités comme Ressource, Question, et Action.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    Ressource   Modèle Sequelize pour la table des ressources
 * @see         Ressource.js
 * 
 * @requires    Action      Modèle Sequelize pour la table des actions
 * @see         Action.js
 * 
 * @requires    Question    Modèle Sequelize pour la table des questions
 * @see         Question.js
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

const Action = require('./Action');
const Ressource = require('./Ressource');
const Question = require('./Question');

class Facteur extends Model { }

Facteur.init({
    IdFacteur: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Lettre: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Facteurs',
    timestamps: false
});

//Se trouve plusieur fois dans la table Ressources
Facteur.hasMany(Ressource, { foreignKey: 'IdFacteur' });
//Se trouve plusieur fois dans la table Action
Facteur.hasMany(Action, { foreignKey: 'IdFacteur' });
//Se trouve plusieur fois dans la table Question
Facteur.hasMany(Question, { foreignKey: 'IdFacteur' });

module.exports = Facteur;
