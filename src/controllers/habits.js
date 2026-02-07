const Habit = require("../models/habit");

const isCastError = (err) => err && err.name === "CastError";
const isValidationError = (err) => err && err.name === "ValidationError";

// GET /habits
const getAllHabits = async (req, res) => {
    try {
        //#swagger.tags=['Habits']
        const habits = await Habit.find();   
        res.status(200).json(habits); 
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }
};

// GET /habits/:id
const getHabitById = async (req, res) => {
    try {  
        //#swagger.tags=['Habits']
        const habit = await Habit.findById(req.params.id);   
        if (!habit) return res.status(404).json({ message: "Habit not found" });  
        es.status(200).json(habit); 
    } catch (error) {   
        if (isCastError(error)) return res.status(400).json({ message: "Invalid id" });   
        res.status(500).json({ message: error.message }); 
    }
};

// POST /habits
const createHabit = async (req, res) => {
    try {
        // if need create the USER collection for OAuth, you can use the next line:
        // userId: req.user.sub 
        //#swagger.tags=['Habits']
        const habit = new Habit({      
            userName: req.body.userName,    
            name: req.body.name,
            frequency: req.body.frequency,
            targetCount: req.body.targetCount,    
            category: req.body.category,    
            active: req.body.active   
        });  
        const newHabit = await habit.save(); 
        res.status(201).json(newHabit);
    } catch (error) { 
        if (isValidationError(error)) return res.status(400).json({ message: error.message });
        res.status(400).json({ message: error.message });
    }
};

// PUT /habits/:id
const updateHabit = async (req, res) => {
    try {
        //#swagger.tags=['Habits']
        const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,  
            runValidators: true 
        });
        if (!updatedHabit) return res.status(404).json({ message: "Habit not found" });
        res.status(200).json(updatedHabit);
    } catch (error) { 
        if (isCastError(error)) return res.status(400).json({ message: "Invalid id" }); 
        if (isValidationError(error)) return res.status(400).json({ message: error.message });
        res.status(400).json({ message: error.message });
    }
};

// DELETE /habits/:id
const deleteHabit = async (req, res) => {
    try {
        //#swagger.tags=['Habits']
        const deletedHabit = await Habit.findByIdAndDelete(req.params.id);
        if (!deletedHabit) return res.status(404).json({ message: "Habit not found" });
        res.status(200).json({ message: "Habit deleted successfully" });
    } catch (error) {
        if (isCastError(error)) return res.status(400).json({ message: "Invalid id" });
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getAllHabits,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit
};