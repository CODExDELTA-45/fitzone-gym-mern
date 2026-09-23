const Trainer = require("../models/Trainer");

const getTrainers = async (req, res) => {
  const trainers = await Trainer.find();
  res.json(trainers);
};

const createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json(trainer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTrainer = async (req, res) => {
  await Trainer.findByIdAndDelete(req.params.id);
  res.json({ message: "Trainer removed" });
};

module.exports = { getTrainers, createTrainer, deleteTrainer };
