"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
// Get all products
router.get('/', async (req, res) => {
    try {
        const { category, sort, search } = req.query;
        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }
        if (search) {
            query.$text = { $search: search };
        }
        let productsQuery = Product_1.default.find(query);
        if (sort === 'price-low') {
            productsQuery = productsQuery.sort({ price: 1 });
        }
        else if (sort === 'price-high') {
            productsQuery = productsQuery.sort({ price: -1 });
        }
        else if (sort === 'name') {
            productsQuery = productsQuery.sort({ name: 1 });
        }
        else {
            productsQuery = productsQuery.sort({ createdAt: -1 });
        }
        const products = await productsQuery.exec();
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});
// Get featured products
router.get('/featured', async (req, res) => {
    try {
        const products = await Product_1.default.find({ featured: true }).limit(8);
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching featured products', error });
    }
});
// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
});
// Get products by category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product_1.default.find({ category: req.params.category });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products by category', error });
    }
});
exports.default = router;
