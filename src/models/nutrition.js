const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    foodItem: { type: String, required: true },
    calories: { type: Number, required: true },
    proteinGrams: { type: Number },
    carbsGrams: { type: Number },
    fatsGrams: { type: Number },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Nutrition', nutritionSchema);