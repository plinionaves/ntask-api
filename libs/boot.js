module.exports = app => {

    app.listen(app.get('port'), () => {
        console.log(`NTask API rodando na porta ${app.get('port')}...`);
    });

};