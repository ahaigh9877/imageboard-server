const { Router } = require("express");
const bcrypt = require("bcrypt");
const { toJWT, toData } = require("./jwt");

const router = new Router();

const User = require("../user/model");

// define endpoints here
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "give me a name and a password" });
  } else {
    // 1. find user based on email address
    User.findOne({
      where: {
        email: email
      }
    })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
            message: "User with that email does not exist"
          });
          // 2. use bcrypt.compareSync to check the password against the stored hash
        } else if (bcrypt.compareSync(password, entity.password)) {
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id })
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect"
          });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong"
        });
      });
    // res.send({
    //   jwt: toJWT({ userId: 1 })
    // });
  }
});

router.get("/secret-endpoint", (req, res) => {
  // creates an array from the authorization string with [0] containing "Bearer" and [1] containing the JWT.
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  // do we have auth at all, and if so, does it include "bearer" and some string?
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // send the JWT to toData which unscrambles it using the key. "data" should be the unscrambled information.
    try {
      const data = toData(auth[1]);
      res.send({
        message: "Thanks for visiting the secret endpoint.",
        data
      });
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
});

module.exports = router;
