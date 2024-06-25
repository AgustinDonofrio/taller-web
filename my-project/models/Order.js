const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Commerce = require('../models/Commerce.js');
const Product = require('../models/Product.js');
const User = require('../models/User.js');

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    commerce: {
        type: Schema.Types.ObjectId,
        ref: 'commerce',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
