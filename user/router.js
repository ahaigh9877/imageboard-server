const express = require("express");
const bcrypt = require("bcrypt");

const { Router } = express;
const router = new Router();

const User = require("./model");

router.post("/user", (req, res, next) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  };
  console.log("U S E R : ", user);
  User.create(user)
    .then(user => {
      res.status(200).send({ message: "it done worked", user });
    })
    .catch(next);
});

module.exports = router;
