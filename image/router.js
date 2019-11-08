const express = require("express");
const { Router } = express;
const router = new Router();

const Image = require("./model");

router.get("/image", (req, res, next) => {
  Image.findAll()
    .then(images => res.send(images))
    .catch(next);
});

module.exports = router;
