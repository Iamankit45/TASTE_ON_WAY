const express = require("express");
const storage = require("../../config/cloudinary")
const multer=require("multer");
const {
  userProfileCtrl,
  usersCtrl,
  deleteUserAccountCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl, 
  
  
  adminBlockUsersCtrl,
  adminUnBlockUsersCtrl,
  updatePasswordCtrl,
  userProfileByUserNameCtrl,
 
  addToCartCtrl,getCartdataCtrl,userLogOutCtrl,userRegisterCtrl
} = require("../../controller/user/userCtrl");


const isAdmin=require("../../middlewares/isAdmin");

const {signup,login,protect,forgetPassword,resetPassword,updatePassword,checkPassAndUserID,renewAccessToken,logOut} = require("../../controller/authController");

const userRouter = express.Router();

const upload=multer({storage});

userRouter.get("/logOut",userLogOutCtrl);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/forget", forgetPassword);
userRouter.patch("/reset/:token", resetPassword);
userRouter.post("/checkPassAndUserID",checkPassAndUserID)
userRouter.get("/renewAccessToken",renewAccessToken)
userRouter.delete("/logOut", logOut);
userRouter.post("/register",upload.single("image"), userRegisterCtrl);
userRouter.use(protect);
userRouter.patch("/updatePassword", updatePassword);

userRouter.get("/",usersCtrl);

userRouter.get("/profile/",userProfileCtrl);

userRouter.post("/addToCart",addToCartCtrl);
userRouter.get("/profile/getCartData",getCartdataCtrl);
userRouter.get("/profileByName/:id",userProfileByUserNameCtrl);





//Delete/api/v1/users/delete-account
userRouter.delete("/delete-account", deleteUserAccountCtrl);

//put/api/v1/users/
userRouter.put("/",updateUserCtrl);

//put/api/v1/users/update-password
userRouter.put("/update-password",updatePasswordCtrl);

userRouter.post("/profile-photo-upload",upload.single('profile'),profilePhotoUploadCtrl);


//put/api/v1/users/admin-block/:id
userRouter.put("/admin-unblock/:id",isAdmin,adminUnBlockUsersCtrl);

//put/api/v1/users/admin-block/:id
userRouter.put("/admin-block/:id",isAdmin,adminBlockUsersCtrl);




module.exports = userRouter;
