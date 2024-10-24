// models/QuestionUtilisateur.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class QuestionUtilisateur extends Model {}

QuestionUtilisateur.init({
    IdQuestionReponse: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdQuestion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdUtilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Reponse: {
        type: DataTypes.STRING(400),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'QuestionUtilisateur',
    timestamps: false
});

module.exports = QuestionUtilisateur;
