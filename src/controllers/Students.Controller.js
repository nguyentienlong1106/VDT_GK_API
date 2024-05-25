import Student from "../models/Student.js";

/**
 * GET /
 * list
 */
// export async function list(req, res) {
//   let perPage = 12;
//   let page = req.query.page || 1;

//   try {
//     const students = await Student.aggregate([{ $sort: { createdAt: -1 } }])
//       .skip(perPage * page - perPage)
//       .limit(perPage)
//       .exec();
//     const count = await Student.countDocuments({});

//     return res.status(200).json({
//       status: 200,
//       data: students,
//       current: page,
//       pages: Math.ceil(count / perPage),
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function list(req, res) {
  try {
    const student = await Student.find();

    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
  }
}

// /**
//  * POST /
//  * Create New Student
//  */
export async function postStudent(req, res) {
  const newStudent = new Student(req.body);
  try {
    await newStudent.save();
    return res.status(200).json(newStudent);
  } catch (error) {
    console.log(error);
  }
}

/**
 * GET /
 * Student Data
 */
export async function view(req, res) {
  try {
    const student = await Student.findOne({ _id: req.params.id });

    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
  }
}

/**
 * GET /
 * Update Student Data
 */
export async function editPost(req, res) {
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
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Delete /
 * Delete Student Data
 */
export async function deleteStudent(req, res) {
  try {
    await Student.findByIdAndDelete({ _id: req.params.id });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export default {
  list,
  view,
  postStudent,
  editPost,
  deleteStudent,
};
