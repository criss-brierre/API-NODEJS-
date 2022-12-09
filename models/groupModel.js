const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupsSchema = new Schema({
  name:  {
     type: String,
     required : true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null}
});

module.exports = mongoose.model('Groups', groupsSchema)