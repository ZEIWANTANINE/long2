const express = require("express");
const { register, login } = require("../controllers/authController");
const { addTeacherInfo, addResearcherInfo } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/add-teacher-info", addTeacherInfo);
router.post("/add-researcher-info", addResearcherInfo);
module.exports = router;
