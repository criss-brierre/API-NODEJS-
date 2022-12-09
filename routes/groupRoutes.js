const groupController = require("../controller/groupController");
const express = require("express");
const app = express();
var router = express.Router();
// const fixture = require('./fixtures/fixture');
const verifyJWT = require('../middleware/verifyJWT')
 

router.get('/all', groupController.getGroups);

router.get('/groupuser',groupController.getGroupPerUsers);


//Route Auth et Admin

router.patch('/adduser/:id', verifyJWT.verifyJWT,verifyJWT.verifyAdmin,groupController.setUsersGroup);

router.post('/create',verifyJWT.verifyJWT,verifyJWT.verifyAdmin,groupController.addGroup);

router.patch('/modif/:id',verifyJWT.verifyJWT,verifyJWT.verifyAdmin,groupController.modifgroup);

router.delete('/delete/:id',verifyJWT.verifyJWT,verifyJWT.verifyAdmin,groupController.deletegroup);


module.exports = router;