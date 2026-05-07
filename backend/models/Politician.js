const mongoose = require('mongoose');

const politicalHistorySchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const politicianSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    party: {
      type: String,
      required: [true, 'Party is required'],
      trim: true,
    },

    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },

    promises: {
      type: [String],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },

    slogan: {
      type: String,
      default: '',
    },

    partySymbol: {
      type: String,
      default: '',
    },

    politicalHistory: {
      type: [politicalHistorySchema],
      default: [],
    },

    contact: {
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
      website: { type: String, trim: true },
    },

    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

politicianSchema.index({
  name: 'text',
  location: 'text',
  party: 'text',
});

module.exports = mongoose.model('Politician', politicianSchema);