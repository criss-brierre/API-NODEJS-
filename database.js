const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

mongoose
  .connect(process.env.DatabaseURL)
  .then(() => {
    console.log('MongoDB connected!!')
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB', err)
  })


  module.exports = mongoose;



    