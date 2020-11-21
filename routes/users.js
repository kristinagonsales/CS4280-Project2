const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    console.log(error.details[0].message);
    if(error) return res.status(400).send(error.details[0].message);

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
        await user.save();
        res.send(user);
    }
});

module.exports = router;
//exports.router = router;