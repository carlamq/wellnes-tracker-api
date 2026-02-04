const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
  userId: {
    type: String, // Or mongoose.Schema.Types.ObjectId if linking to a User model
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
    enum: ['strength', 'cardio', 'yoga', 'other'] // Limits input to these types
  },
  durationMin: {
    type: Number,
    required: true
  },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number },
      reps: { type: Number },
      weight: { type: Number }
    }
  ],
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Workout', workoutSchema);