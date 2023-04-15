const express = require("express");
const router = express.Router();
let user = require("./user");

router.use((req, res, next) => {
  if (req.headers["app-origins"]) {
    next();
  } else {
    res.json("direct access not allowed");
  }
});

router.use("/auth", user);
module.exports = router;
