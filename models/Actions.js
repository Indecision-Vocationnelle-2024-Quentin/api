// models/Actions.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class Actions extends Model {}

Actions.init({
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
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Actions',
    timestamps: false
});

module.exports = Actions;
