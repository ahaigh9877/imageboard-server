const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./db");
const Image = require("./image/model");
const imageRouter = require("./image/router");
const authRouter = require("./auth/router");
const userRouter = require("./user/router");

const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = bodyParser.json();
app.use(parserMiddleware);

app.use(imageRouter);
app.use(authRouter);
app.use(userRouter);

const port = process.env.PORT || 4000;

app.listen(
  port,
  console.log(`The app *does* listen: p-p-p-port number ${port} ! ! ! ! !`)
);

app.get("/", (req, res) => res.send("<h1 style='color:blue'>URRRRRGH.</h1>"));
