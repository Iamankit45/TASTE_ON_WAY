const express = require('express');


const path =require('path');
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const dbConnect = require("./config/db");
const cors = require("cors");
const corsOptions = require('./utils/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const app = express();
const port = process.env.PORT || 8000;


app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());



const userRouter = require("./routes/User/userRoutes");
const foodRouter=require("./routes/Food/foodRoutes")

app.use("/api/v1/users", userRouter);
app.use("/api/v1/food",foodRouter);

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
    dbConnect()
});












