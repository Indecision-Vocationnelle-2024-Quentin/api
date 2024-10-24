const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class Facteur extends Model {}

Facteur.init({
    IdFacteur: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Lettre: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Facteurs',
    timestamps: false
});

module.exports = Facteur;
