const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads.js");

const {
  getHome,
  getDangXuat,
  getQuanLyKhachHang,
  getEditUser,
  postEditUser,
  deleteUser,
  getAddUser,
  postAddUser,
  getQuanLySach,
  getAddSach,
  postAddBook,
  getEditBook,
  postEditBook,
  getDeleteBook,
  getThemTheLoai,
  postThemTheLoai,
  getSuaTheLoai,
  postSuaTheLoai,
  getXoaTheLoai,
  getQuanLyDonHang,
  getChiTietDonHang,
  postCapNhatTrangThai,
} = require("../controllers/adminController.js");
router.get("/admin/home", getHome);
//QLkhachhang
router.get("/quanlykhachhang", getQuanLyKhachHang);
router.get("/logout", getDangXuat);
router.get("/edit_user/:user_id", getEditUser);
router.post("/edit_user/:user_id", postEditUser);
router.get("/delete/:user_id", deleteUser);
router.get("/add_user", getAddUser);
router.post("/add_user", postAddUser);
//QL sach
router.get("/admin/quanlysach", getQuanLySach);
router.get("/admin/add_book", getAddSach);
router.post("/admin/add_book", upload.single("hinhanh"), postAddBook);
router.get("/admin/edit_book/:masach", getEditBook);
router.post("/admin/edit_book/:masach", upload.single("hinhanh"), postEditBook);
router.get("/admin/delete_book/:masach", getDeleteBook);
//QL thể loại
router.get("/admin/add_theloai", getThemTheLoai);
router.post("/admin/add_theloai", postThemTheLoai);
router.get("/admin/edit_theloai/:matheloai", getSuaTheLoai);
router.post("/admin/edit_theloai/:matheloai", postSuaTheLoai);
router.get("/admin/delete_theloai/:matheloai", getXoaTheLoai);
//QL don hang
router.get("/admin/quanlydonhang", getQuanLyDonHang);
router.post(
  "/admin/quanlydonhang/capnhattrangthai/:madonhang",
  postCapNhatTrangThai
);
router.get("/admin/quanlydonhang/chitietdonhang/:madonhang", getChiTietDonHang);

module.exports = router;
