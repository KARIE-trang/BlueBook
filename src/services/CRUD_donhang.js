const connection = require("../config/database.js");

const DanhSachDonHang = async (trangthai = "", from = null, to = null) => {
  let [kq] = await connection.query(
    `
    SELECT 
      donhang.madonhang,
      donhang.ngaymua,
      users.taikhoan,
      donhang.trangthai,
      SUM(donhang_sach.soluong * donhang_sach.gia) AS tongtien
    FROM donhang
    JOIN donhang_sach 
      ON donhang.madonhang = donhang_sach.madonhang
    JOIN users 
      ON users.user_id = donhang.user_id
    WHERE ( ? = '' OR donhang.trangthai = ? )
      AND ( ? IS NULL OR DATE(donhang.ngaymua) >= ? )
      AND ( ? IS NULL OR DATE(donhang.ngaymua) <= ? )
    GROUP BY donhang.madonhang, donhang.ngaymua, users.taikhoan, donhang.trangthai
    ORDER BY donhang.ngaymua DESC
    `,
    [trangthai, trangthai, from, from, to, to]
  );

  return kq;
};

const CapNhatTrangThai = async (madonhang, trangthai) => {
  const [kq] = await connection.query(
    "SELECT trangthai FROM donhang WHERE madonhang = ?",
    [madonhang]
  );

  if (!kq.length) return;
  const trangThaiCu = kq[0].trangthai;

  await connection.query(
    "UPDATE donhang SET trangthai = ? WHERE madonhang = ?",
    [trangthai, madonhang]
  );

  if (trangthai === "HUY" && trangThaiCu !== "HUY") {
    const [items] = await connection.query(
      "SELECT masach, soluong FROM donhang_sach WHERE madonhang = ?",
      [madonhang]
    );

    for (let sp of items) {
      await connection.query(
        "UPDATE sach SET sl_tonkho = sl_tonkho + ? WHERE masach = ?",
        [sp.soluong, sp.masach]
      );
    }
  }
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
