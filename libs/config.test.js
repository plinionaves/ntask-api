module.exports = {
    database: 'ntask',
    username: 'root',
    password: '',
    params: {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        define: {
            underscored: true
        }
    },
    jwtSecret: '@Task$-AP1',
    jwtSession: {session: false}
};