/**
 * @file UtilisateurType.js
 * 
 * @class       UtilisateurType
 * @extends     Model
 * @summary     Modèle de données représentant la table de relation entre un utilisateur et son type,
 *              utilisé pour gérer les enregistrements dans la table SQL associée
 * 
 * @description Classe Sequelize pour l'entité 'UtilisateurType' dans la base de données SQL.
 * 
 * @requires    sequelize   Gestion de la connexion et des transactions avec la base de données
 * 
 * @version     2.2
 * @created  26/10/2024
 * 
 * @updated  29/20/2024
 * @details      Changement de nom (trop long)
 * 
 * @property   Cégep de Rivière-du-Loup
 * 
 * @author      Quentin Lecourt
 */
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class UtilisateurType extends Model { }

UtilisateurType.init({
    IdUtilisateurType: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdTypeUtilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdUtilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'UtilisateurType',
    
    indexes: [
        {
            unique: true,
            fields:['IdTypeUtilisateur', 'IdUtilisateur']
        }
    ]
});


module.exports = UtilisateurType;