// models/ActionUtilisateur.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class ActionUtilisateur extends Model {}

ActionUtilisateur.init({
    IdActionReponse: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdAction: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdUtilisateur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Reponse: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ActionUtilisateur',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields:['IdAction','IdUtilisateur']
        }
    ]
});

module.exports = ActionUtilisateur;
