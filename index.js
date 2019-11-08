const express = require("express");
const db = require("./db");
const Image = require("./image/model");

const app = express();

const port = process.env.PORT || 4000;

app.listen(
  port,
  console.log(`The app *does* listen: p-p-p-port number ${port} ! ! ! ! !`)
);

app.get("/", (req, res) => res.send("<h1 style='color:blue'>URRRRRGH.</h1>"));
