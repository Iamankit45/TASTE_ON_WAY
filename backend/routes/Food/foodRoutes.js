const express = require("express");
const foodRouter = express.Router();
const storage = require("../../config/cloudinary");
const multer = require("multer");

const {createFoodCtrl,getFoodctrl} =require ("../../controller/Food/foodCtrl");


const upload = multer({ storage });
foodRouter.post("/",upload.single("image"), createFoodCtrl);
foodRouter.get("/",getFoodctrl);

module.exports=foodRouter;