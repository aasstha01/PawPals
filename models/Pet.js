const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true,
    maxlength: [50, 'Pet name cannot exceed 50 characters']
  },
  type: {
    type: String,
    required: [true, 'Pet type is required'],
    enum: ['dog', 'cat', 'bird', 'rabbit', 'fish', 'hamster', 'guinea pig', 'other'],
    lowercase: true
  },
  breed: {
    type: String,
    required: [true, 'Breed is required'],
    trim: true,
    maxlength: [100, 'Breed cannot exceed 100 characters']
  },
  age: {
    type: String,
    required: [true, 'Age is required'],
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female'],
  },
  size: {
    type: String,
    required: [true, 'Size is required'],
    enum: ['Small', 'Medium', 'Large', 'Extra Large']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  images: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['available', 'pending', 'adopted'],
    default: 'available'
  },
  shelter: {
    type: String,
    required: [true, 'Shelter name is required'],
    trim: true
  },
  shelterContact: {
    type: String,
    required: [true, 'Shelter contact is required'],
    trim: true
  },
  shelterPhone: {
    type: String,
    required: [true, 'Shelter phone is required'],
    trim: true
  },
  vaccinated: {
    type: Boolean,
    default: false
  },
  neutered: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true,
    enum: ['dogs', 'cats', 'other', 'rescued']
  },
  featured: {
    type: Boolean,
    default: false
  },
  adoptionFee: {
    type: String,
    trim: true
  },
  urgent: {
    typ