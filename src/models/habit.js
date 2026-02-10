const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    userId: {
    type: String, 
    required: true
  },
    userName: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true, minlength: 2 },

    frequency: {
      type: String,
      required: true,
      enum: ["daily", "weekly"],
      default: "daily"
    },

    // times per period (5 times per week)
    targetCount: { type: Number, required: true, min: 1, max: 50, default: 1 },

    category: { type: String, trim: true, default: "" },

    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Habit", habitSchema);
