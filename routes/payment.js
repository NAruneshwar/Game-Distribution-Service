const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    // res.render("posts/login", { title: "Log In" });
    console.log("in payments");
});

module.exports = router;