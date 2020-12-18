const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  if (req.session.user) {
    if (req.session.user.admin) {
      res.render("posts/about", {
        title: "About Us",
        userLoggedIn: true,
        userAdmin: true,
      });
      return;
    } else {
      res.render("posts/about", {
        title: "About Us",
        userLoggedIn: true,
        userAdmin: false,
      });
      return;
    }
  } else {
    // console.log("hello2");
    res.status(200).render("posts/about", {
      title: "About Us",
      userLoggedIn: false,
      userAdmin: false,
    });
    return;
  }
  // return res.render("posts/about", { title: "About Us" });
});

module.exports = router;
