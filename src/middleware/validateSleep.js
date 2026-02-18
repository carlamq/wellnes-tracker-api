<<<<<<< David's-contribution
/**
 * Validation middleware for Sleep POST/PUT requests
 * Returns 400 error if validation fails
 */
const validateSleepBody = (req, res, next) => {
  try {
    const { userId, date, bedtime, wakeTime, durationHours, quality, interruptions, sleepStages, notes, feltRested } = req.body;
    const errors = [];

    // Validate userId
    if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
      errors.push('userId is required and must be a non-empty string');
    }

    // Validate date
    if (date && isNaN(Date.parse(date))) {
      errors.push('date must be a valid date format');
    }

    // Validate bedtime
    if (!bedtime) {
      errors.push('bedtime is required');
    } else if (isNaN(Date.parse(bedtime))) {
      errors.push('bedtime must be a valid date/time format');
    }

    // Validate wakeTime
    if (!wakeTime) {
      errors.push('wakeTime is required');
    } else if (isNaN(Date.parse(wakeTime))) {
      errors.push('wakeTime must be a valid date/time format');
    }

    // Validate bedtime and wakeTime relationship
    if (bedtime && wakeTime && !isNaN(Date.parse(bedtime)) && !isNaN(Date.parse(wakeTime))) {
      const bedDate = new Date(bedtime);
      const wakeDate = new Date(wakeTime);
      
      if (wakeDate <= bedDate) {
        errors.push('wakeTime must be after bedtime');
      }
    }

    // Validate durationHours
    if (!durationHours) {
      errors.push('durationHours is required');
    } else if (typeof durationHours !== 'number' || durationHours < 0 || durationHours > 24) {
      errors.push('durationHours must be a number between 0 and 24');
    }

    // Validate quality
    const validQualities = ['poor', 'fair', 'good', 'excellent'];
    if (!quality) {
      errors.push('quality is required');
    } else if (!validQualities.includes(quality.toLowerCase())) {
      errors.push(`quality must be one of: ${validQualities.join(', ')}`);
    }

    // Validate interruptions
    if (interruptions !== undefined) {
      if (typeof interruptions !== 'number' || interruptions < 0 || interruptions > 50) {
        errors.push('interruptions must be a number between 0 and 50');
      }
    }

    // Validate sleepStages if provided
    if (sleepStages !== undefined) {
      if (typeof sleepStages !== 'object' || sleepStages === null) {
        errors.push('sleepStages must be an object');
      } else {
        const { lightSleepMin, deepSleepMin, remSleepMin } = sleepStages;

        if (lightSleepMin !== undefined && (typeof lightSleepMin !== 'number' || lightSleepMin < 0)) {
          errors.push('sleepStages.lightSleepMin must be a positive number');
        }

        if (deepSleepMin !== undefined && (typeof deepSleepMin !== 'number' || deepSleepMin < 0)) {
          errors.push('sleepStages.deepSleepMin must be a positive number');
        }

        if (remSleepMin !== undefined && (typeof remSleepMin !== 'number' || remSleepMin < 0)) {
          errors.push('sleepStages.remSleepMin must be a positive number');
        }
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

    // Validate feltRested
    if (feltRested !== undefined && typeof feltRested !== 'boolean') {
      errors.push('feltRested must be a boolean (true or false)');
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

module.exports = { validateSleepBody };
=======
const allowedSleepQuality = ["Poor", "Fair", "Good", "Excellent"];
const isValidDate = (value) => !Number.isNaN(Date.parse(value));

const validateSleepBody = (req, res, next) => {
    const { date, hoursSlept, sleepQuality, notes } = req.body;
    const errors = [];
    if (typeof hoursSlept !== "number" || hoursSlept <= 0 || hoursSlept > 24) {
    errors.push("hoursSlept must be a number > 0 and <= 24");}
    if (date !== undefined && !isValidDate(date)) {errors.push("date must be a valid date");}
    if (sleepQuality !== undefined && !allowedSleepQuality.includes(sleepQuality)) {errors.push("sleepQuality must be one of: Poor, Fair, Good, Excellent");}
    if (notes !== undefined && typeof notes !== "string") {errors.push("notes must be a string");}
    if (errors.length) {
        return res.status(400).json({ message: "Validation failed", errors });
    }
    next();
};

module.exports = { validateSleepBody };
>>>>>>> main
