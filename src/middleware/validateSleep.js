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
