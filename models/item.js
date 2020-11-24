const Joi = require('joi');
const mongoose = require('mongoose');

const Item = mongoose.model('Item', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    time: {
        type: Date,
        required: true
    }
}));

const validateItem = (item) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(255).required(),
        date: Joi.date().required()
    });
    return schema.validate(item);
}

exports.Item = Item;
exports.validate = validateItem;