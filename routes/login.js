const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const logindata = require('../data/login')

function checkUsernamePassword(uname, pswd) {
    uname = uname.trim()
    if (uname == "" || typeof uname != 'string' || !uname){
        throw `Please enter username`
    }

    if (pswd == "" || typeof pswd != 'string' || !pswd){
        throw `Please enter password`
    }
}

router.get('/', async (req, res) => {
    res.render("posts/login", { title: "Log In" });
});

router.post('/check', async (req, res) => {
    username = req.body.username
    password = req.body.password
    checkUsernamePassword(username, password);
    try{
    const users = await logindata.check(username, password);
    res.redirect('/');
    }
    catch(e){
        res.status(401).render("posts/login",{message: e})
    }
});

module.exports = router;
