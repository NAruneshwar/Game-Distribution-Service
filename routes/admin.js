const express = require('express')
const router = express.Router()
const logindata = require('../data/login')
const gamesdata = require('../data/games')
const usersdata = require('../data/users')

router.get('/', async (req, res) => {
    let userLoggedIn = false
    let userId = req.session.AuthCookie
    if(!userId){
        userLoggedIn = false
    }else{
        userLoggedIn=true
    }
    if (req.session.user) {
        if (req.session.user.admin) {
            res.render("posts/admin-homepage", { title: "Admin Homepage", userLoggedIn: userLoggedIn });
        }
    } else {
        res.redirect('/')
    }
});

router.get('/add_game', async (req, res) => {
    if (req.session.user) {
        if (req.session.user.admin) {
    res.render("posts/add", { title: "Add Game" });
        }
    }else{
        res.redirect('/')
    }
});

router.get('/delete_game', async (req, res) => {
    if (req.session.user) {
        if (req.session.user.admin) {
            const games = await gamesdata.getAll();
            res.render("posts/delete", { title: "Delete Game", data: games });
        }
    } else {
        res.redirect('/')
    }
});

router.get('/delete_user', async (req, res) => {
    if (req.session.user) {
        if (req.session.user.admin) {
            const users = await usersdata.getAllUsers()
            res.render("posts/deleteuser", { title: "Delete User", data: users });
        }
    } else {
        res.redirect('/')
    }
})

router.post('/check', async (req, res) => {
    username = req.body.username
    password = req.body.password
    checkUsernamePassword(username, password)
    hashedPassword = await bcrypt.hash(password, 16)
    try {
        const admin = await logindata.admin_check(username, hashedPassword);
        res.redirect('/admin/homepage')
    }
    catch (e) {
        res.status(401).render('views/admin-login', { message: e })
    }
});

module.exports = router;
