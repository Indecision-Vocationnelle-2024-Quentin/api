const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class Questionnaire extends Model {}

Questionnaire.init({
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
        allowNull: false,
        unique: true
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
Questionnaire.belongsToMany(Questions, {
    through: 'QuestionQuestionnaire',
    foreignKey: 'IdQuestionnaire'
});


module.exports = Questionnaire;
