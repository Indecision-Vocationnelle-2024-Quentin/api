// models/TypeQuestions.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class TypeQuestions extends Model {}

TypeQuestions.init({
    IdTypeQuestion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TypeQuestions',
    timestamps: false
});

module.exports = TypeQuestions;
