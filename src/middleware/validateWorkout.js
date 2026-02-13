const allowedWorkoutTypes = ["strength", "cardio", "yoga", "other"];

const isValidDate = (value) => !Number.isNaN(Date.parse(value));

const validateWorkoutBody = (req, res, next) => {
  const { date, type, durationMin, exercises, notes } = req.body;
  const errors = [];

  if (!type || !allowedWorkoutTypes.includes(type)) {errors.push("type must be one of: strength, cardio, yoga, other");}
  if (typeof durationMin !== "number" || durationMin < 1) {errors.push("durationMin must be a number >= 1");}
  if (date !== undefined && !isValidDate(date)) {errors.push("date must be a valid date");}
  if (exercises !== undefined) {
    if (!Array.isArray(exercises)) {
      errors.push("exercises must be an array");
    } else {
      exercises.forEach((exercise, index) => {
        if (!exercise || typeof exercise !== "object") {
          errors.push(`exercises[${index}] must be an object`);
          return;
        }
        if (!exercise.name || typeof exercise.name !== "string" || exercise.name.trim().length < 1) {
          errors.push(`exercises[${index}].name is required`);
        }
        if (exercise.sets !== undefined && (typeof exercise.sets !== "number" || exercise.sets < 0)) {
          errors.push(`exercises[${index}].sets must be a number >= 0`);
        }
        if (exercise.reps !== undefined && (typeof exercise.reps !== "number" || exercise.reps < 0)) {
          errors.push(`exercises[${index}].reps must be a number >= 0`);
        }
        if (exercise.weight !== undefined && (typeof exercise.weight !== "number" || exercise.weight < 0)) {
          errors.push(`exercises[${index}].weight must be a number >= 0`);
        }
      });
    }
  }

  if (notes !== undefined && typeof notes !== "string") {errors.push("notes must be a string");}

  if (errors.length) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

module.exports = { validateWorkoutBody };
