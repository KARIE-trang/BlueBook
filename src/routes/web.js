const express = require("express");
const router = express.Router();
const { requireLogin, requireAdmin } = require("../middleware/auth.js");
const {
  getHome,
  getDangNhap,
  getDangKy,
  postDangKy,
  postDangNhap,
  getDangXuat,
  getSanPham,
  getSach,
} = require("../controllers/homeControllers.js");

router.get("/home", getHome);
router.get("/login", getDangNhap);
router.post("/login", postDangNhap);
router.get("/register", getDangKy);
router.post("/register", postDangKy);
router.get("/logout", getDangXuat);
router.get("/sanpham", getSanPham);
router.get("/sanpham/book", getSach);
module.exports = router;
