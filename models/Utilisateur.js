// models/Utilisateur.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class Utilisateur extends Model {}

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
        allowNull: false
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
module.exports = Utilisateur;
