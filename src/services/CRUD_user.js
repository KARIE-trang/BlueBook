const connection = require("../config/database.js");
//login
const LoginUsers = async (taikhoan) => {
  let [results] = await connection.query(
    "select * from users where taikhoan = ?",
    [taikhoan]
  );
  return results;
};

// sign up
const SignUp = async (taikhoan, matkhau, hoten, email) => {
  let [results] = await connection.query(
    "select * from users where taikhoan = ? or email = ?",
    [taikhoan, email]
  );
  if (results.length === 0) {
    let [rows] = await connection.query(
      "insert into users(taikhoan, matkhau, hoten, email) values (?,?,?,?)",
      [taikhoan, matkhau, hoten, email]
    );
    return 1;
  } else {
    return 0;
  }
};

const DanhSachUsers = async () => {
  let [results] = await connection.query("select * from users");
  return results;
};

//C
const getUser = async (user_id) => {
  let [result] = await connection.query(
    "select * from users where user_id = ?",
    [user_id]
  );
  return result[0];
};

const EditUser = async (taikhoan, matkhau, hoten, email, user_id) => {
  let [kiemtrataikhoan] = await connection.query(
    "select * from users where (taikhoan = ? or email = ?) and user_id != ? ",
    [taikhoan, email, user_id]
  );
  if (kiemtrataikhoan.length > 0) {
    return 0;
  } else {
    let [result] = await connection.query(
      "update users set taikhoan=?, matkhau = ?,hoten = ?, email = ? where user_id = ?",
      [taikhoan, matkhau, hoten, email, user_id]
    );
    return 1;
  }
};

//D
const DeleteUser = async (user_id) => {
  let [results] = await connection.query(
    "delete from users where user_id = ?",
    [user_id]
  );
};

module.exports = {
  LoginUsers,
  SignUp,
  DanhSachUsers,
  getUser,
  EditUser,
  DeleteUser,
};
