module.exports = app => {

    const env = process.env.NODE_ENV;

    if (!env || env.trim() !== 'test') {
        app.libs.db.sequelize.sync().done(() => {
            app.listen(app.get('port'), () => {
                console.log(`NTask API rodando na porta ${app.get('port')}...`);
            });
        });
    }

};