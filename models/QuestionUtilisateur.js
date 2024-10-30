/**
 * @file QuestionUtilisateur.js
 * 
 * @class       QuestionUtilisateur
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre une question et un utilisateur,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'QuestionUtilisateur' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux de la relation.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    Question  Modele des Questions
 * @see         Question.js
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
//Relation ManyToMany entre Question et Utilisateur
Question.belongsToMany(Utilisateur, {
    through: 'QuestionUtilisateur',
    foreignKey: 'IdQuestion'
});
Utilisateur.belongsToMany(Question, {
    through: 'QuestionUtilisateur',
    foreignKey: 'IdUtilisateur'
});


module.exports = QuestionUtilisateur;