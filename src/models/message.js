const mongoose = require('../services/mongoose');

const { Schema } = mongoose;
const MessageSchema = Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    default: ''
  },
  chordId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Messages', MessageSchema);
