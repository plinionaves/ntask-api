module.exports = app => {

    app.libs.db.sync().done(() => {
        app.listen(app.get('port'), () => {
            console.log(`NTask API rodando na porta ${app.get('port')}...`);
        });
    });

};