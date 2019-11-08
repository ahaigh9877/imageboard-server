const express = require("express");
const { Router } = express;
const router = new Router();

const Image = require("./model");

router.post("/image", (req, res, next) => {
  Image.create(req.body)
    .then(image => res.send(image))
    .catch(next);
});

router.get("/image", (req, res, next) => {
  Image.findAll()
    .then(images => res.send(images))
    .catch(next);
});

module.exports = router;
