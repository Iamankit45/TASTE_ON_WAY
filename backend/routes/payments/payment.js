const express = require("express");

const paymentRouter = express.Router();

const {checkOut,paymentVerification } =require ("../../controller/payment/paymentCtrl");

paymentRouter.post("/checkOut",checkOut);

paymentRouter.post("/paymentVerification",paymentVerification );

module.exports = paymentRouter;