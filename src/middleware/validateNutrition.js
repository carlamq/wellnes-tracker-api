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
