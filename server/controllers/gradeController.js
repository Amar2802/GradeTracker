const Grade = require("../models/Grade");

const getGrades = async (req, res, next) => {
  try {
    const grades = await Grade.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(grades);
  } catch (error) {
    next(error);
  }
};

const getGradeById = async (req, res, next) => {
  try {
    const grade = await Grade.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!grade) {
      res.status(404);
      throw new Error("Grade not found");
    }

    res.json(grade);
  } catch (error) {
    next(error);
  }
};

const createGrade = async (req, res, next) => {
  try {
    const { subjectName, marksObtained, totalMarks } = req.body;

    if (!subjectName || marksObtained === undefined || totalMarks === undefined) {
      res.status(400);
      throw new Error("Please fill all grade fields");
    }

    const grade = await Grade.create({
      user: req.user._id,
      subjectName,
      marksObtained,
      totalMarks
    });

    res.status(201).json(grade);
  } catch (error) {
    next(error);
  }
};

const updateGrade = async (req, res, next) => {
  try {
    const grade = await Grade.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!grade) {
      res.status(404);
      throw new Error("Grade not found");
    }

    grade.subjectName = req.body.subjectName || grade.subjectName;
    grade.marksObtained =
      req.body.marksObtained !== undefined
        ? req.body.marksObtained
        : grade.marksObtained;
    grade.totalMarks =
      req.body.totalMarks !== undefined ? req.body.totalMarks : grade.totalMarks;

    const updatedGrade = await grade.save();
    res.json(updatedGrade);
  } catch (error) {
    next(error);
  }
};

const deleteGrade = async (req, res, next) => {
  try {
    const grade = await Grade.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!grade) {
      res.status(404);
      throw new Error("Grade not found");
    }

    await grade.deleteOne();
    res.json({ message: "Grade deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGrades,
  getGradeById,
  createGrade,
  updateGrade,
  deleteGrade
};
