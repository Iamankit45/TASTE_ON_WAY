const express = require('express');
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const dbConnect = require("./config/db");
const cors = require("cors");
const corsOptions = require('./utils/corsOptions');
const app = express();
const port = process.env.PORT || 8000;

app.use(cors(corsOptions));
app.use(express.json())
const foodRouter=require("./routes/Food/foodRoutes")


app.use("/api/v1/food",foodRouter);

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
    dbConnect()
});












