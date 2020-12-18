const express = require("express");
const router = express.Router();
const reviewsData = require("../data/reviews");
var xss = require("xss");

router.get("/:game_id", async (req, res) => {
  //Will show reviews for game with specified ID
  const game_id = req.params.game_id;
  try {
    const reviews = await reviewsData.reviewsByGameId(game_id);
    res.status(200).render("posts/game", { title: "Game", data: reviews });
  } catch (e) {
    res.status(404).render("posts/game", { title: "Game", message: e });
  }
});

router.post("/add/:game_id", async (req, res) => {
  //Post reviews for the specified game
  if (req.session.user) {
    if (req.session.user.admin) {
      let game_id = req.params.game_id;
      data = req.body;
      // console.log(game_id);
      try {
        let user_id = req.session.user.uid;
        // let user_id = data.user_id;
        let comment = xss(data.comment);
        let rating = xss(data.rating);
        let image = "some string for image";
        // console.log(user_id)
        // console.log(review)
        // console.log(rating)
        // console.log(game_id)
        // NOT WORKING
        const reviewAdded = await reviewsData.addReviewForGame(
          game_id,
          user_id,
          comment,
          rating,
          image
        );
        // console.log(reviewAdded);
        return res.redirect(req.get("referer"));
      } catch (e) {
        res.status(401).redirect("/games/".game_id);
      }
    } else {
      let game_id = req.params.game_id;
      data = req.body;
      // console.log(game_id);
      try {
        let user_id = req.session.user.uid;
        // let user_id = data.user_id;
        let comment = xss(data.comment);
        let rating = xss(data.rating);
        let image = "some string for image";
        // console.log(user_id)
        // console.log(review)
        // console.log(rating)
        // console.log(game_id)
        // NOT WORKING
        const reviewAdded = await reviewsData.addReviewForGame(
          game_id,
          user_id,
          comment,
          rating,
          image
        );
        // console.log(reviewAdded);
        return res.redirect(req.get("referer"));
      } catch (e) {
        res.status(401).redirect("/games/".game_id);
      }
    }
  } else {
    res.redirect("/");
  }
});

router.delete("/delete/:review_id", async (req, res) => {
  //for admin only... sessions required
  //Delete review with that ID

  try {
    let review_id = req.params.review_id;
    const deletedGame = await reviewsData.deleteGameById(review_id);
    if (deletedGame == 1) {
      res.render("posts/admin-homepage", {
        title: "Admin Homepage",
        message: "Game Deleted",
      }); // change this
    }
  } catch (e) {
    res
      .status(401)
      .render("posts/admin-homepage", { title: "Admin Homepage", message: e }); // change this
  }
});

module.exports = router;
