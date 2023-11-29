const express = require('express');
const router = express.Router();
const isAuth = require("../middleware/is-user");
const userServices=require('../controller/controller')
router.post("/login", userServices.login);
router.post("/register", userServices.register);
router.get("/auth-user", isAuth, userServices.getAuthUser);
const isAuth1 = require("../middleware/is-admin");
const adminServices = require("../controller/admincontroller");
router.post("/adminlogin", adminServices.login);
router.get("/auth-admin", isAuth1, adminServices.getAuthAdmin);
router.get("/users", isAuth1, adminServices.getUsers);
const TaskController=require("../controller/other_controller");
router.post("/task",TaskController.addtask);
router.get("/task",TaskController.gettask);
router.delete("/task/:id", TaskController.deletetask);
router.put("/task/:id",TaskController.updatetask)
module.exports = router; 


 