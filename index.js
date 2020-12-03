const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const items = require('./routes/items');
const express = require('express');
const app = express();
const url = "mongodb://34.83.19.246:27017/project2";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connected..."))
    .catch(err => console.error("Something went wrong", err));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on ${port}...`));


app.use(express.json());
app.use('/users', users);
app.use('/auth', auth);
app.use('/items', items);

module.exports = app;