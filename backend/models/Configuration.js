const mongoose = require('mongoose');

// Configuration schema definition
const configurationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filters: { type: Object, required: true },
  chartConfig: { type: Object, required: true },
});

module.exports = mongoose.model('Configuration', configurationSchema);
