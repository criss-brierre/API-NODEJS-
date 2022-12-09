const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email:  {
     type: String,
     required : true
  },
  password: {
    type: String,
    required : true
 },
 roles : {
     type : Array,
     default : []
 },
  firstname: {type :String,default: null},
  lastname: {type :String,default: null},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null},
  groups_id: { type : ObjectId, default : null}
});

module.exports = mongoose.model('Users', userSchema)