const jwt = require('jsonwebtoken');
require('dotenv').config();
var ObjectId = require('mongoose').Types.ObjectId;


const verifyJWT = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) =>{
            if(err) return res.sendStatus(403);
            next();
        }
    );
}

const verifyAdmin = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    var decoded = jwt.decode(token);
    if (decoded.roles != ["ROLE_ADMIN"]) return res.sendStatus(403); 
    next();
}




module.exports = {verifyJWT,verifyAdmin}