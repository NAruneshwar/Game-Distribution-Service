const express = require("express");
const router = express.Router();
const profileData = require("../data/profile");
const gameData = require("../data/games");

router.get("/:user_id", async (req, res) => {
  let user_id = req.params.user_id;
  try {
    let user = await profileData.getUserInfo(user_id);
    let games = [];
    for (let i of user.game_ids) {
      games.push(await gameData.getOne(i));
    }
    res.render("posts/profile", {
      title: "Your profile",
      data: user,
      games: games,
    });
  } catch (e) {
    res
      .status(401)
      .render("posts/profile", { title: "Your profile", message: e });
  }
});

router.delete("/delete/:user_id", async (req, res) => {
  //for admin only... sessions required
  //Delete a player's profile.
  if (req.session.user) {
    if (req.session.user.admin) {
      try {
        let user_id = req.params.user_id;
        const deletedProfile = await booksData.deleteProfileById(user_id);
        if (deletedProfile == 1) {
          res.render("posts/admin-homepage", {
            title: "Admin Homepage",
            message: "Profile Deleted",
          });
        }
      } catch (e) {
        console.log(e);
        res.status(500).send({ message: e });
      }
    }
  } else {
    res.redirect("/")
  }
});

module.exports = router;
