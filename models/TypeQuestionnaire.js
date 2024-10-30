/**
 * @file TypeQuestionnaire.js
 * 
 * @class       TypeQuestionnaire
 * @extends     Model
 * @summary     Modèle de données représentant un type de questionnaire, utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'TypeQuestionnaire' dans la base de données SQL.
 *              Ce modèle définit les attributs principaux d'un type de questionnaire .
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


class TypeQuestionnaire extends Model { }

TypeQuestionnaire.init({
    IdTypeQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TypeQuestionnaire'
    
});
module.exports = TypeQuestionnaire;