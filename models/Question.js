/**
 * @file Question.js
 * 
 * @class       Question
 * @extends     Model
 * @summary     Modèle de données représentant une question, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Question' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'une question .
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



class Question extends Model { }

Question.init({
    IdQuestion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdTypeQuestion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdFacteur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Question: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
    },
    Exemple: {
        type: DataTypes.STRING(450),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Question'
    
});


module.exports = Question;