const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
name: { type: String, required: true },
description: { type: String },
price: { type: Number, required: true },
category: { type: String, index: true },
image: { type: String },
rating: { type: Number, default: 0 },
inStock: { type: Boolean, default: true },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Product', ProductSchema);