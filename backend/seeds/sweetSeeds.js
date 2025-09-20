import mongoose from 'mongoose';
import Sweet from '../models/sweet.model.js';
import dotenv from 'dotenv';

dotenv.config();

const seedSweets = [
  // Chocolates (10 items)
  {
    name: 'Chocolate Truffles',
    category: 'Chocolate',
    price: 12.99,
    quantity: 25,
    description: 'Rich dark chocolate truffles dusted with cocoa powder',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=300&fit=crop'
  },
  {
    name: 'Dark Chocolate Bars',
    category: 'Chocolate',
    price: 9.99,
    quantity: 32,
    description: '70% dark chocolate bars with sea salt',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop'
  },
  {
    name: 'Mint Chocolate Chips',
    category: 'Chocolate',
    price: 11.50,
    quantity: 15,
    description: 'Cool mint chocolate chip cookies',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=300&h=300&fit=crop'
  },
  {
    name: 'Milk Chocolate Bonbons',
    category: 'Chocolate',
    price: 14.75,
    quantity: 20,
    description: 'Creamy milk chocolate bonbons with hazelnut filling',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=300&h=300&fit=crop'
  },
  {
    name: 'White Chocolate Hearts',
    category: 'Chocolate',
    price: 13.25,
    quantity: 18,
    description: 'Heart-shaped white chocolate with raspberry pieces',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=300&h=300&fit=crop'
  },
  {
    name: 'Chocolate Fudge Squares',
    category: 'Chocolate',
    price: 10.99,
    quantity: 28,
    description: 'Rich chocolate fudge cut into perfect squares',
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&h=300&fit=crop'
  },
  {
    name: 'Cocoa Dusted Almonds',
    category: 'Chocolate',
    price: 16.50,
    quantity: 12,
    description: 'Premium almonds coated in dark chocolate and cocoa',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=300&fit=crop'
  },
  {
    name: 'Chocolate Orange Creams',
    category: 'Chocolate',
    price: 15.99,
    quantity: 16,
    description: 'Dark chocolate shells filled with orange cream',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop'
  },
  {
    name: 'Rocky Road Bites',
    category: 'Chocolate',
    price: 12.75,
    quantity: 22,
    description: 'Chocolate chunks with marshmallows and nuts',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=300&h=300&fit=crop'
  },
  {
    name: 'Espresso Chocolate Beans',
    category: 'Chocolate',
    price: 11.25,
    quantity: 30,
    description: 'Coffee beans covered in rich dark chocolate',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=300&h=300&fit=crop'
  },

  // Gummies (10 items)
  {
    name: 'Strawberry Gummies',
    category: 'Gummies',
    price: 8.50,
    quantity: 40,
    description: 'Fresh strawberry flavored gummy bears',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },
  {
    name: 'Sour Cherry Gummies',
    category: 'Gummies',
    price: 9.25,
    quantity: 35,
    description: 'Tangy sour cherry gummy worms',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },
  {
    name: 'Peach Rings',
    category: 'Gummies',
    price: 7.75,
    quantity: 45,
    description: 'Sweet peach flavored gummy rings with sugar coating',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },
  {
    name: 'Blue Raspberry Bears',
    category: 'Gummies',
    price: 8.99,
    quantity: 38,
    description: 'Blue raspberry flavored gummy bears',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },
  {
    name: 'Tropical Fruit Mix',
    category: 'Gummies',
    price: 10.50,
    quantity: 28,
    description: 'Mixed tropical fruit flavored gummies',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },
  {
    name: 'Cola Bottles',
    category: 'Gummies',
    price: 6.99,
    quantity: 50,
    description: 'Classic cola flavored gummy bottles',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },
  {
    name: 'Watermelon Slices',
    category: 'Gummies',
    price: 8.75,
    quantity: 32,
    description: 'Juicy watermelon flavored gummy slices',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },
  {
    name: 'Gummy Sharks',
    category: 'Gummies',
    price: 9.99,
    quantity: 25,
    description: 'Fun shark-shaped gummies in assorted flavors',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },
  {
    name: 'Apple Rings',
    category: 'Gummies',
    price: 7.25,
    quantity: 42,
    description: 'Green apple flavored gummy rings',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },
  {
    name: 'Rainbow Worms',
    category: 'Gummies',
    price: 8.25,
    quantity: 36,
    description: 'Colorful rainbow gummy worms',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=300&h=300&fit=crop'
  },

  // Caramels (10 items)
  {
    name: 'Vanilla Caramels',
    category: 'Caramel',
    price: 15.75,
    quantity: 18,
    description: 'Soft vanilla caramels wrapped in cellophane',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },
  {
    name: 'Sea Salt Caramels',
    category: 'Caramel',
    price: 17.25,
    quantity: 15,
    description: 'Gourmet caramels with a hint of sea salt',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },
  {
    name: 'Chocolate Caramel Squares',
    category: 'Caramel',
    price: 19.50,
    quantity: 12,
    description: 'Rich caramel covered in dark chocolate',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },
  {
    name: 'Butter Pecan Caramels',
    category: 'Caramel',
    price: 18.99,
    quantity: 16,
    description: 'Buttery caramels with toasted pecan pieces',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },
  {
    name: 'Apple Cinnamon Caramels',
    category: 'Caramel',
    price: 16.75,
    quantity: 20,
    description: 'Caramels infused with apple and cinnamon',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },
  {
    name: 'Honey Lavender Caramels',
    category: 'Caramel',
    price: 21.50,
    quantity: 10,
    description: 'Artisan caramels with honey and lavender',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },
  {
    name: 'Bourbon Caramels',
    category: 'Caramel',
    price: 23.99,
    quantity: 8,
    description: 'Premium caramels infused with bourbon',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },
  {
    name: 'Coconut Caramels',
    category: 'Caramel',
    price: 17.75,
    quantity: 14,
    description: 'Tropical coconut flavored soft caramels',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },
  {
    name: 'Espresso Caramels',
    category: 'Caramel',
    price: 18.25,
    quantity: 13,
    description: 'Coffee-infused caramels for coffee lovers',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },
  {
    name: 'Strawberry Cream Caramels',
    category: 'Caramel',
    price: 16.99,
    quantity: 17,
    description: 'Creamy caramels with strawberry swirl',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=300&fit=crop'
  },

  // Lollipops (10 items)
  {
    name: 'Rainbow Lollipops',
    category: 'Lollipops',
    price: 6.25,
    quantity: 60,
    description: 'Colorful rainbow swirl lollipops',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  },
  {
    name: 'Cherry Bomb Pops',
    category: 'Lollipops',
    price: 5.99,
    quantity: 50,
    description: 'Intense cherry flavored explosion pops',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  },
  {
    name: 'Chocolate Lollipops',
    category: 'Lollipops',
    price: 7.50,
    quantity: 35,
    description: 'Rich milk chocolate lollipops',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  },
  {
    name: 'Sour Apple Pops',
    category: 'Lollipops',
    price: 5.75,
    quantity: 55,
    description: 'Tangy green apple sour lollipops',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  },
  {
    name: 'Butterscotch Swirls',
    category: 'Lollipops',
    price: 6.50,
    quantity: 42,
    description: 'Classic butterscotch flavored swirl pops',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  },
  {
    name: 'Blue Razz Pops',
    category: 'Lollipops',
    price: 5.25,
    quantity: 65,
    description: 'Electric blue raspberry lollipops',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  },
  {
    name: 'Watermelon Pops',
    category: 'Lollipops',
    price: 6.75,
    quantity: 38,
    description: 'Juicy watermelon flavored lollipops',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  },
  {
    name: 'Cotton Candy Lollipops',
    category: 'Lollipops',
    price: 7.25,
    quantity: 30,
    description: 'Pink and blue cotton candy flavored pops',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  },
  {
    name: 'Caramel Apple Pops',
    category: 'Lollipops',
    price: 8.99,
    quantity: 25,
    description: 'Apple lollipops dipped in caramel coating',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  },
  {
    name: 'Tropical Punch Pops',
    category: 'Lollipops',
    price: 6.99,
    quantity: 40,
    description: 'Mixed tropical fruit punch lollipops',
    image: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=300&h=300&fit=crop'
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    console.log('Clearing existing sweets...');
    await Sweet.deleteMany({});

    console.log('Seeding sweets data...');
    await Sweet.insertMany(seedSweets);

    console.log('Database seeded successfully!');
    console.log(`Added ${seedSweets.length} sweets to the database`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

seedDatabase();