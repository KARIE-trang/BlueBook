const connection = require("../config/database.js");
const {
  ThemGioHang,
  SpTrongGioHang,
  updatesoluong,
  xoaSanPham,
  TongTienGioHang,
} = require("../services/giohang.js");
const { getUser, EditUser } = require("../services/CRUD_user.js");
const { ThanhToan } = require("../services/CRUD_donhang.js");
const { getEditSach } = require("../services/CRUD_sach.js");

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
  const user_id = req.session.users.user_id;
  const masach = req.params.masach;
  await ThemGioHang(user_id, masach);
  if (req.body.source === "detail") {
    return res.redirect(`/sanpham/book/${masach}?msg=ADD_OK`);
  }
  return res.redirect(req.get("referer") || "/sanpham?filter=tatca");
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
  const user_id = req.session.users.user_id;
  const sach = await SpTrongGioHang(user_id);
  const tongtien = await TongTienGioHang(user_id);
  return res.render("user/thanhtoan", { sach, tongtien });
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
  res.redirect(`/user/dathangthanhcong/${kq}`);
};
const getDatHangThanhCong = async (req, res) => {
  let madonhang = req.params.madonhang;
  res.render("user/dathangthanhcong", { madonhang });
};

const editProfile = async (req, res) => {
  let user_id = req.session.users.user_id;
  let user = await getUser(user_id);
  if (req.method === "POST") {
    const hoten = (req.body.hoten || "").trim();
    const email = (req.body.email || "").trim();
    let kq = await EditUser(user.taikhoan, user.matkhau, hoten, email, user_id);
    if (kq == 0) {
      return res.render("user/edit_profile", {
        users: req.session.users,
        user,
        error: "emailtontai",
        success: null,
      });
    }
    let userNew = await getUser(user_id);
    req.session.users = userNew;

    return res.render("user/edit_profile", {
      users: req.session.users,
      user: userNew,
      error: null,
      success: "thanhcong",
    });
  }
  return res.render("user/edit_profile", {
    users: req.session.users,
    user,
    error: null,
    success: null,
  });
};

const getDonMua = (req, res) => {
  res.render("user/donmua", { users: req.session.users });
};

const getDoiMatKhau = (req, res) => {
  res.render("user/doimatkhau", { users: req.session.users });
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
