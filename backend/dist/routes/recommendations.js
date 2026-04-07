"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const natural_1 = __importDefault(require("natural"));
const router = express_1.default.Router();
// TF-IDF Vectorizer for content-based recommendations
class ContentBasedRecommender {
    constructor() {
        this.documents = [];
        this.products = [];
        this.tfidf = new natural_1.default.TfIdf();
    }
    async initialize() {
        this.products = await Product_1.default.find({});
        this.documents = this.products.map(product => `${product.name} ${product.description} ${product.category}`);
        this.documents.forEach((doc, index) => {
            this.tfidf.addDocument(doc, index);
        });
    }
    getRecommendations(productId, limit = 5) {
        const targetProduct = this.products.find(p => p._id.toString() === productId);
        if (!targetProduct)
            return [];
        const targetText = `${targetProduct.name} ${targetProduct.description} ${targetProduct.category}`;
        const targetVector = [];
        // Get TF-IDF vector for target product
        this.tfidf.tfidfs(targetText, (i, measure) => {
            targetVector[i] = measure;
        });
        // Calculate similarities
        const similarities = [];
        this.products.forEach((product, index) => {
            if (product._id.toString() !== productId) {
                const docText = `${product.name} ${product.description} ${product.category}`;
                const docVector = [];
                this.tfidf.tfidfs(docText, (i, measure) => {
                    docVector[i] = measure;
                });
                // Calculate cosine similarity
                const similarity = this.cosineSimilarity(targetVector, docVector);
                similarities.push({ index, similarity });
            }
        });
        // Sort by similarity and return top recommendations
        similarities.sort((a, b) => b.similarity - a.similarity);
        return similarities
            .slice(0, limit)
            .map(sim => this.products[sim.index]);
    }
    cosineSimilarity(vecA, vecB) {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        normA = Math.sqrt(normA);
        normB = Math.sqrt(normB);
        if (normA === 0 || normB === 0)
            return 0;
        return dotProduct / (normA * normB);
    }
    // Get recommendations based on category (fallback method)
    getCategoryRecommendations(category, limit = 5) {
        return this.products
            .filter(product => product.category === category)
            .sort(() => Math.random() - 0.5) // Randomize for variety
            .slice(0, limit);
    }
}
const recommender = new ContentBasedRecommender();
// Initialize recommender when server starts
recommender.initialize().catch(console.error);
// Get recommendations for a product
router.get('/product/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const { limit = 5 } = req.query;
        const recommendations = recommender.getRecommendations(productId, parseInt(limit));
        res.json(recommendations);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting recommendations', error });
    }
});
// Get recommendations based on category
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const { limit = 5 } = req.query;
        const recommendations = recommender.getCategoryRecommendations(category, parseInt(limit));
        res.json(recommendations);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting category recommendations', error });
    }
});
// Get personalized recommendations (simplified version)
router.get('/personalized/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit = 5 } = req.query;
        // In a real application, this would analyze user's browsing/purchase history
        // For now, we'll return featured products as a simple recommendation
        const featuredProducts = await Product_1.default.find({ featured: true })
            .limit(parseInt(limit));
        res.json(featuredProducts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting personalized recommendations', error });
    }
});
exports.default = router;
