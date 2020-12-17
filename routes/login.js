const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const logindata = require("../data/login");
const userData = require("../data/users");

function checkUsernamePassword(uname, pswd) {
  uname = uname.trim();
  if (uname == "" || typeof uname != "string" || !uname) {
    throw `Please enter username`;
  }

  if (pswd == "" || typeof pswd != "string" || !pswd) {
    throw `Please enter password`;
  }
}

router.get("/", async (req, res) => {
  res.render("posts/login", { title: "Log In" });
});

router.post("/check", async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  checkUsernamePassword(username, password);
  try {
    const users = await logindata.check(username, password);
    if(users!=null){
      // console.log(users)
      req.session.user = {"username": username};

      res.redirect("/");
    }
    res.status(401).render("posts/login", { message: "Username or password is not correct" });
  } catch (e) {
    res.status(401).render("posts/login", { message: e });
  }
});

router.get("/check_user_email", async (req, res) => {});

router.get("/check_username", async (req, res) => {
  let username = req.params.username;
  const result = await userData.check_usernames(username);
  return result;
});

module.exports = router;
