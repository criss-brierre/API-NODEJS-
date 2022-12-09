const connection = require('../database');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const groupModel = require('../models/groupModel');
var ObjectId = require('mongoose').Types.ObjectId; 


const getGroups = async (req, res) => {
    try {
    const collectiongroup = await groupModel.find({}).select("name");
    return res.status(200).json(collectiongroup);
    }catch(err){

    return res.status(500).json({ 'message': err.message });
    }
}

const addGroup = async (req, res, next) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ 'message': 'this request require a body' });;
    // check for duplicate usernames in the db
    try {
        const result = await groupModel.create({
            "name": name,
            "createdAt": Date.now()
        });
        return res.status(201).json({ 'success': `Group ${name} created!` });
    } catch (err) {
        return res.status(500).json({ 'message': err.message });
    }
}

const modifgroup = async (req, res) => {
    const param = req.params.id;
    const { name } = req.body;
    try{
    var Objectid_user = new ObjectId(param);
    const group = await groupModel.updateOne({ _id: Objectid_user }, { name: name, updatedAt : Date.now() });
    return res.status(200).json({"success": `Group ${Objectid_group} has been modified`});

    }catch(err){
        return res.status(500).json({ 'message': err.message });
    }
    
}

const getGroupPerUsers = async (req, res) => {
    try{
    const getuserpergroup = await groupModel.aggregate([{
        $lookup:
        {
            from: "users",
            localField: "_id",
            foreignField: "groups_id",
            as: "usersingroup"
        },
        
    }]);
    return res.status(200).json(getuserpergroup);
    }catch(err){
    return res.status(500).json({ 'message': err.message });
    }
    
}

const setUsersGroup = async (req, res) => {
    const param = req.params.id;
    if (!param) return res.status(400).json({ 'message': 'this request require a parameter' });;

    const groupexist = await groupModel.find({ _id: Objectid_group });
    if (!groupexist) { return res.status(404).json({ "erreur": "ce groupe n'existe pas" }); }

    try{
    var Objectid_group = new ObjectId(param);
    var Objectid_user = [];
    req.body.forEach(iduser => Objectid_user.push(new ObjectId(iduser._id)));

    const userpergroup = await userModel.updateMany({ groups_id: Objectid_group },{ groups_id: null });
    const adduserstogroup = await userModel.updateMany({ _id : Objectid_user},{ groups_id: Objectid_group });

    return res.status(200).json(adduserstogroup);

      }catch(error){
          return res.status(500).json({"erreur": error.message})
      }
}

const deletegroup = async (req, res) => {
    const param = req.params.id;
    if (!param) return res.status(400).json({ 'message': 'this request require a parameter' });;
    
    try{
    var Objectid_group = new ObjectId(param);
    }catch(error){
        return res.status(400).json({ "erreur": "vous devez inserez un ObjectId en paramètre" })
    }
    const group = await groupModel.deleteOne({_id : Objectid_group},{});
    if(!group){ return res.status().json({"erreur":"le groupe n'existe pas"})}

    return res.status(204).json(group);
}

module.exports = { getGroups, modifgroup, addGroup, getGroupPerUsers, setUsersGroup,deletegroup };