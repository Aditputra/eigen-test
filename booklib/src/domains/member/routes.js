const express = require("express");
const router = express.Router();

const { getMember, createMember } = require("./controller");

router.get("/getMember", getMember);
router.post("/createMember", createMember);

module.exports = router;
