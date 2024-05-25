import express from "express";
import studentRoutes from "./routes/students.js";
import mongoose from "mongoose";
import config from "../config.js";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import Student from "./models/Student.js";

const __filename = path.resolve();
const __dirname = path.dirname(__filename);
const connectToDB = async () => {
  try {
    await mongoose.connect(config.db_uri, {});
  } catch (e) {
    console.log(e);
    // process.exit(1);
  }
};

const app = express();
app.use(cors());

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const seedDatabase = async () => {
  const filePath = path.join(__dirname, "/api/src/data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Lưu dữ liệu vào MongoDB
  await Student.insertMany(data);
  console.log("Database seeded with initial data");
};

app.use("/students", studentRoutes);

connectToDB();
seedDatabase();
export default app;
