const express = require("express");
const { getUsers } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, getUsers);

module.exports = router;
