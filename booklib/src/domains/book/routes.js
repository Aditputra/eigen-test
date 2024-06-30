const express = require("express");
const router = express.Router();

const { getBook, createBook } = require("./controller");

router.get("/getBook", getBook);
router.post("/createBook", createBook);

module.exports = router;
