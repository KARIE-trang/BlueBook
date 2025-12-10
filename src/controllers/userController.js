const connection = require("../config/database.js");
const { ThemGioHang } = require("../services/giohang.js");

const getGioHang = async (req, res) => {
  res.render("user/giohang");
};
const postThemGioHang = async (req, res) => {
  let user_id = req.session.users.user_id;
  let masach = req.params.masach;
  await ThemGioHang(user_id, masach);
  res.redirect("/sanpham?filter=tatca");
};
const getThanhToan = async (req, res) => {
  res.render("user/thanhtoan");
};

const getDatHangThanhCong = async (req, res) => {
  res.render("user/dathangthanhcong");
};

const editProfile = (req, res) => {
  res.render("user/edit_profile", { users: req.session.users });
};

const getDonMua = (req, res) => {
  res.render("user/donmua");
};

const getDoiMatKhau = (req, res) => {
  res.render("user/doimatkhau");
};
module.exports = {
  getGioHang,
  postThemGioHang,
  getThanhToan,
  getDatHangThanhCong,
  editProfile,
  getDonMua,
  getDoiMatKhau,
};
