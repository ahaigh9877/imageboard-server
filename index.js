const express = require("express");
const db = require("./db");

const app = express();

const port = process.env.PORT || 4000;

app.listen(
  port,
  console.log(`The app *does* listen: p-p-p-port number ${port} ! ! ! ! !`)
);

app.get("/", (req, res) => res.send("URRRRRGH."));
