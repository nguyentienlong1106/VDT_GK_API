// tests/students.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const config = require("../config");
const Student = require("../src/models/Student");

// const { MongoClient } = require("mongodb");
// let connection;

beforeAll(async () => {
  await mongoose.connect(config.db_uri, {});
});

afterAll(async () => {
  // await connection.close();
  await mongoose.connection.close();
});

describe("Student API", () => {
  it("should create a new student", async () => {
    const newStudent = {
      name: "John 1",
      email: "john.doe@example.com",
      sdt: "1234567890",
      sex: "male",
      university: "ABC University",
      country: "USA",
    };

    const res = await request(app).post("/students/add").send(newStudent);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe(newStudent.name);
    expect(res.body.sex).toBe(newStudent.sex);
    expect(res.body.university).toBe(newStudent.university);
  });

  it("should get all students", async () => {
    await Student.create({
      name: "John 2",
      email: "john@example.com",
      phone: "1234567890",
      sex: "Male",
      university: "Example University",
      country: "Country",
    });

    const res = await request(app).get("/students");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(1);
  });

  it("should get a student by ID", async () => {
    const student = await Student.create({
      name: "John 3",
      email: "john@example.com",
      phone: "1234567890",
      sex: "Male",
      university: "Example University",
      country: "Country",
    });

    const res = await request(app).get(`/students/${student._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "John 3");
  });

  it("should update a student", async () => {
    const student = await Student.create({
      name: "John 4",
      email: "john@example.com",
      phone: "1234567890",
      sex: "Male",
      university: "Example University",
      country: "Country",
    });
    const updatedData = {
      name: "Jane Doe",
      sex: "Male",
      university: "Example University",
    };

    const res = await request(app)
      .put(`/students/${student._id}`)
      .send(updatedData);
    const res1 = await request(app).get(`/students/${student._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res1.body).toHaveProperty("name", "Jane Doe");
  });

  it("should delete a student", async () => {
    const student = await Student.create({
      name: "John 5",
      email: "john@example.com",
      phone: "1234567890",
      sex: "Male",
      university: "Example University",
      country: "Country",
    });

    const res = await request(app).delete(`/students/${student._id}`);
    expect(res.statusCode).toEqual(200);

    const deletedStudent = await Student.findById(student._id);
    expect(deletedStudent).toBeNull();
  });
});
