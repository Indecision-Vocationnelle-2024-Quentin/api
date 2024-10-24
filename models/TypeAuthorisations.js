// models/TypeAutorisation.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class TypeAutorisation extends Model {}

TypeAutorisation.init({
    IdTypeAutorisation: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TypeAutorisation',
    timestamps: false
});

module.exports = TypeAutorisation;
