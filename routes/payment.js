const express = require("express");
const router = express.Router();
const gamesData = require("../data/games");
const paymentData = require("../data/payment");
const userData = require("../data/users");

router.get("/:game_id", async (req, res) => {
  const game_id = req.params.game_id;
  try {
    const game = await gamesData.getOne(game_id);
    let price = Number(game.price);
    let total_price = (price + price * 0.08).toFixed(2);
    // let user_id = JSON.stringify(req.session.user.uid)

    if (req.session.user) {
      if (req.session.user.admin) {
        res.render("posts/payment", {
          title: "Payment",
          game: game,
          price: price,
          total_price: total_price,
          user_id: req.session.user.uid,
          userLoggedIn: true,
          userAdmin: true,
        });
        return;
      } else {
        res.render("posts/payment", {
          title: "Payment",
          game: game,
          price: price,
          total_price: total_price,
          user_id: req.session.user.uid,
          userLoggedIn: true,
          userAdmin: false,
        });
        return;
      }
    } else {
      // console.log("hello2");
      // userLoggedIn = false;
      res.status(200).render("posts/payment", {
        title: "Payment",
        game: game,
        price: price,
        total_price: total_price,
        user_id: req.session.user.uid,
        userLoggedIn: false,
        userAdmin: false,
      });
      return;
    }

    // res.status(200).render("posts/payment", {
    //   title: "Payment",
    //   game: game,
    //   price: price,
    //   total_price: total_price,
    //   user_id: req.session.user.uid,
    // });
  } catch (e) {
    res.status(404).render("posts/payment", { title: "Payment", message: e });
  }
});

router.post("/success", async (req, res) => {
  let updateObject = {};
  // const usersCollect = await users();
  let userid = req.body.user_id;
  const theuser = await userData.getUserById(userid);
  // console.log(theuser);
  let arraySet = new Set();
  for (i = 0; i < theuser.game_ids.length; i++) {
    arraySet.add(theuser.game_ids[i]);
  }
  
  game_id = req.body.game_id;
  arraySet.add(game_id);
  updateObject.game_ids = Array.from(arraySet);
  try {
    const gameupdate = await gamesData.updateGameDownloads(game_id)
    const user = await paymentData.addToGamersProfile(userid, updateObject);
    if (user == 1 && gameupdate==1) {
      if (req.session.user) {
        if (req.session.user.admin) {
          res.redirect("/");
          return;
        } else {
          res.render("posts/genre", {
            title: "Games",
            message: "Payment successful! Browse more interesting games here!",
            userLoggedIn: true,
            userAdmin: false,
          });
          return;
        }
      } else {
        res.redirect("/");
        return;
      }

      res.status(200).render("posts/genre", {
        title: "Games",
        message: "Payment successful! Browse more interesting games here!",
      });
    } else {
      res.status(404).render("posts/genre", {
        title: "Games",
        message: "Something went wrong!",
      });
    }
  } catch (e) {
    res.status(404).render("posts/genre", { title: "Games", message: e });
  }

  // try{
  //     const ans=await paymentData.addToGamersProfile(game_id,user_id);
  //     res.status(200).render("posts/games", { title: "Games", message: "Payment successful!" });
  // }catch(e){

  // }
});

module.exports = router;
