// models/RessourceQuestionnaire.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class RessourceQuestionnaire extends Model {}

RessourceQuestionnaire.init({
    IdRessourceQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdRessource: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdQuestionnaire: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'RessourceQuestionnaire',
    timestamps: false
});

module.exports = RessourceQuestionnaire;
