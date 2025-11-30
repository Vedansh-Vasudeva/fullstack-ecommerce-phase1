const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


// GET /api/products
// Supports: page, limit, category, minPrice, maxPrice, search
router.get('/', async (req, res) => {
try {
const page = Math.max(1, parseInt(req.query.page) || 1);
const limit = Math.max(1, parseInt(req.query.limit) || 20);
const category = req.query.category;
const minPrice = parseFloat(req.query.minPrice);
const maxPrice = parseFloat(req.query.maxPrice);
const search = req.query.search;


const filter = {};
if (category) filter.category = category;
if (!Number.isNaN(minPrice) || !Number.isNaN(maxPrice)) {
filter.price = {};
if (!Number.isNaN(minPrice)) filter.price.$gte = minPrice;
if (!Number.isNaN(maxPrice)) filter.price.$lte = maxPrice;
}
if (search) filter.name = { $regex: search, $options: 'i' };


const total = await Product.countDocuments(filter);
const products = await Product.find(filter)
.sort({ createdAt: -1 })
.skip((page - 1) * limit)
.limit(limit)
.lean();


res.json({ page, limit, total, totalPages: Math.ceil(total / limit), products });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// GET /api/products/categories - list categories
router.get('/categories/list', async (req, res) => {
try {
const categories = await Product.distinct('category');
res.json({ categories });
} catch (err) {
res.status(500).json({ message: 'Server error' });
}
});


module.exports = router;