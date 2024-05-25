const express = require("express");
const studentsController = require("../controllers/Students.Controller");
const router = express.Router();

// router.get("/", studentsController.index);
// router.post("/", studentsController.save);

router.get("/", studentsController.list);
router.post("/add", studentsController.postStudent);
router.get("/:id", studentsController.view);
router.put("/:id", studentsController.editPost);
router.delete("/:id", studentsController.deleteStudent);

module.exports = router;
