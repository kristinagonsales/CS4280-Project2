const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const items = require('./routes/items');
const express = require('express');
const session = require('express-session');
const { User } = require('./models/user');
const app = express();
const url = "34.83.19.246:27017/project2";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("Connected..."))
    .catch(err => console.error("Something went wrong", err));

const port = 8080;
app.listen(port, () => console.log(`Listening on ${port}...`));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(session({
    secret: 'HERE_IS_THE_COOKIE_SECRET_STRING',
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies && !req.session.user) {
        res.session.save();
    }
    next();
});

app.use('/users', users);
app.use('/auth', auth);
app.use('/items', items);

module.exports = app;