const express = require("express");
const storage = require("../../config/cloudinary");
const multer = require("multer");


const {  userRegisterCtrl,userLoginCtrl}= require("../../controller/User/userCtrl");

const upload = multer({ storage });
const userRouter = express.Router();


userRouter.post("/register",upload.single("image"), userRegisterCtrl);

//POST/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

module.exports = userRouter;