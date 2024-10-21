// server.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'indecision_vocationnelle_dev',
    'test',
    'RS55keNEy%raXNqJ#hDw>MzjgHX@md(TDeV=XkDF',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelize.authenticate()
    .then(() => console.log('Connexion établit avec la base de données.'))
    .catch(erreur => console.log('Base de données inaccessible.', erreur));

module.exports = sequelize;
