// server.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWRD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.SGBD,
        define : 
        {
            timestamps: false
        }
    }
);

sequelize.authenticate()
    .then(() => console.log('Connexion établit avec la base de données.'))
    .catch(erreur => console.log('Base de données inaccessible.', erreur));

module.exports = sequelize;
