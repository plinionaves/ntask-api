import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

module.exports = app => {
    app.set('port', 3000);
    app.set('json spaces', 4);
    app.use(cors({
        origin: ['http://localhost:4200'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(bodyParser.json());
    app.use(app.libs.auth.initialize());
    app.use((req, res, next) => {
        if (req.body) delete req.body.id;
        next();
    });
    app.use(express.static('public'));
};