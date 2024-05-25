import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  STT: {
    type: Number,
    required: false,
  },
  name1: {
    type: String,
    required: false,
  },
  name2: {
    type: String,
    required: false,
  },
  name3: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  sex: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Student", StudentSchema);
