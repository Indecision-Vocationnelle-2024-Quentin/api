const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');
const Utilisateur = require('./Utilisateur');

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
Action.belongToMany(Utilisateur,{
    through: 'ActionUtilisateur',
    foreignKey: 'IdAction'
});

module.exports = Action;
