const express = require("express");
const multer = require("multer");
const File = require("../models/File");
const path = require("path");

const router = express.Router();

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Upload route
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = new File({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
    await file.save();
    res.json({ success: true, file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all files
router.get("/files", async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
