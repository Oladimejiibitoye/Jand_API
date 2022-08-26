const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const registerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  classname: {
    type: String,
    required: true
  },
  house: {
    type: String,
    required: true
  },
  complexion:{
    type: String,
    required: true
  },
  eye_color:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  guardian_name:{
    type: String,
    required: true
  },
  guardian_phonenumber:{
    type: String,
    required: true
  }
});





module.exports = mongoose.model('Register', registerSchema);