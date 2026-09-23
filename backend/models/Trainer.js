const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    bio: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainer", trainerSchema);
