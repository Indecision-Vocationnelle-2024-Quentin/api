// models/RessourceUtilisateur.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class RessourceUtilisateur extends Model {}

RessourceUtilisateur.init({
    IdRessourceReponse: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdRessource: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdUtilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Reponse: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'RessourceUtilisateur',
    timestamps: false
});

module.exports = RessourceUtilisateur;
