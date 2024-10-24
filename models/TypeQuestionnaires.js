// models/TypeQuestionnaires.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class TypeQuestionnaires extends Model {}

TypeQuestionnaires.init({
    IdTypeQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TypeQuestionnaires',
    timestamps: false
});

module.exports = TypeQuestionnaires;
