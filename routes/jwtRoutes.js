const jwtController = require('../controller/jwtController');
const express = require("express");
const app = express();
var router = express.Router();
var bodyParser = require('body-parser');
// const fixture = require('./fixtures/fixture');
const verifyJWT = require('../middleware/verifyJWT')


router.post('/',jwtController.login);


module.exports = router;


