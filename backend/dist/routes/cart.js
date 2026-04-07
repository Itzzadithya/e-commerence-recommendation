"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
// Get or create cart for user
router.get('/:userId', async (req, res) => {
    try {
        let cart = await Cart_1.default.findOne({ user: req.params.userId }).populate('items.product');
        if (!cart) {
            cart = new Cart_1.default({ user: req.params.userId, items: [], total: 0 });
            await cart.save();
        }
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error });
    }
});
// Add item to cart
router.post('/:userId/add', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let cart = await Cart_1.default.findOne({ user: req.params.userId });
        if (!cart) {
            cart = new Cart_1.default({ user: req.params.userId, items: [], total: 0 });
        }
        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += quantity;
        }
        else {
            cart.items.push({ product: productId, quantity });
        }
        // Calculate total
        let total = 0;
        for (const item of cart.items) {
            const itemProduct = await Product_1.default.findById(item.product);
            if (itemProduct) {
                total += itemProduct.price * item.quantity;
            }
        }
        cart.total = total;
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding item to cart', error });
    }
});
// Update item quantity
router.put('/:userId/update', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart_1.default.findOne({ user: req.params.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            }
            else {
                cart.items[itemIndex].quantity = quantity;
            }
        }
        // Recalculate total
        let total = 0;
        for (const item of cart.items) {
            const itemProduct = await Product_1.default.findById(item.product);
            if (itemProduct) {
                total += itemProduct.price * item.quantity;
            }
        }
        cart.total = total;
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating cart', error });
    }
});
// Remove item from cart
router.delete('/:userId/remove/:productId', async (req, res) => {
    try {
        let cart = await Cart_1.default.findOne({ user: req.params.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
        // Recalculate total
        let total = 0;
        for (const item of cart.items) {
            const itemProduct = await Product_1.default.findById(item.product);
            if (itemProduct) {
                total += itemProduct.price * item.quantity;
            }
        }
        cart.total = total;
        await cart.save();
        await cart.populate('items.product');
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
});
exports.default = router;
