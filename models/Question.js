const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

const TypeQuestion = require('./TypeQuestion');
const Facteur = require('./Facteur');
const QuestionUtilisateur = require('./QuestionUtilisateur');
const QuestionQuestionnaire = require('./QuestionQuestionnaire');
const Utilisateur = require('./Utilisateur');

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

//Relation ManyToMany avec Questionnaires
Question.belongsToMany(Questionnaires, {
    through: 'QuestionQuestionnaire',
    foreignKey: 'IdQuestion'
});
//Relation ManyToMany avec Utilisateur
Question.belongsToMany(Utilisateur,{
    through: 'QuestionUtilisateur',
    foreignKey: 'IdQuestion'
});

//Relation OneToMany avec TypeQuestion
Question.belongsTo(TypeQuestion,{foreignKey:'IdTypeUtilisateur'});
//Relation OneToMany avec Facteur
Question.belongsTo(Facteur,{foreignKey:'IdFacteur'});

module.exports = Question;
