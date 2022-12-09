const express = require("express");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express();
const port = 4000;
const database = require('./database');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const jwtRoutes = require('./routes/jwtRoutes');

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user/',userRoutes);
app.use('/group/',groupRoutes);
app.use('/login',jwtRoutes);
app.use(express.urlencoded({ extended: false }));


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});