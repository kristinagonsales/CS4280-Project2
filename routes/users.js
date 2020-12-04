const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    console.log(req.body.name);
    
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    //Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if(user) {
        //User exists
        return res.status(400).send('That user already exists');
    } else {
        //User does not exist
        //  Insert new user
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        req.session.user = user.dataValues;
        res.redirect('items.html');
    }
});

module.exports = router;