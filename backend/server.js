const path = require('path');
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });
const dbConnect = require("./config/db");
const corsOptions = require('./utils/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentials');
const app = express();
const globalErrHandler = require("./middlewares/globalErrHandler");
const port = process.env.PORT || 8000;

const Razorpay = require('razorpay');

app.use(credentials);

// Allow requests from specific origins (replace with your actual frontend URL)
const allowedOrigins = ['https://taste-on-way.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(cookieParser());
//middleware

app.use(express.json()); //pass incoming payload


exports.instance = new Razorpay({

  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});
const userRouter = require("./routes/users/userRoutes");



const foodRouter = require("./routes/foods/foodRoutes")
const paymentRouter = require("./routes/payments/payment");
//routing of users,posts,category,comments
app.use("/api/v1/users", userRouter);


app.use("/api/v1/food", foodRouter);

app.use("/api/v1/payment", paymentRouter);
//errorhandlers middleware
app.use(globalErrHandler);


app.use("/api/v1/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
})
//404 error

app.use("*", (req, res) => {
  res.status(400).json({
    message: `${req.originalUrl} Route not found`,
  });
});

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
  dbConnect()
});


