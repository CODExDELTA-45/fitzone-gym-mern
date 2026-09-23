const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// @route POST /api/contact
const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    await Contact.create({ name, email, message });

    // Notify gym owner/admin
    sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `<p><b>From:</b> ${name} (${email})</p><p>${message}</p>`,
    });

    // Auto-reply to the user
    sendEmail({
      to: email,
      subject: "We received your message - FitZone Gym",
      html: `<p>Hi ${name}, thanks for reaching out! Our team will get back to you within 24 hours.</p>`,
    });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendContactMessage };
