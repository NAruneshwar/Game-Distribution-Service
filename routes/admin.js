const express = require('express')
const router = express.Router()
const logindata = require('../data/login')
const gamesdata = require('../data/games')
const usersdata = require('../data/users')

router.get('/', async (req, res) => {
    res.render("posts/admin-homepage", { title: "Admin Homepage" });
});

router.get('/add_game', async (req, res) => {
    res.render("posts/add", { title: "Add Game" });
});

router.get('/delete_game', async (req, res) => {
    const games = await gamesdata.getAll();
    res.render("posts/delete", { title: "Delete Game", data: games});
});

// router.get('/delete_review', async (req, res) => {

//     const review = await reviewdata.deleteReviewById()
//     res.render("posts/deletereview", { title: "Delete Game" });
// });

// router.get('/homepage', async(req,res)=>{
//     res.render("posts/admin-homepage",{title: "Admin Homepage"});
// });

router.get('/delete_user', async (req, res) => {
    const users = await usersdata.getAllUsers()
    res.render("posts/deleteuser", { title: "Delete User", data: users });
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
