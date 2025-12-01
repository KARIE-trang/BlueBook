const connection = require("../config/database.js");

const getDanhSach = async () => {
  let [kq] = await connection.query(
    "select sach.*, tentheloai from sach join theloai on theloai.matheloai = sach.matheloai"
  );
  return kq;
};
const getTheLoai = async () => {
  let [kq] = await connection.query("select * from theloai");
  return kq;
};

const addBook = async (
  tensach,
  tentacgia,
  matheloai,
  ngayphathanh,
  giaban,
  sl_tonkho,
  mota,
  hinhanh
) => {
  await connection.query(
    "insert into sach(tensach, tentacgia, matheloai, ngayphathanh, giaban, sl_tonkho, mota, hinhanh) values (?,?,?,?,?,?,?,?)",
    [
      tensach,
      tentacgia,
      matheloai,
      ngayphathanh,
      giaban,
      sl_tonkho,
      mota,
      hinhanh,
    ]
  );
  return 1;
};

const getEditSach = async (masach) => {
  let [kq] = await connection.query(
    "select sach.*, tentheloai from sach join theloai on theloai.matheloai = sach.matheloai where masach = ?",
    [masach]
  );
  if (kq[0].ngayphathanh) {
    kq[0].ngayphathanh = kq[0].ngayphathanh.toISOString().split("T")[0];
  }
  return kq[0];
};

const postEditSach = async (
  tensach,
  tentacgia,
  matheloai,
  ngayphathanh,
  giaban,
  sl_tonkho,
  mota,
  hinhanh,
  masach
) => {
  await connection.query(
    "update sach set tensach = ?, tentacgia = ?, matheloai = ?, ngayphathanh = ?, giaban = ?, sl_tonkho = ?,mota = ?, hinhanh = ? where masach = ?",
    [
      tensach,
      tentacgia,
      matheloai,
      ngayphathanh,
      giaban,
      sl_tonkho,
      mota,
      hinhanh,
      masach,
    ]
  );
};

const getDeleteSach = async (masach) => {
  await connection.query("delete from sach where masach = ?", [masach]);
};
// the loai
const DanhSachTheLoai = async () => {
  let [kq] = await connection.query(
    "select theloai.matheloai, tentheloai, count(masach) as soluongsach from theloai left join sach on sach.matheloai = theloai.matheloai group by theloai.matheloai, tentheloai"
  );
  return kq;
};

const ThemTheLoai = async (tentheloai) => {
  let [kq] = await connection.query(
    "select * from theloai where tentheloai = ?",
    [tentheloai]
  );
  if (kq.length > 0) {
    return 0;
  } else {
    await connection.query("insert into theloai(tentheloai) values (?)", [
      tentheloai,
    ]);
    return 1;
  }
};

const layTheLoai = async (matheloai) => {
  let [kq] = await connection.query(
    "select * from theloai where matheloai = ?",
    [matheloai]
  );
  return kq[0];
};
const SuaTheLoai = async (matheloai, tentheloai) => {
  let [kq] = await connection.query(
    "select * from theloai where tentheloai = ?",
    [tentheloai]
  );
  if (kq.length > 0) {
    if (kq[0].matheloai != matheloai) {
      return 0;
    }
  }
  await connection.query(
    "update theloai set tentheloai = ? where matheloai = ?",
    [tentheloai, matheloai]
  );
  return 1;
};

const XoaTheLoai = async (matheloai) => {
  await connection.query("delete from theloai where matheloai = ?", [
    matheloai,
  ]);
  return 1;
};

const TongSLSach = async () => {
  let [kq] = await connection.query(
    "select sum(sl_tonkho) as soluong from sach"
  );
  return kq[0];
};

const SachTonItNhat = async () => {
  let [kq] = await connection.query(
    "select * from sach order by sl_tonkho asc limit 1"
  );
  return kq[0];
};

const SachENhieuNhat = async () => {
  let [kq] = await connection.query(
    "select * from sach order by sl_tonkho desc limit 1"
  );
  return kq[0];
};

const TheLoaiNhieuSachNhat = async () => {
  let [kq] = await connection.query(
    "select theloai.matheloai, tentheloai, sum(sl_tonkho) as sl from theloai join sach on sach.matheloai = theloai.matheloai group by theloai.matheloai, tentheloai order by sum(sl_tonkho) desc limit 1"
  );
  return kq[0];
};
module.exports = {
  addBook,
  getTheLoai,
  getDanhSach,
  getEditSach,
  postEditSach,
  getDeleteSach,
  DanhSachTheLoai,
  ThemTheLoai,
  SuaTheLoai,
  layTheLoai,
  XoaTheLoai,
  TongSLSach,
  SachENhieuNhat,
  SachTonItNhat,
  TheLoaiNhieuSachNhat,
};
