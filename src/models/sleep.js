const mongoose = require('mongoose');

const sleepSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  hoursSlept: { type: Number, required: true },
  sleepQuality: { type: String, enum: ['Poor', 'Fair', 'Good', 'Excellent'], default: 'Good' },
  notes: { type: String }
});

module.exports = mongoose.model('Sleep', sleepSchema);