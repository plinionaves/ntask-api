import https from 'https';
import fs from 'fs';

module.exports = app => {

    const credentials = {
        key: fs.readFileSync("ntask.key", "utf8").toString(),
        cert: fs.readFileSync("ntask.cert", "utf8").toString()
    }

    const env = process.env.NODE_ENV;

    if (!env || env.trim() !== 'test') {
        
        app.libs.db.sequelize.sync().done(() => {
            https.createServer(credentials, app)
                .listen(app.get('port'), () => {
                    console.log(`NTask API rodando na porta ${app.get('port')}...`);
                });
        });
    }

};