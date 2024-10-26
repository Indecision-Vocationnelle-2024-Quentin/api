/**
 * @file Utilisateur.js
 * 
 * @class       Utilisateur
 * @extends     Model
 * @summary     Modèle de données représentant un utilisateur, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'Utilisateur' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un utilisateur ainsi que les relations
 *              ManyToMany et OneToMany avec d'autres entités comme
 *              TypeUtilisateur, TypeAuthorisation, Ressource, Question, et Action.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @requires    TypeUtilisateur   Modèle Sequelize pour la table des types d'utilisateurs
 * @see         TypeUtilisateur.js
 * 
 * @requires    TypeAuthorisation      Modèle Sequelize pour la table des types d'authorisations
 * @see         TypeAuthorisation.js
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

const TypeAuthorisation = require('./TypeAuthorisation');
const TypeUtilisateur = require('./TypeUtilisateur');
const Ressource = require('./Ressource');
const Action = require('./Action');
const Question = require('./Question');

class Utilisateur extends Model { }

Utilisateur.init({
    UtilisateurId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Prenom: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    IdAuthorisation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Courriel: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
    },
    MotDePasse: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Utilisateur',
    timestamps: false
});
Utilisateur.belongsTo(TypeAuthorisation, { foreignKey: 'IdTypeAuthorisation' });

Utilisateur.belongsToMany(TypeUtilisateur, {
    through: 'UtilisateurTypeUtilisateur',
    foreignKey: 'IdUtilisateur'
});
Utilisateur.belongsToMany(Ressource, {
    through: 'RessourceUtilisateur',
    foreignKey: 'IdUtilisateur'
});
Utilisateur.belongsToMany(Action, {
    through: 'ActionUtilisateur',
    foreignKey: 'IdUtilisateur'
});
Utilisateur.belongsToMany(Question, {
    through: 'QuestionUtilisateur',
    foreignKey: 'IdUtilisateur'
});

module.exports = Utilisateur;
