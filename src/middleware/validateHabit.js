const validateHabitBody = (req, res, next) => {
    const { userId, name, frequency, targetCount } = req.body;
    const errors = [];
    if (!userId || typeof userId !== "string") errors.push("userId is required and must be a string");
    if(!name || typeof name !== "string" || name.trim().length < 2) errors.push("name is required (min 2 chars)");
    if (frequency && !["daily", "weekly"].includes(frequency)) errors.push("frequency must be daily or weekly"); 
    if (targetCount !== undefined && (typeof targetCount !== "number" || targetCount < 1)) errors.push("targetCount must be a number >= 1"); 
    if (errors.length) return res.status(400).json({ message: "Validation failed", errors });
    next();
};

module.exports = { validateHabitBody }; //exported to be used in the routes
