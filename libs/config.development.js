import logger from './logger.js';

module.exports = {
    database: 'ntask',
    username: 'root',
    password: '',
    params: {
        host: 'localhost',
        dialect: 'mysql',
        logging: (sql) => {
            logger.info(`[${new Date()}] ${sql}`);
        },
        define: {
            underscored: true
        }
    },
    jwtSecret: '@Task$-AP1',
    jwtSession: {session: false}
};