const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class Question extends Model {}

Question.init({
    IdQuestion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdTypeQuestion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdFacteur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Question: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
    },
    Exemple: {
        type: DataTypes.STRING(450),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Questions',
    timestamps: false
});
Question.belongsToMany(Questionnaires, {
    through: 'QuestionQuestionnaire',
    foreignKey: 'IdQuestion'
});

module.exports = Question;
