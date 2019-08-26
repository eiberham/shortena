const express = require('express');
const models = require('./models');
const next = require('next');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const cors = require('cors');
import {
    graphqlExpress,
    graphiqlExpress,
} from 'graphql-server-express';
import { schema } from './src/schema';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then( () => {
    const server = express();

    const MONGO_URI = 'mongodb+srv://acedeno:sEvNLQ2cSy01Cl9U@cluster-pozxl.mongodb.net/';
    if (!MONGO_URI) {
        throw new Error('You must provide a MongoLab URI');
    }

    mongoose.Promise = global.Promise;

    mongoose.connect(MONGO_URI, {
        authSource: 'admin',
        retryWrites: true,
        dbName: 'shortener',
        useCreateIndex: true,
        useNewUrlParser: true,
    });

    const db = mongoose.connection
        .once('open', () => console.log('Connected to mongolab instance.'))
        .on('error', error => console.log('Error connecting to mongolab:', error));

    server.use(session({
        resave: true,
        saveUninitialized: true,
        secret: 'aaabbbccc',
        store: new MongoStore({
            mongooseConnection: db,
            autoReconnect: true
        })
    }));

    server.use(bodyParser.json());
    server.use(cors());

    server.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
        schema,
        context: {req: req}
    })));

    server.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql'
    }));

    server.get('*', (req, res) => {
        console.log("request: ", req.path);
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`Listening on port ${port}`);
    })
}).catch(ex => {
    console.error(ex.stack);
    process.exit(1);
});