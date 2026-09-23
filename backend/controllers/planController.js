const Plan = require("../models/Plan");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const getPlans = async (req, res) => {
  const plans = await Plan.find().sort({ price: 1 });
  res.json(plans);
};

// @route POST /api/plans/:id/subscribe  (protected)
// Activates the chosen plan on the logged-in user's account
const subscribePlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const user = await User.findById(req.user._id);
    user.membership = {
      plan: plan._id,
      startDate: new Date(),
      isActive: true,
    };
    await user.save();

    sendEmail({
      to: user.email,
      subject: `You're now on the ${plan.name} plan! 🎉`,
      html: `
        <h2>Hi ${user.name},</h2>
        <p>Your <b>${plan.name}</b> membership (₹${plan.price} / ${plan.durationInMonths} month${plan.durationInMonths > 1 ? "s" : ""}) is now active.</p>
        <p>See you at the gym!</p>
      `,
    });

    res.json({
      message: `${plan.name} plan activated successfully`,
      membership: user.membership,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePlan = async (req, res) => {
  await Plan.findByIdAndDelete(req.params.id);
  res.json({ message: "Plan removed" });
};

module.exports = { getPlans, createPlan, deletePlan, subscribePlan };
