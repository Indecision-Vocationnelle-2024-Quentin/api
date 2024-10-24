// models/QuestionQuestionnaire.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class QuestionQuestionnaire extends Model {}

QuestionQuestionnaire.init({
    IdQuestionQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdQuestion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdQuestionnaire: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'QuestionQuestionnaire',
    timestamps: false
});

module.exports = QuestionQuestionnaire;
