const Joi = require('joi');
const { Item } = require('../models/item');
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
            date: req.body.date
        });
        await item.save();
        res.send(item);
    }
});

module.exports = router;