// models/Ressources.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class Ressources extends Model {}

Ressources.init({
    IdRessource: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdFacteur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Ressource: {
        type: DataTypes.STRING(400),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Ressources',
    timestamps: false
});

module.exports = Ressources;
