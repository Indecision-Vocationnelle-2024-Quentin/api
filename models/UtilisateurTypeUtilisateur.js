// models/UtilisateurTypeUtilisateur.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class UtilisateurTypeUtilisateur extends Model {}

UtilisateurTypeUtilisateur.init({
    IdUtilisateurTypeUtilisateur: {
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
    modelName: 'UtilisateurTypeUtilisateur',
    timestamps: false
});

module.exports = UtilisateurTypeUtilisateur;
