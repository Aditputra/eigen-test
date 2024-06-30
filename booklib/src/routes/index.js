const express = require("express");
const router = express.Router();

const bookRoutes = require("./../domains/book/routes");
const memberRoutes = require("./../domains/member/routes");
const bookMemberRoutes = require("./../domains/bookMember/routes");

router.use("/book", bookRoutes);
router.use("/member", memberRoutes);
router.use("/book-member", bookMemberRoutes);

module.exports = router;
