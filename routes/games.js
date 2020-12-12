const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    res.render("posts/games_category",{title: "Browse"});
    console.log("games route")
});

module.exports = router;