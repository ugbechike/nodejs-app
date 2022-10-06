const Joi = require('joi');
const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan');
const genres = require('./routes/genre')
const customer = require('./routes/customer')
const home = require('./routes/home');
const logger = require('./middleware/logger');
const dbConnection = require('./config/db-connection');

const app = express();
dbConnection()
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({extended: true})) // serve url encoded like value='test'&key="apple"
app.use(express.static('public')) //load static files
app.use(helmet()); // secure app by setting various http headers
app.use(morgan('combined')) // logs http

app.use('/api/genre', genres);
app.use('/api/customer', customer);
app.use('/api', home)

const port = process.env.PORT ?? 5050;

app.listen(port, () => console.log(`Listing on port ${port}`))