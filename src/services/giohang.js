const connection = require("../config/database");

//them vao gio hang
const ThemGioHang = async (user_id, masach) => {
  let [kt] = await connection.query(
    `SELECT * FROM giohang 
     WHERE trangthai = 'DANG_MO' AND user_id = ?`,
    [user_id]
  ); // nay la kiem tra gio hagn xem mo hay chua
  if (kt[0]) {
    let magiohang = kt[0].magiohang;
    let [sach] = await connection.query(
      `SELECT * FROM chi_tietgiohang 
       WHERE masach = ? AND magiohang = ?`,
      [masach, magiohang]
    );
    if (sach[0]) {
      await connection.query(
        `UPDATE chi_tietgiohang 
         SET soluong = soluong + 1 
         WHERE masach = ? AND magiohang = ?`,
        [masach, magiohang]
      );
    } else {
      await connection.query(
        `INSERT INTO chi_tietgiohang(magiohang, masach, soluong)
         VALUES (?,?,1)`,
        [magiohang, masach]
      );
    }
  } else {
    const [kq] = await connection.query(
      `INSERT INTO giohang(user_id) VALUES (?)`,
      [user_id]
    );
    let magiohang = kq.insertId;
    await connection.query(
      `INSERT INTO chi_tietgiohang(magiohang, masach, soluong)
       VALUES (?,?,1)`,
      [magiohang, masach]
    );
  }
};

module.exports = { ThemGioHang };
