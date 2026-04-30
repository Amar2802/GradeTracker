const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is missing in server/.env");
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing in server/.env");
  process.exit(1);
}

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Student Grade Tracker API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/grades", gradeRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
