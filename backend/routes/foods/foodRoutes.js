const express = require("express");
const foodRouter = express.Router();
const storage = require("../../config/cloudinary");
const multer = require("multer");

const {createFoodCtrl,getFoodctrl,getSingleFoodctrl} =require ("../../controller/Food/foodCtrl");


const upload = multer({ storage });
foodRouter.post("/",upload.single("image"), createFoodCtrl);
foodRouter.get("/",getFoodctrl);
foodRouter.get("/:id",getSingleFoodctrl);

module.exports=foodRouter;