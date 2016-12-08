module.exports = {
    database: 'ntask_test',
    username: 'root',
    password: '',
    params: {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        sync: {
            force: true
        },
        define: {
            underscored: true
        }
    },
    jwtSecret: 'NTASK_TEST',
    jwtSession: {session: false}
};