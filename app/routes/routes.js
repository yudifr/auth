const express = require("express");
const router = express.Router();
let institution = require("./institution");

router.use((req, res, next) => {
  if (req.headers["app-origins"]) {
    next();
  } else {
    res.json("direct access not allowed");
  }
});

router.use("/institution", institution);
module.exports = router;
