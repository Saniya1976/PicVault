const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// Export the model
module.exports = mongoose.model("File", fileSchema);
