import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(postRoutes);
app.use(userRoutes);
app.use('/upload',express.static("upload"));

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Khushikumari:Khushi%401991@cluster0.nsoxvoi.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0'
    );
    console.log("✅ Connected to MongoDB");
    app.listen(9090, () => {
      console.log("🚀 Server is running on port 9090");
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

start();
