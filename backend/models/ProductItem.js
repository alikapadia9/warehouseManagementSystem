
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const productItemSchema = new mongoose.Schema({
    productname: { type: String, required: true },
    productq: { type: Number, required: true },
    prodlocation: { type: String, required: true }
});

module.exports = mongoose.model('ProductItem', productItemSchema);
