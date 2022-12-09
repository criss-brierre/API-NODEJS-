const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const verifyAccountExist =  (req,res,next) =>{
    const {email} = req.body;
    const duplicate =  userModel.findOne({ email: email }).exec();
    if (duplicate) return res.status(409).json({ 'message': 'Email already used' });
    next();
}


const verifyAccountRequired =  (req,res,next) =>{
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    next();
}


module.exports = {verifyAccountExist,verifyAccountRequired}
