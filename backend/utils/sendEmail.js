const nodemailer = require("nodemailer");

// Reusable email sender using Nodemailer.
// Configure EMAIL_USER / EMAIL_PASS (Gmail App Password) in .env
const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    // We log the error but don't crash the request just because email failed
    console.error("Email sending failed:", error.message);
  }
};

module.exports = sendEmail;
