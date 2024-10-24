const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class Ressource extends Model {}

Ressource.init({
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
        allowNull: false,
        unique : true
    }
}, {
    sequelize,
    modelName: 'Ressources',
    timestamps: false
});

module.exports = Ressource;
