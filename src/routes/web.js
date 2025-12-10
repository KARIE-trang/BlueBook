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

const {
  getGioHang,
  postThemGioHang,
  getThanhToan,
  getDatHangThanhCong,
  editProfile,
  getDonMua,
  getDoiMatKhau,
} = require("../controllers/userController.js");

router.get("/home", getHome);
router.get("/login", getDangNhap);
router.post("/login", postDangNhap);
router.get("/register", getDangKy);
router.post("/register", postDangKy);
router.get("/logout", getDangXuat);
router.get("/sanpham", getSanPham);
router.get("/sanpham/book/:masach", getSach);

router.get("/user/giohang", requireLogin, getGioHang);
router.post("/user/add_giohang/:masach", requireLogin, postThemGioHang);

router.get("/user/thanhtoan", requireLogin, getThanhToan);
router.get("/user/dathangthanhcong", requireLogin, getDatHangThanhCong);
router.get("/edit_profile", requireLogin, editProfile);
router.get("/user/donmua", requireLogin, getDonMua);
router.get("/user/doimatkhau", requireLogin, getDoiMatKhau);

module.exports = router;
