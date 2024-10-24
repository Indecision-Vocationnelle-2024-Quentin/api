const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');
const Action = require ('./Action');
const Ressource = require ('./Ressource');
const Question = require ('./Question');

class Facteur extends Model {}

Facteur.init({
    IdFacteur: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Lettre: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Facteurs',
    timestamps: false
});

//Se trouve plusieur fois dans la table Ressources
Facteur.hasMany(Ressource,{foreignKey: 'IdFacteur'});
//Se trouve plusieur fois dans la table Action
Facteur.hasMany(Action,{foreignKey: 'IdFacteur'});
//Se trouve plusieur fois dans la table Question
Facteur.hasMany(Question,{foreignKey: 'IdFacteur'});

module.exports = Facteur;
