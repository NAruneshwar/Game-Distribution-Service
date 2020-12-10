const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => { //should be post 
    console.log("in login route")
});

module.exports = router;
