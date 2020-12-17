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
    res.status(200).render("posts/payment", {
      title: "Payment",
      game: game,
      price: price,
      total_price: total_price,
    });
    return;
  } catch (e) {
    res.status(404).render("posts/payment", { title: "Payment", message: e });
    return;
  }
});

router.post("/success", async (req, res) => {
  let updateObject = {};
  // const usersCollect = await users();
  let userid = req.body.user_id;
  const theuser = await userData.getUserById(userid);
  let arraySet = new Set();
  for (i = 0; i < theuser.game_ids.length; i++) {
    arraySet.add(game_ids[i]);
  }
  game_id = req.body.game_id;
  arraySet.add(game_id);
  updateObject.game_ids = Array.from(arraySet);
  try {
    const user = await paymentData.addToGamersProfile(userid, updateObject);
    res.status(200).render("posts/genre", {
      title: "Games",
      message: "Payment successful! Browse more interesting games here!",
    });
    return;
  } catch (e) {
    res.status(404).render("posts/genre", { title: "Games", message: e });
    return;
  }

  // try{
  //     const ans=await paymentData.addToGamersProfile(game_id,user_id);
  //     res.status(200).render("posts/games", { title: "Games", message: "Payment successful!" });
  // }catch(e){

  // }
});

module.exports = router;
