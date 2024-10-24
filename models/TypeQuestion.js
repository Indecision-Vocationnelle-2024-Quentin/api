const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class TypeQuestion extends Model {}

TypeQuestion.init({
    IdTypeQuestion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type: {
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true
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

module.exports = TypeQuestion;
