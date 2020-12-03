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
    let items = await Item.find({ email: req.body.email }).sort({ date: -1 }).exec();
    res.send(items);
});

router.put('/update/:itemId', async (req, res) => {
    await Item.findByIdAndUpdate(req.params.itemId, { name: req.body.name, description: req.body.description, date: req.body.date }, { omitUndefined: true, new: true }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    }).exec();
});

module.exports = router;