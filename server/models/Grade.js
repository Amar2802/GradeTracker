const mongoose = require("mongoose");

const calculateGradeDetails = (marksObtained, totalMarks) => {
  const percentage = Number(((marksObtained / totalMarks) * 100).toFixed(2));
  let grade = "F";

  if (percentage >= 90) {
    grade = "A";
  } else if (percentage >= 75) {
    grade = "B";
  } else if (percentage >= 60) {
    grade = "C";
  } else if (percentage >= 50) {
    grade = "D";
  }

  return { percentage, grade };
};

const gradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    subjectName: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true
    },
    marksObtained: {
      type: Number,
      required: [true, "Marks obtained is required"],
      min: [0, "Marks obtained cannot be negative"]
    },
    totalMarks: {
      type: Number,
      required: [true, "Total marks is required"],
      min: [1, "Total marks must be at least 1"]
    },
    percentage: {
      type: Number
    },
    grade: {
      type: String,
      enum: ["A", "B", "C", "D", "F"]
    }
  },
  {
    timestamps: true
  }
);

gradeSchema.pre("validate", function gradePreValidate(next) {
  if (this.marksObtained > this.totalMarks) {
    return next(new Error("Marks obtained cannot be greater than total marks"));
  }

  const { percentage, grade } = calculateGradeDetails(
    this.marksObtained,
    this.totalMarks
  );

  this.percentage = percentage;
  this.grade = grade;

  next();
});

module.exports = mongoose.model("Grade", gradeSchema);
