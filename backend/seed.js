import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";
import Resource from "./models/Resource.js";

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    
    await User.deleteMany();
    await Resource.deleteMany();

    
    const salt = await bcrypt.genSalt(10);
    const counselorPassword = await bcrypt.hash("counselor123", salt);

    const counselorUser = await User.create({
      name: "Counselor User",
      email: "counselor@example.com",
      passwordHash: counselorPassword,
      role: "counselor",
      institution: "University Counseling Center",
    });

    console.log("Counselor user created:", counselorUser.email);

    
    const studentPassword = await bcrypt.hash("student123", salt);

    const studentUser = await User.create({
      name: "Student User",
      email: "student@example.com",
      passwordHash: studentPassword,
      role: "student",
      institution: "University",
      program: "Computer Science",
      year: "Sophomore",
    });

    console.log("Student user created:", studentUser.email);

    
    const resources = [
      {
        title: "Managing Exam Stress",
        category: "Stress",
        description:
          "Learn effective techniques to manage stress during exam periods.",
        link: "https://example.com/exam-stress",
        tags: ["exams", "stress", "academic"],
        createdBy: counselorUser._id,
      },
      {
        title: "Improving Sleep Hygiene",
        category: "Sleep",
        description:
          "Tips for establishing healthy sleep patterns and improving sleep quality.",
        link: "https://example.com/sleep-hygiene",
        tags: ["sleep", "health", "wellness"],
        createdBy: counselorUser._id,
      },
      {
        title: "Time Management Strategies",
        category: "Time Management",
        description:
          "Effective time management techniques for balancing academics and personal life.",
        link: "https://example.com/time-management",
        tags: ["productivity", "time", "organization"],
        createdBy: counselorUser._id,
      },
      {
        title: "Understanding Anxiety",
        category: "Anxiety",
        description: "An overview of anxiety disorders and coping mechanisms.",
        link: "https://example.com/anxiety",
        tags: ["anxiety", "mental health", "copings"],
        createdBy: counselorUser._id,
      },
    ];

    const createdResources = await Resource.insertMany(resources);
    console.log("Sample resources created:", createdResources.length);

    console.log("Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
