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
    checkUsernamePassword(username, password)
    hashedPassword = await bcrypt.hash(password, 16)
    try{
    const users = await logindata.check(username, hashedPassword);
    res.redirect('/')
    }
    catch(e){
        res.status(401).render('/',{message: e})
    }
});

module.exports = router;
