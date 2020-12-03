const Joi = require('joi');
const { Item, validate } = require('../models/item');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //check if item already exists
    let item = await Item.findOne({ name: req.body.name });
    if (item) {
        //item already exists
        return res.status(400).send('That item already exists');
    } else {
        //item does not exist
        //  insert new item
        item = new Item({
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            email: req.body.email
        });
        await item.save();
        res.send(item);
    }
});

router.get('/all', async (req, res) => {
    if (req.session.user) {
        console.log(req.session.user);
        let items = await Item.find({ email: req.session.user.email }, { _id: 0, email: 0, __v: 0 }).sort({ date: -1 }).exec();
        
        //res.redirect('/items.html');
        console.log(items);
        console.log('something');
        res.send(items);    
    }
    //res.redirect('/login.html');
});

router.put('/update/:itemId', async (req, res) => {
    if (req.session.user) {
        await Item.findByIdAndUpdate(req.params.itemId, { name: req.body.name, description: req.body.description, date: req.body.date }, { omitUndefined: true, new: true }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }).exec();
    }
    res.redirect('/login.html');
});

module.exports = router;