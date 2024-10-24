const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class TypeUtilisateurs extends Model {}

TypeUtilisateurs.init({
    IdTypeUtilisateur: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Type: {
        type: DataTypes.STRING(75),
        allowNull: false,
        unique: true
    },
    Description: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TypeUtilisateurs',
    timestamps: false
});

module.exports = TypeUtilisateurs;
