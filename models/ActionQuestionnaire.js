// models/ActionQuestionnaire.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class ActionQuestionnaire extends Model {}

ActionQuestionnaire.init({
    IdActionQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdAction: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdQuestionnaire: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ActionQuestionnaire',
    timestamps: false
});

module.exports = ActionQuestionnaire;
