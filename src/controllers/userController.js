const connection = require("../config/database.js");
const {
  ThemGioHang,
  SpTrongGioHang,
  updatesoluong,
  xoaSanPham,
  TongTienGioHang,
} = require("../services/giohang.js");

const { ThanhToan } = require("../services/CRUD_donhang.js");

const getGioHang = async (req, res) => {
  let user_id = req.session.users.user_id;
  let sanpham = await SpTrongGioHang(user_id);
  let tongtien = { tongtien: 0 };
  if (sanpham && sanpham.length > 0) {
    tongtien = await TongTienGioHang(user_id);
    if (!tongtien || tongtien.tongtien == null) {
      tongtien = { tongtien: 0 };
    }
  }
  res.render("user/giohang", {
    users: req.session.users,
    sanpham,
    error: req.query.error,
    masachloi: req.query.masachloi,
    tongtien,
  });
};

const postThemGioHang = async (req, res) => {
  let user_id = req.session.users.user_id;
  let masach = req.params.masach;
  await ThemGioHang(user_id, masach);
  res.redirect("/sanpham?filter=tatca");
};

const getUpdateSoLuong = async (req, res) => {
  let { masach, magiohang, update } = req.query;
  let kq = await updatesoluong(magiohang, masach, update);
  if (kq == 1) {
    res.redirect("/user/giohang");
  } else {
    return res.redirect(`/user/giohang?error=het-hang&masachloi=${kq}`);
  }
};

const getXoaSanPham = async (req, res) => {
  let { magiohang, masach } = req.params;
  await xoaSanPham(magiohang, masach);
  res.redirect("/user/giohang");
};

const getThanhToan = async (req, res) => {
  let user_id = req.session.users.user_id;
  let sach = await SpTrongGioHang(user_id);
  let tongtien = await TongTienGioHang(user_id);
  res.render("user/thanhtoan", { sach, tongtien });
};

const postThanhToan = async (req, res) => {
  let user_id = req.session.users.user_id;
  let { tennguoinhan, sdt_giao, diachi_giao, ghichu } = req.body;
  let kq = await ThanhToan(
    user_id,
    tennguoinhan,
    sdt_giao,
    diachi_giao,
    ghichu
  );
  res.redirect("/home");
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
  getUpdateSoLuong,
  getXoaSanPham,
  postThanhToan,
};
