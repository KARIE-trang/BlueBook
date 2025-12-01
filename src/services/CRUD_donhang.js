const connection = require("../config/database.js");

const DanhSachDonHang = async () => {
  let [kq] = await connection.query(
    "select donhang.madonhang, ngaymua, taikhoan, sum(soluong * gia)as tongtien , trangthai from donhang join donhang_sach on donhang.madonhang = donhang_sach.madonhang join users on users.user_id = donhang.user_id group by donhang.madonhang, ngaymua, taikhoan,trangthai order by ngaymua desc"
  );
  return kq;
};

const CapNhatTrangThai = async (madonhang, trangthai) => {
  await connection.query(
    "update donhang set trangthai = ? where madonhang = ?",
    [trangthai, madonhang]
  );
};

const ThongTinDon = async (madonhang) => {
  let [kq] = await connection.query(
    "select madonhang, ngaymua, trangthai , ghichu, tennguoinhan, sdt_giao,  diachi_giao from donhang where madonhang = ?",
    [madonhang]
  );
  if (kq[0].ngaymua) {
    kq[0].ngaymua = kq[0].ngaymua.toISOString().split("T")[0];
  }
  return kq[0];
};

const SanPhamTrongDon = async (madonhang) => {
  let [kq] = await connection.query(
    "select hinhanh,tensach, gia, soluong, (gia*soluong) as tongtien from sach join donhang_sach on sach.masach = donhang_sach.masach where madonhang = ?",
    [madonhang]
  );
  return kq;
};

const ThanhTien = async (madonhang) => {
  let [kq] = await connection.query(
    "select madonhang, sum(gia*soluong) as thanhtien from sach join donhang_sach on sach.masach = donhang_sach.masach where madonhang = ? group by madonhang",
    [madonhang]
  );
  return kq[0];
};
module.exports = {
  DanhSachDonHang,
  CapNhatTrangThai,
  ThongTinDon,
  SanPhamTrongDon,
  ThanhTien,
};
