const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    res.render("posts/about", { title: "About Us" })
})

module.exports = router;