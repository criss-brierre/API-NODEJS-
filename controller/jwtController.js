const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// Configuring dotenv
dotenv.config();



// Setting up middlewares to parse request body and cookies

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email }).exec();
    const match = await bcrypt.compare(password, user.password);
    if (email === user.email &&
        match) {
        //creating a access token
        const accessToken = jwt.sign({
            email: user.email,
            roles: user.roles[0]
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        // Creating refresh token not that expiry of refresh 
        //token is greater than the access token    

        return res.status(200).json({ "token": accessToken });
    }
    else {
        // Return unauthorized error if credentials don't match
        return res.status(406).json({
            message: 'Invalid credentials'
        });
    }

}



module.exports = { login };