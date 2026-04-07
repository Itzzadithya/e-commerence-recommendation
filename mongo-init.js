// MongoDB initialization script
db = db.getSiblingDB('ecommerce');

// Create user with read/write permissions
db.createUser({
  user: 'shophub_user',
  pwd: 'shophub_password',
  roles: [
    {
      role: 'readWrite',
      db: 'ecommerce'
    }
  ]
});

// Create indexes for performance
db.products.createIndex({ name: 'text', description: 'text' });
db.products.createIndex({ category: 1 });
db.products.createIndex({ featured: 1 });
db.products.createIndex({ rating: -1 });

print('Database initialized successfully');
