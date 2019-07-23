const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const pe = require('parse-error');
const cors = require('cors');


const v1 = require('./applications/routes/v1');
const app = express();

const CONFIG = require('./applications/config/config');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Passport
app.use(passport.initialize());


//Log Env
console.log("Environment:", CONFIG.app);


//DATABASE
const models = require("./applications/models");
models.sequelize.authenticate().then(() => {
        console.log('Connected to SQL database:', CONFIG.db_name);
    })
    .catch(err => {
        console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
    });

if (CONFIG.app === 'dev') {
    models.sequelize.sync(); //creates table if they do not already exist
    // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}

