const express = require("express");
const {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade
} = require("../controllers/gradeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getGrades).post(protect, createGrade);
router
  .route("/:id")
  .get(protect, getGradeById)
  .put(protect, updateGrade)
  .delete(protect, deleteGrade);

module.exports = router;
