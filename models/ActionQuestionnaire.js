const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/server');

class ActionQuestionnaire extends Model {}

ActionQuestionnaire.init({
    IdActionQuestionnaire: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdAction: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IdQuestionnaire: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ActionQuestionnaire',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['IdAction', 'IdQuestionnaire']
        }
    ]
});

module.exports = ActionQuestionnaire;
