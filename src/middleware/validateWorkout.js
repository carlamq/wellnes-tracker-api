const validateWorkoutBody = (req, res, next) => {
    const { userId, type, durationMin } = req.body;
    const errors = [];

    if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
        errors.push("userId is required");
    }
    
    if (!type || !["strength", "cardio", "yoga", "other"].includes(type)) {
        errors.push("type must be one of: strength, cardio, yoga, other");
    }
    
    if (!durationMin || typeof durationMin !== "number" || durationMin < 1) {
        errors.push("durationMin must be a number >= 1");
    }
    
    if (req.body.exercises && !Array.isArray(req.body.exercises)) {
        errors.push("exercises must be an array");
    }
    
    if (errors.length) {
        return res.status(400).json({ message: "Validation failed", errors });
    }
    
    next();
};

module.exports = { validateWorkoutBody };