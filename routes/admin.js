const express = require('express')
const router = express.Router()
const logindata = require('../data/login')

router.get('/', async (req, res) => {
    res.render("posts/admin-login", { title: "Log In" });
});

router.get('/homepage', async(req,res)=>{
    res.render("posts/admin-homepage",{title: "Admin Homepage"});
});

router.post('/check', async (req, res) => {
    username = req.body.username
    password = req.body.password
    checkUsernamePassword(username, password)
    hashedPassword = await bcrypt.hash(password, 16)
    try{
    const admin = await logindata.admin_check(username, hashedPassword);
    res.redirect('/admin/homepage')
    }
    catch(e){
        res.status(401).render('views/admin-login',{message: e})
    }
});

module.exports = router;
