const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const File = require("./models/File"); // ✅ Import File model
const uploadRoutes = require("./routes/upload");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("PicVault Backend is running ✅");
});

// Static uploads folder
app.use("/uploads", express.static("uploads"));

// Get all files
app.get("/api/files", async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

// Upload routes
app.use("/api", uploadRoutes);

// MongoDB connection + start server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error(err));
