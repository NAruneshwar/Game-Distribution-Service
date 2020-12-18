const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const logindata = require("../data/login");
const userData = require("../data/users");
const session = require("express-session");

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
  if (req.session.user) {
    userLoggedIn = true;
    if (req.session.user.admin) {
      res.render("posts/admin-homepage", {
        title: "Admin Homepage",
        userLoggedIn: userLoggedIn,
        userAdmin: req.session.user.admin,
      });
      return;
    } else {
      res.redirect("/");
      return;
      // res.render("posts/homepage", {
      //   title: "Home",
      //   userLoggedIn: userLoggedIn,
      //   userAdmin: req.session.user.admin,
      // });
      // return;
    }
  } else {
    userLoggedIn = false;
    res.render("posts/login", {
      title: "Log In",
      userLoggedIn: false,
      userAdmin: false,
    });
    return;
  }
  // return res.render("posts/login", { title: "Log In" });
});

router.post("/check", async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  checkUsernamePassword(username, password);
  // console.log(username);
  try {
    const users = await logindata.check(username, password);
    // console.log(users);
    if (users != null) {
      // console.log(users)
      req.session.user = {
        username: username,
        uid: users._id,
        admin: users.admin,
      };
      if (req.session.user) {
        if (req.session.user.admin) {
          // console.log("hello1");
          res.render("posts/admin-homepage", {
            title: "Admin Homepage",
            userLoggedIn: true,
            userAdmin: true,
          });
          return;
        } else {
          // console.log("hello2");
          res.redirect("/games");
          // res.render("posts/homepage", {
          //   title: "Homepage",
          //   userLoggedIn: true,
          //   userAdmin: false,
          // });
          return;
        }
      }
      // res.redirect("/");
      // return;
    } else {
      res.status(401).render("posts/login", {
        message: "Username or password is not correct",
      });
      return;
    }
  } catch (e) {
    return res.status(401).render("posts/login", { message: e });
  }
});

router.get("/check_user_email", async (req, res) => {});

router.get("/check_username", async (req, res) => {
  let username = req.params.username;
  const result = await userData.check_usernames(username);
  return result;
});

router.get("/logout", async (req, res) => {
  if (req.session.user) {
    const newDelCookie = new Date();
    newDelCookie.setHours(newDelCookie.getHours() - 1);
    res.cookie("lastAccessed", "", { expires: newDelCookie });
    res.clearCookie("lastAccessed");
    req.session.destroy();

    // req.logout();
    // req.session = null;
    // req.session.destroy(function (err) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     // console.log(session.email);
    //     req.end();
    //     res.redirect("/");
    //   }
    // });
    // req.session = null;
    res.redirect("/");
    return;
  } else {
    return res.redirect("/");
  }
});

module.exports = router;
