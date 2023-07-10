const express = require("express");
const storage = require("../../config/cloudinary");
const multer = require("multer");


const {  userRegisterCtrl,userLoginCtrl,userProfileCtrl,userLogOutCtrl,addToCartCtrl,getCartdataCtrl}= require("../../controller/User/userCtrl");

const upload = multer({ storage });
const userRouter = express.Router();
const isLogin=require("../../middleware/isLogin");

userRouter.post("/register",upload.single("image"), userRegisterCtrl);

//POST/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

userRouter.get("/profile/",isLogin,userProfileCtrl);
userRouter.get("/logOut",userLogOutCtrl);
userRouter.post("/addToCart",isLogin,addToCartCtrl);
userRouter.get("/profile/getCartData",isLogin,getCartdataCtrl);
module.exports = userRouter;