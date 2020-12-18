const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const bcrypt = require("bcryptjs");
const xss = require("xss");

function checksForNewUser(
  first_name,
  last_name,
  username,
  age,
  email,
  state,
  country,
  password
) {
  first_name = first_name.trim();

  if (!first_name || typeof first_name != "string" || first_name == "") {
    throw "First name is not in proper format";
  }

  last_name = last_name.trim();

  if (!last_name || typeof last_name != "string" || last_name == "") {
    throw "Last name is not in proper format";
  }

  username = username.trim();

  if (!username || typeof username != "string" || username == "") {
    throw "username is not in proper format";
  }

  age = age.trim();
  try {
    age = Number(age);
  } catch (e) {
    throw "Error provided age is not a number.";
  }

  email = email.trim();
  const emailre = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailre.test(email.toLowerCase()) === false) {
    throw "Email is not in proper format";
  }
  if (!email || typeof email != "string" || email == "") {
    throw "Email is not in proper format";
  }

  state = state.trim();

  if (!state || typeof state != "string" || state == "") {
    throw "State is not in proper format";
  }

  country = country.trim();

  if (!country || typeof country != "string" || country == "") {
    throw "Country is not in proper format";
  }

  password = password.trim();

  if (!password || typeof password != "string" || password == "") {
    throw "Password field is empty";
  }

  if (password.length < 8) {
    throw "Password length should be minimum 8 char";
  }
}

router.get("/", async (req, res) => {
  if (req.session.user) {
    if (req.session.user.admin) {
      // res.render("posts/homepage", {
      //   title: "Sign Up",
      //   // data: games,
      //   userLoggedIn: true,
      //   userAdmin: true,
      // });
      // return;

      res.redirect("/");
      return;
    } else {
      res.redirect("/");
      return;
    }
  } else {
    // console.log("hello2");
    // userLoggedIn = false;
    res.status(200).render("posts/signup", {
      title: "Sign Up",
      // data: games,
      userLoggedIn: false,
      userAdmin: false,
    });
    return;
  }
  // res.render("posts/signup", { title: "Sign Up" });
  // return;
});

router.get("/username", async (req, res) => {
  const usernme = await userData.check_usernames(req.body.username);
  return usernme;
  //   res.render("posts/signup", { title: "Sign Up" });
});

router.post("/newuser", async (req, res) => {
  data = req.body;
  try {
    checksForNewUser(
      xss(first_name),
      xss(data.last_name),
      xss(data.username),
      xss(data.age),
      xss(data.email),
      xss(data.state),
      xss(data.country),
      xss(data.password)
    );
    const hashedPassword = await bcrypt.hash(data.password, 16);
    const user = await userData.create(
      data.first_name,
      data.last_name,
      data.username,
      data.age,
      data.email,
      false,
      data.state,
      data.country,
      hashedPassword
    );
    res.render("posts/login", {
      title: "Sign Up",
      message: "Account created, please login.",
    });
    return;
  } catch (e) {
    res.render("posts/signup", { title: "Sign Up", message: e });
    return;
  }
});

module.exports = router;
