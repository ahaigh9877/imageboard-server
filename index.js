const express = require("express");

const app = express();

const port = process.env.PORT || 4000;

app.listen(port, console.log(`The app does listen: port number ${port}`));
