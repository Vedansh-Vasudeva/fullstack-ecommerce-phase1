require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO = process.env.MONGO_URI;  // 👈 Force Atlas connection

const sampleCategories = ['Electronics', 'Apparel', 'Home', 'Toys', 'Books', 'Sports'];

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function createSampleProducts(n = 60) {
  const products = [];
  for (let i = 1; i <= n; i++) {
    const cat = sampleCategories[i % sampleCategories.length];
    products.push({
      name: `${cat} Product ${i}`,
      description: `Handy ${cat.toLowerCase()} product number ${i}. Great value and reliable.`,
      price: +(randInt(5, 500) + Math.random()).toFixed(2),
      category: cat,
      image: `https://picsum.photos/seed/${encodeURIComponent(cat + i)}/400/300`,
      rating: +(Math.random() * 5).toFixed(1),
      inStock: Math.random() > 0.1
    });
  }
  return products;
}

async function seed() {
  if (!MONGO) {
    console.error("❌ No MONGO_URI found in .env");
    process.exit(1);
  }

  await mongoose.connect(MONGO);
  console.log('✅ Connected to Atlas for seeding');

  await Product.deleteMany({});
  const data = createSampleProducts(60);

  const result = await Product.insertMany(data);
  console.log(`✅ Inserted ${result.length} products into Atlas`);

  await mongoose.disconnect();
  console.log('🔌 Disconnected after seeding');
}

seed().catch(err => {
  console.error('❌ Seed error', err);
  process.exit(1);
});
