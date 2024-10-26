/**
 * @file TypeQuestion.js
 * 
 * @class       TypeQuestion
 * @extends     Model
 * @summary     Modèle de données représentant un type de question,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'TypeQuestion' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un type de question ainsi que la relation
 *              OneToMany l'entité Question.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    Question Modèle Sequelize pour la table des questions
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

const Question = require('./Question');

class TypeQuestion extends Model { }

TypeQuestion.init({
    IdTypeQuestion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TypeQuestions',
    timestamps: false
});

//Relation OneToMany avec Question (Une question fait à un type de question)
TypeQuestion.hasMany(Question, { foreignKey: 'IdTypeQuestion' });

module.exports = TypeQuestion;
