import express from 'express';
import Product, { IProduct } from '../models/Product';
import natural from 'natural';

const router = express.Router();

// TF-IDF Vectorizer for content-based recommendations
class ContentBasedRecommender {
  private tfidf: any;
  private documents: string[] = [];
  private products: IProduct[] = [];

  constructor() {
    this.tfidf = new natural.TfIdf();
  }

  async initialize() {
    this.products = await Product.find({});
    this.documents = this.products.map(product => 
      `${product.name} ${product.description} ${product.category}`
    );
    
    this.documents.forEach((doc, index) => {
      this.tfidf.addDocument(doc, index);
    });
  }

  getRecommendations(productId: string, limit: number = 5): IProduct[] {
    const targetProduct = this.products.find(p => p._id.toString() === productId);
    if (!targetProduct) return [];

    const targetText = `${targetProduct.name} ${targetProduct.description} ${targetProduct.category}`;
    const targetVector: number[] = [];
    
    // Get TF-IDF vector for target product
    this.tfidf.tfidfs(targetText, (i: number, measure: number) => {
      targetVector[i] = measure;
    });

    // Calculate similarities
    const similarities: { index: number; similarity: number }[] = [];
    
    this.products.forEach((product, index) => {
      if (product._id.toString() !== productId) {
        const docText = `${product.name} ${product.description} ${product.category}`;
        const docVector: number[] = [];
        
        this.tfidf.tfidfs(docText, (i: number, measure: number) => {
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

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
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

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (normA * normB);
  }

  // Get recommendations based on category (fallback method)
  getCategoryRecommendations(category: string, limit: number = 5): IProduct[] {
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

    const recommendations = recommender.getRecommendations(
      productId, 
      parseInt(limit as string)
    );

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error getting recommendations', error });
  }
});

// Get recommendations based on category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 5 } = req.query;

    const recommendations = recommender.getCategoryRecommendations(
      category,
      parseInt(limit as string)
    );

    res.json(recommendations);
  } catch (error) {
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
    const featuredProducts = await Product.find({ featured: true })
      .limit(parseInt(limit as string));

    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error getting personalized recommendations', error });
  }
});

export default router;
