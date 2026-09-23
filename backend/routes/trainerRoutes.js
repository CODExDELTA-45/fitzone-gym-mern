const express = require("express");
const router = express.Router();
const { getTrainers, createTrainer, deleteTrainer } = require("../controllers/trainerController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", getTrainers);
router.post("/", protect, adminOnly, createTrainer);
router.delete("/:id", protect, adminOnly, deleteTrainer);

module.exports = router;
