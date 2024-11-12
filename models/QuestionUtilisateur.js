/**
 * @file QuestionUtilisateur.js
 * 
 * @class       QuestionUtilisateur
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre une question et un utilisateur,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'QuestionUtilisateur' dans la base de données SQL.
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

const Question = require('./Question');
const Utilisateur = require('./Utilisateur');

class QuestionUtilisateur extends Model { }

QuestionUtilisateur.init({
    IdQuestionReponse: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdQuestion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdUtilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Reponse: {
        type: DataTypes.STRING(400),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'QuestionUtilisateur',
    
    indexes: [
        {
            unique: true,
            fields: ['IdQuestion', 'IdUtilisateur']
        }
    ]
});


module.exports = QuestionUtilisateur;