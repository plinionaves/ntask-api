import Sequelize from 'sequelize';
const config = require('./config.js');
let sequelize = null;

module.exports = () => {
    if (!sequelize) {
        sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
    }
    return sequelize;
};