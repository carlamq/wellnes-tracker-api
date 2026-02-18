<<<<<<< David's-contribution
/**
 * Validation middleware for Nutrition POST/PUT requests
 * Returns 400 error if validation fails
 */
const validateNutritionBody = (req, res, next) => {
  try {
    const { userId, date, mealType, foods, totalCalories, waterIntakeMl, notes } = req.body;
    const errors = [];

    // Validate userId
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      errors.push('userId is required and must be a non-empty string');
    }

    // Validate date
    if (date && isNaN(Date.parse(date))) {
      errors.push('date must be a valid date format');
    }

    // Validate mealType
    const validMealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
    if (!mealType) {
      errors.push('mealType is required');
    } else if (!validMealTypes.includes(mealType.toLowerCase())) {
      errors.push(`mealType must be one of: ${validMealTypes.join(', ')}`);
    }

    // Validate foods array
    if (!foods || !Array.isArray(foods)) {
      errors.push('foods must be an array');
    } else if (foods.length === 0) {
      errors.push('foods array must contain at least one food item');
    } else {
      // Validate each food item
      foods.forEach((food, index) => {
        if (!food.name || typeof food.name !== 'string' || food.name.trim().length === 0) {
          errors.push(`foods[${index}].name is required and must be a non-empty string`);
        }
        
        if (food.calories === undefined || food.calories === null) {
          errors.push(`foods[${index}].calories is required`);
        } else if (typeof food.calories !== 'number' || food.calories < 0) {
          errors.push(`foods[${index}].calories must be a positive number`);
        }

        if (food.protein !== undefined && (typeof food.protein !== 'number' || food.protein < 0)) {
          errors.push(`foods[${index}].protein must be a positive number`);
        }

        if (food.carbs !== undefined && (typeof food.carbs !== 'number' || food.carbs < 0)) {
          errors.push(`foods[${index}].carbs must be a positive number`);
        }

        if (food.fats !== undefined && (typeof food.fats !== 'number' || food.fats < 0)) {
          errors.push(`foods[${index}].fats must be a positive number`);
        }
      });
    }

    // Validate totalCalories
    if (totalCalories !== undefined) {
      if (typeof totalCalories !== 'number' || totalCalories < 0) {
        errors.push('totalCalories must be a positive number');
      }
    }

    // Validate waterIntakeMl
    if (waterIntakeMl !== undefined) {
      if (typeof waterIntakeMl !== 'number' || waterIntakeMl < 0 || waterIntakeMl > 10000) {
        errors.push('waterIntakeMl must be a number between 0 and 10000');
      }
    }

    // Validate notes
    if (notes !== undefined) {
      if (typeof notes !== 'string') {
        errors.push('notes must be a string');
      } else if (notes.length > 500) {
        errors.push('notes must not exceed 500 characters');
      }
    }

    // If there are validation errors, return 400
    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Data validation failed',
        details: errors
      });
    }

    // Validation passed, continue to controller
    next();

  } catch (error) {
    // Catch any unexpected errors and return 500
    console.error('Validation error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'An error occurred during data validation',
      details: error.message
    });
  }
};

module.exports = { validateNutritionBody };
=======
const isValidDate = (value) => !Number.isNaN(Date.parse(value));

const validateNutritionBody = (req, res, next) => {
  
    const { foodItem, calories, proteinGrams, carbsGrams, fatsGrams, date } = req.body;
    const errors = [];
    if (!foodItem || typeof foodItem !== "string" || foodItem.trim().length < 1) { errors.push("foodItem is required"); } 
    if (typeof calories !== "number" || calories < 0) { errors.push("calories must be a number >= 0"); }
    if (proteinGrams !== undefined && (typeof proteinGrams !== "number" || proteinGrams < 0)) { errors.push("proteinGrams must be a number >= 0"); }
    if (carbsGrams !== undefined && (typeof carbsGrams !== "number" || carbsGrams < 0)) { errors.push("carbsGrams must be a number >= 0"); }
    if (fatsGrams !== undefined && (typeof fatsGrams !== "number" || fatsGrams < 0)) {errors.push("fatsGrams must be a number >= 0");}
    if (date !== undefined && !isValidDate(date)) { errors.push("date must be a valid date"); }
    if (errors.length) {
        return res.status(400).json({ message: "Validation failed", errors }); 
    }
    next();
};

module.exports = { validateNutritionBody };
>>>>>>> main
