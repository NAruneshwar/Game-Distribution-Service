const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    res.render("posts/genre",{title: "Browse"});
});

module.exports = router;