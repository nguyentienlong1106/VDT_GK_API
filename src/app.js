const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("../config.js");
const Student = require("./models/Student.js");
const route = require("./routes");

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
  const filePath = path.join(__dirname, "./api/src/data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Lưu dữ liệu vào MongoDB
  await Student.insertMany(data);
  console.log("Database seeded with initial data");
};

route(app);

connectToDB().then(() => seedDatabase());

module.exports = app;
