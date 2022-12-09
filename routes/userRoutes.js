
const userController = require('../controller/userController');
const express = require("express");
const app = express();
var router = express.Router();
var bodyParser = require('body-parser');
// const fixture = require('./fixtures/fixture');
const verifyJWT = require('../middleware/verifyJWT');
const verifyAccount = require('../middleware/verifyAccount');
 
// var urlencodedParser = bodyParser.urlencoded({ extended: false })


// Route sans authentification

router.get('/',userController.getUsers);

router.post('/create',  verifyAccount.verifyAccountRequired,verifyAccount.verifyAccountExist,userController.register);

// Route authentifié


router.patch('/addgroup', verifyJWT.verifyJWT,userController.addtogroup);

router.get('/detail/:id', verifyJWT.verifyJWT,userController.detailsuser);

router.patch('/me',verifyJWT.verifyJWT,userController.me);
// Route authentifié et role admin
router.patch('/modif/:id',verifyJWT.verifyJWT, verifyJWT.verifyAdmin,userController.modif);

router.delete('/delete/:id',verifyJWT.verifyJWT,verifyJWT.verifyAdmin, userController.deleteuser);

router.get('/all',verifyJWT.verifyJWT, verifyJWT.verifyAdmin,userController.getUsersAll);


module.exports = router;
