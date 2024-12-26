const express = require("express");
const UserRouter = require("./User");
const AccountRouter = require("./Account");
const router = express.Router();
router.use("/users",UserRouter);
router.use("/account",AccountRouter);
module.exports = router;