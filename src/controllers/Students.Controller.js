const Student = require("../models/Student");

/**
 * GET /
 * list
 */
const list = async (req, res) => {
  try {
    const student = await Student.find();
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
  }
};

// /**
//  * POST /
//  * Create New Student
//  */
const postStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    await newStudent.save();
    return res.status(200).json(newStudent);
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Student Data
 */
const view = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.params.id });
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Student Data
 */
const editPost = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      year: req.body.year,
      email: req.body.email,
      phone: req.body.phone,
      sex: req.body.sex,
      university: req.body.university,
      country: req.body.country,
      updatedAt: Date.now(),
    });
    return res.json({ message: "Học sinh đã được cập nhật thành công." });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Student Data
 */
const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete({ _id: req.params.id });
    return res.json({ message: "Học sinh đã được xóa thành công." });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  list,
  view,
  postStudent,
  editPost,
  deleteStudent,
};
