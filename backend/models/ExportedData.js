const mongoose = require('mongoose');

// Exported data schema definition
const exportedDataSchema = new mongoose.Schema({
  exportName: { type: String, required: true },
  data: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ExportedData', exportedDataSchema);
