const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');
const Utilisateur = require('./Utilisateur');
const Questionnaire = require('./Questionnaire');

class Action extends Model {}

Action.init({
    IdAction: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdFacteur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Action: {
        type: DataTypes.STRING(300),
        allowNull: false,
        unique:true
    }
}, {
    sequelize,
    modelName: 'Actions',
    timestamps: false
});

//Relation ManyToMany avec Utilisateur
Action.belongsToMany(Utilisateur,{
    through: 'ActionUtilisateur',
    foreignKey: 'IdAction'
});
//Relation ManyToMany avec Questionnaire
Action.belongsToMany(Questionnaire,{
    through: 'ActionQuestionnaire',
    foreignKey: 'IdAction'
});

//Relation OneToMany avec TypeQuestion
Action.belongsTo(TypeQuestion,{foreignKey:'IdTypeUtilisateur'});
//Relation OneToMany avec Facteur
Action.belongsTo(Facteur,{foreignKey:'IdFacteur'});

module.exports = Action;
