const mongoose = require('../services/mongoose');
const { INVITE_TYPE } = require('../utils/constants');

const { Schema } = mongoose;
const InviteSchema = Schema({
  type: {
    type: String,
    enum: [
      INVITE_TYPE.CREATE_CIRCLE, 
      INVITE_TYPE.JOIN_CIRCLE
    ],
  },
  code: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true
  },
  expiryDate: {
    type: Date
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Invites', InviteSchema);
