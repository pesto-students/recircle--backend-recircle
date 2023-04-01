const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser')
const { connectDB } = require("./config/db");

const userRoute = require('./routes/userRoute')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

connectDB();

//const port = process.env.PORT || 3000;
const port = 3000;
app.get("/", (req, res) => res.send({ status: "API running!" }));

app.use("/user", userRoute);


app.listen(port, () => console.log(`Server started on PORT ${port}`));
