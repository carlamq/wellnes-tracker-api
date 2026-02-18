const mongoose = require('mongoose');

<<<<<<< David's-contribution
const sleepSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    bedtime: {
      type: Date,
      required: true
    },
    wakeTime: {
      type: Date,
      required: true
    },
    durationHours: {
      type: Number,
      required: true,
      min: 0,
      max: 24
    },
    quality: {
      type: String,
      required: true,
      enum: ['poor', 'fair', 'good', 'excellent'],
      lowercase: true
    },
    interruptions: {
      type: Number,
      default: 0,
      min: 0,
      max: 50
    },
    sleepStages: {
      lightSleepMin: {
        type: Number,
        default: 0,
        min: 0
      },
      deepSleepMin: {
        type: Number,
        default: 0,
        min: 0
      },
      remSleepMin: {
        type: Number,
        default: 0,
        min: 0
      }
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500
    },
    feltRested: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Calculate duration before saving if not provided
sleepSchema.pre('save', function(next) {
  if (this.bedtime && this.wakeTime && !this.durationHours) {
    const duration = (this.wakeTime - this.bedtime) / (1000 * 60 * 60); // Convert to hours
    this.durationHours = Math.max(0, Math.min(24, duration)); // Clamp between 0-24
  }
  next();
=======
const sleepSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  hoursSlept: { type: Number, required: true },
  sleepQuality: { type: String, enum: ['Poor', 'Fair', 'Good', 'Excellent'], default: 'Good' },
  notes: { type: String }
>>>>>>> main
});

module.exports = mongoose.model('Sleep', sleepSchema);