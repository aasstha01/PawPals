const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Pet = require('./models/Pet');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/pawpals?retryWrites=true&w=majority';

// Sample data
const sampleUsers = [
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    type: 'individual',
    location: 'Mumbai, Maharashtra',
    phone: '+91 98765 43210'
  },
  {
    name: 'Happy Paws Shelter',
    email: 'info@happypaws.org',
    password: 'shelter123',
    type: 'organization',
    location: 'Delhi, Delhi',
    phone: '+91 98765 43211',
    verified: true,
    description: 'Leading animal rescue organization dedicated to finding loving homes for abandoned pets'
  },
  {
    name: 'Animal Care Foundation',
    email: 'contact@acf.org',
    password: 'acf123',
    type: 'organization',
    location: 'Bangalore, Karnataka',
    phone: '+91 98765 43212',
    verified: true,
    description: 'Non-profit organization focused on animal welfare and adoption services'
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Pet.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`👤 Created user: ${user.name}`);
    }

    // Sample pets data
    const samplePets = [
      {