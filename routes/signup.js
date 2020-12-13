const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => { 
    res.render("posts/signup",{title: "Sign Up"});
  
});

module.exports = router;