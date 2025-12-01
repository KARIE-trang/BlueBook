const express = require("express");
const router = express.Router();
const {
  getHome,
  getDangNhap,
  getDangKy,
  postDangKy,
  postDangNhap,
  getDangXuat,
} = require("../controllers/homeControllers.js");

router.get("/home", getHome);
router.get("/login", getDangNhap);
router.post("/login", postDangNhap);
router.get("/register", getDangKy);
router.post("/register", postDangKy);
router.get("/logout", getDangXuat);

module.exports = router;
