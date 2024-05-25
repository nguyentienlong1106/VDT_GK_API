import express from "express";
import studentsController from "../controllers/Students.Controller.js";
const router = express.Router();

// router.get("/", studentsController.index);
// router.post("/", studentsController.save);

router.get("/", studentsController.list);
router.post("/add", studentsController.postStudent);
router.get("/:id", studentsController.view);
router.put("/:id", studentsController.editPost);
router.delete("/:id", studentsController.deleteStudent);

export default router;
