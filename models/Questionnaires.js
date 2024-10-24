// models/Questionnaires.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class Questionnaires extends Model {}

Questionnaires.init({
    IdQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdTypeQuestionnaire: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Titre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING(600),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Questionnaires',
    timestamps: false
});

module.exports = Questionnaires;
