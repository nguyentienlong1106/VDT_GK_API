const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("../config.js");
const Student = require("./models/Student.js");
const route = require("./routes");

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
  let data;

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } else {
    // If the file doesn't exist, create mock data
    data = [
      // Insert your mock data here
      { name: "Jane Doe", sex: "Male", university: "Example University" },
    ];
  }

  // Save data to MongoDB
  await Student.insertMany(data);
  console.log("Database seeded with initial data");
};

route(app);

connectToDB().then(() => seedDatabase());

module.exports = app;
