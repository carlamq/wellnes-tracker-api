const mongoose = require('mongoose');

<<<<<<< David's-contribution
const nutritionSchema = new mongoose.Schema(
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
    mealType: {
      type: String,
      required: true,
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
      lowercase: true
    },
    foods: [
      {
        name: { 
          type: String, 
          required: true,
          trim: true,
          minlength: 1
        },
        calories: { 
          type: Number, 
          required: true,
          min: 0
        },
        protein: { 
          type: Number, 
          default: 0,
          min: 0
        },
        carbs: { 
          type: Number, 
          default: 0,
          min: 0
        },
        fats: { 
          type: Number, 
          default: 0,
          min: 0
        },
        servingSize: { 
          type: String,
          trim: true
        }
      }
    ],
    totalCalories: {
      type: Number,
      required: true,
      min: 0
    },
    waterIntakeMl: {
      type: Number,
      default: 0,
      min: 0,
      max: 10000
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500
    }
  },
  { timestamps: true }
);

// Calculate total calories before saving
nutritionSchema.pre('save', function(next) {
  if (this.foods && this.foods.length > 0) {
    this.totalCalories = this.foods.reduce((sum, food) => sum + (food.calories || 0), 0);
  }
  next();
=======
const nutritionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    foodItem: { type: String, required: true },
    calories: { type: Number, required: true },
    proteinGrams: { type: Number },
    carbsGrams: { type: Number },
    fatsGrams: { type: Number },
    date: { type: Date, default: Date.now }
>>>>>>> main
});

module.exports = mongoose.model('Nutrition', nutritionSchema);