const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['education', 'health', 'agriculture', 'employment', 'housing', 'women', 'senior-citizens', 'youth', 'documents', 'tax', 'other']
  },
  eligibility: {
    age: {
      min: Number,
      max: Number
    },
    income: {
      min: Number,
      max: Number
    },
    occupation: [String],
    states: [String],
    gender: {
      type: String,
      enum: ['male', 'female', 'all']
    },
    education: {
      type: String,
      enum: ['primary', 'secondary', 'higher-secondary', 'graduate', 'post-graduate', 'any']
    }
  },
  benefits: {
    type: [String],
    required: true
  },
  documents: {
    type: [String],
    required: true
  },
  applicationProcess: {
    type: [String],
    required: true
  },
  deadline: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'upcoming'],
    default: 'active'
  },
  website: {
    type: String
  },
  contactInfo: {
    phone: String,
    email: String,
    address: String
  },
  budget: {
    type: Number
  },
  beneficiaries: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
SchemeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Scheme", SchemeSchema); 