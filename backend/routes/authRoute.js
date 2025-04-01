const express = require("express");
const { register, login } = require("../controllers/authController");
const { addTeacherInfo, addResearcherInfo } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add-teacher-info", authMiddleware,addTeacherInfo);
router.post("/add-researcher-info",authMiddleware, addResearcherInfo);
module.exports = router;
