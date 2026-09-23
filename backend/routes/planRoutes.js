const express = require("express");
const router = express.Router();
const { getPlans, createPlan, deletePlan, subscribePlan } = require("../controllers/planController");
const { protect, adminOnly } = require("../middleware/auth");

router.get("/", getPlans);
router.post("/", protect, adminOnly, createPlan);
router.post("/:id/subscribe", protect, subscribePlan);
router.delete("/:id", protect, adminOnly, deletePlan);

module.exports = router;
