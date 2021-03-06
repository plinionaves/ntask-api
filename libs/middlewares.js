import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './logger';

module.exports = app => {
    app.set('port', 3000);
    app.set('json spaces', 4);
    app.use(morgan('common', {
        stream: {
            write: message => {
                logger.info(message);
            }
        }
    }));
    app.use(helmet());
    app.use(cors({
        origin: ['http://localhost:4200'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(app.libs.auth.initialize());
    app.use((req, res, next) => {
        if (req.body) delete req.body.id;
        next();
    });
    app.use(express.static('public'));
};