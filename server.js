const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const gateway = require('./routes/gateway')

const app = express();

dotenv.config();


app.disable("x-powered-by");

const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";

app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(logger(morganFormat));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", gateway	);

app.listen(2020, console.log("Running"));