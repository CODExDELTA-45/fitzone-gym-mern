// Run: node seed.js  -> populates sample Plans and Trainers, and one admin user
require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Plan = require("./models/Plan");
const Trainer = require("./models/Trainer");
const User = require("./models/User");

const run = async () => {
  await connectDB();

  await Plan.deleteMany();
  await Trainer.deleteMany();

  await Plan.insertMany([
    { name: "Basic", price: 999, durationInMonths: 1, features: ["Gym access", "Locker"] },
    {
      name: "Premium",
      price: 2499,
      durationInMonths: 3,
      features: ["Gym access", "Locker", "1 free trainer session/week", "Diet plan"],
      isPopular: true,
    },
    {
      name: "Elite",
      price: 7999,
      durationInMonths: 12,
      features: ["Gym access", "Locker", "Unlimited trainer sessions", "Diet plan", "Free supplements kit"],
    },
  ]);

  await Trainer.insertMany([
    {
      name: "Mukesh Gahlot",
      specialty: "Strength & Conditioning",
      experienceYears: 25,
      bio: "Certified strength coach.",
      image: "https://tse2.mm.bing.net/th/id/OIP.c1Y0nY5WHxxTiLUjQwk11AHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
      name: "Priya Verma",
      specialty: "Yoga & Flexibility",
      experienceYears: 4,
      bio: "Yoga alliance certified instructor.",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Rohit Sharma",
      specialty: "Weight Loss",
      experienceYears: 5,
      bio: "Specializes in fat-loss transformations.",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80",
    },
  ]);

  const adminExists = await User.findOne({ email: "admin@fitzone.com" });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin",
      email: "admin@fitzone.com",
      password: hashedPassword,
      role: "admin",
    });
    console.log("Admin created -> email: admin@fitzone.com / password: admin123");
  }

  console.log("Seed data inserted successfully!");
  process.exit();
};

run();
