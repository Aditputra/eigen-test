const express = require("express");
const router = express.Router();

const { createBookMember, updateBookMember } = require("./controller");

router.post("/createBookMember", createBookMember);
router.post("/updateBookMember", updateBookMember);

module.exports = router;
