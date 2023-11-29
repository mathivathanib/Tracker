const express = require("express");
const app = express();
app.use(express.static('./FRONTEND'))
const dotenv = require("dotenv");
const logger = require("morgan");
const cors = require("cors");
const routes = require('./routes/routes');
require("colors");
const jwtlib= require('jsonwebtoken')
const db = require("./config/dbconnection");
dotenv.config({path:"./config/config.env" });
if (process.env.NODE_ENV === "production") console.log = function() {};
if (process.env.NODE_ENV === "development") app.use(logger("dev"));
app.use(cors());
db(app);
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(routes);

module.exports = app;
