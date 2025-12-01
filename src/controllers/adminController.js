const connection = require("../config/database.js");
const upload = require("../middleware/uploads.js");
const {
  DanhSachUsers,
  getUser,
  EditUser,
  DeleteUser,
  SignUp,
} = require("../services/CRUD_user.js"); // Khach

const {
  addBook,
  getDanhSach,
  postEditSach,
  getEditSach,
  getTheLoai,
  getDeleteSach,
  DanhSachTheLoai,
  ThemTheLoai,
  layTheLoai,
  SuaTheLoai,
  XoaTheLoai,
  TongSLSach,
  SachENhieuNhat,
  SachTonItNhat,
  TheLoaiNhieuSachNhat,
} = require("../services/CRUD_sach.js");

const {
  DanhSachDonHang,
  CapNhatTrangThai,
  ThongTinDon,
  SanPhamTrongDon,
  ThanhTien,
} = require("../services/CRUD_donhang.js");
const getHome = (req, res) => {
  res.render("admin/home");
};
const getDangXuat = (req, res) => {
  req.session.destroy();
  res.redirect("/home");
};
// Khach hang
const getQuanLyKhachHang = async (req, res) => {
  const kq = await DanhSachUsers();
  res.render("admin/QL_users/quanlykhachhang", { user: kq });
};
const getEditUser = async (req, res) => {
  const user_id = req.params.user_id;
  let user = await getUser(user_id);
  res.render("admin/QL_users/edit_user", {
    users: user,
    error: req.query.error,
  });
};
const postEditUser = async (req, res) => {
  const user_id = req.params.user_id;
  let { taikhoan, matkhau, hoten, email } = req.body;
  let kq = await EditUser(taikhoan, matkhau, hoten, email, user_id);
  if (kq === 1) {
    return res.redirect("/quanlykhachhang");
  } else {
    return res.redirect(`/edit_user/${user_id}?error=1`);
  }
};

const deleteUser = async (req, res) => {
  let user_id = req.params.user_id;
  await DeleteUser(user_id);
  res.redirect("/quanlykhachhang");
};

//A
const getAddUser = (req, res) => {
  res.render("admin/QL_users/add_user", { error: req.query.error });
};
const postAddUser = async (req, res) => {
  let { taikhoan, matkhau, hoten, email } = req.body;
  let kq = await SignUp(taikhoan, matkhau, hoten, email);
  if (kq === 0) {
    return res.redirect("/add_user?error=2");
  } else {
    return res.redirect("/quanlykhachhang");
  }
};

// ------------------- sach ---------------------------
const getQuanLySach = async (req, res) => {
  let row = await getDanhSach();
  let theloai = await DanhSachTheLoai();
  let sachtonitnhat = await SachTonItNhat();
  let sachtonnhieunhat = await SachENhieuNhat();
  let tongsach = await TongSLSach();
  let theloainhieusach = await TheLoaiNhieuSachNhat();
  res.render("admin/QL_sach/quanlysach", {
    sach: row,
    theloai,
    sachtonnhieunhat,
    sachtonitnhat,
    tongsach,
    theloainhieusach,
  });
};

const getAddSach = async (req, res) => {
  let theloai = await getTheLoai();
  res.render("admin/QL_sach/add_sach", { theloai: theloai });
};

const postAddBook = async (req, res) => {
  let hinhanh = req.file.filename;
  let { tensach, tentacgia, ngayphathanh, giaban, sl_tonkho, matheloai, mota } =
    req.body;
  await addBook(
    tensach,
    tentacgia,
    matheloai,
    ngayphathanh,
    giaban,
    sl_tonkho,
    mota,
    hinhanh
  );
  res.redirect("/admin/quanlysach");
};

const getEditBook = async (req, res) => {
  let masach = req.params.masach;
  let row = await getEditSach(masach);
  let theloai = await getTheLoai();
  res.render("admin/QL_sach/edit_sach", { sach: row, theloai });
};
const postEditBook = async (req, res) => {
  let masach = req.params.masach;
  let hinhanh = req.file ? req.file.filename : req.body.oldImage;
  let { tensach, tentacgia, ngayphathanh, giaban, sl_tonkho, matheloai, mota } =
    req.body;
  await postEditSach(
    tensach,
    tentacgia,
    matheloai,
    ngayphathanh,
    giaban,
    sl_tonkho,
    mota,
    hinhanh,
    masach
  );
  res.redirect("/admin/quanlysach");
};

const getDeleteBook = async (req, res) => {
  let masach = req.params.masach;
  await getDeleteSach(masach);
  res.redirect("/admin/quanlysach");
};

////// the loai ////
const getThemTheLoai = (req, res) => {
  res.render("admin/QL_sach/add_theloai", { error: req.query.error });
};

const postThemTheLoai = async (req, res) => {
  let tentheloai = req.body.tentheloai;
  let kq = await ThemTheLoai(tentheloai);
  if (kq == 1) {
    res.redirect("/admin/quanlysach");
  } else {
    res.render("admin/QL_sach/add_theloai", {
      error: 1,
    });
  }
};

const getSuaTheLoai = async (req, res) => {
  let matheloai = req.params.matheloai;
  let theloai = await layTheLoai(matheloai);
  res.render("admin/QL_sach/edit_theloai", { theloai, error: req.query.error });
};

const postSuaTheLoai = async (req, res) => {
  let matheloai = req.params.matheloai;
  let tentheloai = req.body.tentheloai;
  let theloai = await layTheLoai(matheloai);
  let kq = await SuaTheLoai(matheloai, tentheloai);
  if (kq == 0) {
    res.render("admin/QL_sach/edit_theloai", { theloai, error: 2 });
  } else {
    res.redirect("/admin/quanlysach");
  }
};

const getXoaTheLoai = async (req, res) => {
  let matheloai = req.params.matheloai;
  await XoaTheLoai(matheloai);
  res.redirect("/admin/quanlysach");
};

// don hang

const getQuanLyDonHang = async (req, res) => {
  let DS_donhang = await DanhSachDonHang();
  res.render("admin/QL_donhang/quanlydonhang", { DS_donhang });
};

const postCapNhatTrangThai = async (req, res) => {
  let madonhang = req.params.madonhang;
  let trangthai = req.body.trangthai;
  await CapNhatTrangThai(madonhang, trangthai);
  res.redirect("/admin/quanlydonhang");
};

const getChiTietDonHang = async (req, res) => {
  let madonhang = req.params.madonhang;
  let thongtindon = await ThongTinDon(madonhang);
  let sanpham = await SanPhamTrongDon(madonhang);
  let thanhtien = await ThanhTien(madonhang);
  res.render("admin/QL_donhang/donhang_chitiet", {
    thongtindon,
    sanpham,
    thanhtien,
  });
};
module.exports = {
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
};
