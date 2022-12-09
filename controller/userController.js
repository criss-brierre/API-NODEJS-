const connection = require('../database')
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
var ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');


const getUsers = async (req, res) => {
    try{
    const collectionuser = await userModel.find({}).select("firstname lastname");
    return res.status(200).json(collectionuser);
    }catch(err){
    return res.status(500).json({ 'message': err.message });
    }
}

const getUsersAll = async (req, res) => {
    try{
    const collectionuser = await userModel.find({});
    return res.status(200).json(collectionuser);
    }catch(err){
    return res.status(500).json({ 'message': err.message });
    }
}


const addtogroup = async (req, res) => {
    const { groups_id } = req.body;
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader.split(' ')[1];
        var decoded = jwt.decode(token);
        const user = await userModel.findOne({email:decoded.email});
        var id = new ObjectId(user._id);
        console.log(user);
        var ObjectIdGroup = new ObjectId(groups_id);
        const collectionuser = await userModel.updateOne({ _id: id }, { groups_id: ObjectIdGroup, updatedAt: Date.now() });
        return res.status(200).json({ "success": "your profile has been updated" });
    } catch (error) {
        return res.status(500).json({ "error": error.message })
    }
}

const modif = async (req, res) => {
    const param = req.params.id;
    const { email, password, firstname, lastname, groups_id } = req.body;
    try {
        var Objectid_user = new ObjectId(param);
        var Objectid_group = new ObjectId(groups_id);
    } catch (error) {
        return res.status(400).json({ "erreur": "vous devez inserez un ObjectId" })
    }
    
    let hashed;
    if (password) { hashed = await bcrypt.hash(password, 10) };
    const collectionuser = await userModel.updateOne({ _id: Objectid_user }, { email: email, password: hashed, firstname: firstname, lastname: lastname, groups_id: Objectid_group, updatedAt: Date.now() });
    return res.status(200).json({ "message": `modification du user : ${Objectid_user} réussie` });
}
const me = async (req, res) => {
    const { email, password, firstname, lastname, groups_id } = req.body;
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1];
    var decoded = jwt.decode(token);
    const user = await userModel.findOne({ email: decoded.email }).exec();
    const Objectid_group = new ObjectId(groups_id);
    var userid = user._id;
    let hashed;
    if (password) { hashed = await bcrypt.hash(password, 10) };
    console.log(user._id);
    const collectionuser = await userModel.updateOne({ _id: userid }, { email: email, password: hashed, firstname: firstname, lastname: lastname, groups_id: Objectid_group, updatedAt: Date.now() });
    return res.status(200).json({ "message": `votre profil a été modifié` });
}

const deleteuser = async (req, res) => {
    const param = req.params.id;
    try{
    var Objectid_user = new ObjectId(param);
    const collectionuser = await userModel.deleteOne({ _id: Objectid_user }, {});
    return res.status(204).json(collectionuser);
    }catch(error){
        return res.status(500).json({ 'message': err.message });
    }
    
}

const detailsuser = async (req, res) => {
    const idparam = req.params.id;
    const { email, password, firstname, lastname } = req.body;
    try{
    var Objectid = new ObjectId(idparam);
    const collectionuser = await userModel.findById({ _id: Objectid }).select("email firstname lastname groupe_id");
    return res.status(200).json(collectionuser);
    }catch(error){
        return res.status(500).json({ 'message': err.message });
    }
}

const register = async (req, res, next) => {
    const { email, password, firstname, lastname } = req.body;
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        //create and store the new user
        const result = await userModel.create({
            "email": email,
            "password": hashedPwd,
            "roles": ['ROLE_USER'],
            "firstname": firstname,
            "lastname": lastname,
            "createdAt": Date.now(),
            "updatedAt": null
        });
        return res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (err) {
        return res.status(500).json({ 'message': err.message });
    }
}

module.exports = { register, getUsers, detailsuser, addtogroup, modif, deleteuser,me,getUsersAll };