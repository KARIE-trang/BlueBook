const connection = require("../config/database.js");
const { LoginUsers, SignUp } = require("../services/CRUD_user.js");
const getHome = (req, res) => {
  res.render("home", { users: req.session.users });
};
const getDangNhap = (req, res) => {
  res.render("log_in", { error: req.query.error, mode: "login" });
};

const postDangNhap = async (req, res) => {
  let { taikhoan, matkhau } = req.body;
  let result = await LoginUsers(taikhoan);
  if (result.length === 0 || matkhau != result[0].matkhau) {
    res.redirect("/login?error=3");
  } else {
    req.session.users = result[0];
    if (result[0].role === "ADMIN") {
      res.redirect("/admin/home");
    } else {
      res.redirect("/home");
    }
  }
};
const getDangKy = (req, res) => {
  res.render("log_in", { error: req.query.error, mode: "register" });
};

const postDangKy = async (req, res) => {
  let { taikhoan, matkhau, nhaplaimatkhau, hoten, email } = req.body;
  if (nhaplaimatkhau != matkhau) {
    res.redirect("/register?error=2");
  } else {
    let status = await SignUp(taikhoan, matkhau, hoten, email);
    if (status === 1) {
      res.redirect("/login");
    } else {
      res.redirect("/register?error=1");
    }
  }
};

const getDangXuat = (req, res) => {
  req.session.destroy();
  res.redirect("/home");
};

module.exports = {
  getHome,
  getDangNhap,
  getDangKy,
  postDangKy,
  postDangNhap,
  getDangXuat,
};
