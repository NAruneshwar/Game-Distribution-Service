const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render("posts/admin-login", { title: "Log In" });
});

router.post('/check', async (req, res) => {
    
})

module.exports = router;
