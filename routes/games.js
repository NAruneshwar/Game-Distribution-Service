const express = require("express");
const router = express.Router();
const multer1 = require("../multer");
const cloudinary = require("../cloudinary");
const path = require("path");
const bodyParser = require("body-parser");
//file system
const fs = require("fs");
const { url } = require("inspector");
const static = express.static(__dirname + "/public");

const gamesData = require("../data/games");
const reviewsData = require("../data/reviews");
const userData = require("../data/users");

function checkForGame(
  name,
  imagename,
  genre,
  size,
  compatibility,
  languages,
  age_rating,
  website
) {
  name = name.trim();
  if (!name || name == "" || typeof name != "string") {
    throw `Invalid name`;
  }

  //   if (!image || image == "" || typeof image != "array") {
  //     throw `Invalid Image`;
  //   }

  if (!genre || genre == "" || !Array.isArray(genre)) {
    throw `Invalid genre`;
  }

  size = size.trim();
  if (!size || size == "" || typeof size != "string") {
    throw `Invalid Size`;
  }

  if (!compatibility || compatibility == "" || !Array.isArray(compatibility)) {
    throw `Invalid compatibility`;
  }

  if (!languages || languages == "" || !Array.isArray(languages)) {
    throw `Invalid languages`;
  }

  age_rating = age_rating.trim();
  if (!age_rating || age_rating == "" || typeof age_rating != "string") {
    throw `Invalid age_rating`;
  }

  website = website.trim();
  if (!website || website == "" || typeof website != "string") {
    throw `Invalid website`;
  }

  //   rating = rating.trim();
  //   if (!rating || rating == "") {
  //     throw `Invalid rating`;
  //   }

  //   if (isNaN(Number(rating)) == true) {
  //     throw `Rating is not a number`;
  //   }
}

router.get("/genre", async (req, res) => {
  if (req.session.user) {
    if (req.session.user.admin) {
      res.render("posts/genre", {
        title: "Games By Genre",
        // data: games,
        userLoggedIn: true,
        userAdmin: true,
      });
      return;
    } else {
      res.render("posts/genre", {
        title: "Games By Genre",
        // data: games,
        userLoggedIn: true,
        userAdmin: false,
      });
      return;
    }
  } else {
    // console.log("hello2");
    // userLoggedIn = false;
    res.status(200).render("posts/genre", {
      title: "Games By Genre",
      // data: games,
      userLoggedIn: false,
      userAdmin: false,
    });
    return;
  }

  // res.render("posts/genre", { title: "Games By Genre" });
});

router.get("/", async (req, res) => {
  //this is for home page to show all games
  try {
    const games = await gamesData.getAll();

    if (games == null) {
      throw `No games found`;
    }
    if (req.session.user) {
      if (req.session.user.admin) {
        res.render("posts/homepage", {
          title: "Home",
          data: games,
          userLoggedIn: true,
          userAdmin: true,
        });
        return;
      } else {
        res.render("posts/homepage", {
          title: "Home",
          data: games,
          userLoggedIn: true,
          userAdmin: false,
        });
        return;
      }
    } else {
      // console.log("hello2");
      // userLoggedIn = false;
      res.status(200).render("posts/homepage", {
        title: "Home",
        data: games,
        userLoggedIn: false,
        userAdmin: false,
      });
      return;
    }
    // res
    //   .status(200)
    //   .render("posts/homepage", { title: "Home page", data: games });
    // return;
  } catch (e) {
    res
      .status(404)
      .render("posts/homepage", { title: "Home page", message: e });
  }
});

router.get("/genre/:genre", async (req, res) => {
  //will show games of that genre
  const genre = req.params.genre;
  try {
    const games = await gamesData.getByGenre(genre);
    // console.log(games);

    if (req.session.user) {
      if (req.session.user.admin) {
        res.render("posts/gamelist", {
          title: "Games",
          data: games,
          userLoggedIn: true,
          userAdmin: true,
        });
        return;
      } else {
        res.render("posts/gamelist", {
          title: "Games",
          data: games,
          userLoggedIn: true,
          userAdmin: false,
        });
        return;
      }
    } else {
      // console.log("hello2");
      // userLoggedIn = false;
      res.status(200).render("posts/gamelist", {
        title: "Games",
        data: games,
        userLoggedIn: false,
        userAdmin: false,
      });
      return;
    }

    // res.status(200).render("posts/gamelist", { title: "Games", data: games });
    // return;
  } catch (e) {
    res.status(404).render("posts/genre", { title: "Browse", message: e });
  }
});

router.get("/deletegetAll", async (req, res) => {
  if (req.session.user) {
    if (req.session.user.admin) {
      try {
        let allGames = await gamesData.getAll();
        // res.json(allGames)
        res
          .status(200)
          .render("posts/delete", { title: "Delete Game", data: allGames });
        return;
      } catch (e) {
        res.status(404).render("posts/delete", {
          title: "Delete Game",
          message: "Something went wrong!",
        });
      }
    }
  } else {
    res.status(200).redirect("/games/");
  }
});

router.get("/:game_id", async (req, res) => {
  //Will show an individual game with that ID and it's reviews
  const game_id = req.params.game_id;
  try {
    const reviews = await reviewsData.reviewsByGameId(game_id);
    var total_ratings = reviews.length;
    const game = await gamesData.getOne(game_id);
    var reviewsuser = [];
    var ratingsum = 0;
    for (i = 0; i < reviews.length; i++) {
      ratingsum = ratingsum + Number(reviews[i].rating);
      var user_id = reviews[i].userId;
      var usersname = await userData.getUserNameById(user_id);
      reviewsuser.push({
        username: usersname.username,
        review: reviews[i].review,
        rating: reviews[i].rating,
      });
    }
    var average_rating = ratingsum / total_ratings;

    if (req.session.user) {
      if (req.session.user.admin) {
        res.render("posts/game", {
          title: game.name,
          data: game,
          reviews: reviewsuser,
          average_rating: average_rating,
          userLoggedIn: true,
          userAdmin: true,
        });
        return;
      } else {
        res.render("posts/game", {
          title: game.name,
          data: game,
          reviews: reviewsuser,
          average_rating: average_rating,
          userLoggedIn: true,
          userAdmin: false,
        });
        return;
      }
    } else {
      // console.log("hello2");
      // userLoggedIn = false;
      res.status(200).render("posts/game", {
        title: game.name,
        data: game,
        reviews: reviewsuser,
        average_rating: average_rating,
        userLoggedIn: false,
        userAdmin: false,
      });
      return;
    }

    // if (req.session.user) {
    //   if (req.session.user.uid) {
    //     // user_session = req.session.user.uid;
    //     res.status(200).render("posts/game", {
    //       title: game.name,
    //       data: game,
    //       reviews: reviewsuser,
    //       average_rating: average_rating,
    //       user_session: user_session,
    //     });
    //     return;
    //   }
    // }
    // res.status(200).render("posts/game", {
    //   title: game.name,
    //   data: game,
    //   reviews: reviewsuser,
    //   average_rating: average_rating,
    // });
    // return;
  } catch (e) {
    res.status(404).render("posts/game", { title: "Home page", message: e });
  }
});

router.post("/add", async (req, res) => {
  //for admin only... sessions required
  //Add games using this route
  // console.log(req.body.game_name);
  let userInfo = await req.body;
  console.log(userInfo);
  if (req.session.user) {
    if (req.session.user.admin) {
      // console.log(req.body.game_name);
      let name = userInfo["game_name"];
      // console.log(req.files.image);
      //   let {imagename,imagedata} = req.files.image; //array
      let genre = userInfo.genre;
      let size = userInfo.size;
      let compatibility = userInfo.compatibility;
      let languages = userInfo.languages;
      let age_rating = userInfo.age_rating;
      let website = userInfo.website;
      let price = userInfo.price;
      // console.log(name);

      //   let rating = req.body.rating;

      checkForGame(
        name,
        "image",
        genre,
        size,
        compatibility,
        languages,
        age_rating,
        website,
        price
        // rating
      );
      try {
        const game = await gamesData.create(
          name,
          "image",
          genre,
          size,
          compatibility,
          languages,
          age_rating,
          website,
          price
        );
        res.render("posts/admin-homepage", {
          title: "Admin Homepage",
          message: "Game Added",
        });
      } catch (e) {
        res.status(401).render("posts/admin-homepage", {
          title: "Admin Homepage",
          message: e,
        });
      }
    }
  } else {
    res.status(200).redirect("/games/");
  }
});

router.post("/delete/:game_id", async (req, res) => {
  //for admin only... sessions required
  //Delete game with the ID
  if (req.session.user) {
    if (req.session.user.admin) {
      try {
        let game_id = req.params.game_id;
        const deletedGame = await gamesData.remove(game_id);
        if (deletedGame == 1) {
          res.render("posts/admin-homepage", {
            title: "Delete Game",
            message: "Game Deleted Successfully!",
          });
        }
      } catch (e) {
        res
          .status(401)
          .render("posts/delete", { title: "Delete Game", message: e });
      }
    }
  } else {
    res.status(200).redirect("/games/");
  }
});
// router.patch('/update/:game_id', async (req, res) => { //for admin only... sessions required
//     //Used to update a game's content
// })

module.exports = router;
