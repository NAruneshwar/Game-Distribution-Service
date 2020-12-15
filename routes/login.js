const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const userdata = require('../data/users')


router.get('/', async (req, res) => { 
    res.render("posts/login",{title: "Log In"});  
});

router.post('/check', async(req,res)=>{
    username=req.body.username
    password = req.body.password
    flag=0
    const users = await userdata.allUsers();
    //session handling remaining
    for(i=0;i<users.length;i++){
        if(users[i].username==username){
            try{
                compared = await bcrypt.compare(password, users[i].hashedPassword)
            }catch(e){
                res.status(401).render("posts/login",{title: "Login", message:"Username or password is not valid!"})
                return;
            }
            if(compared==true){
                // activate session here
                res.status(200).res.render("posts/homepage",{title: "Home page"});
                return;
            }
        }
        flag+=1
        if(flag==users.length){
            res.status(401).render("posts/login",{title: "Login", message:"Username or password is not valid!"})
                return;
        }
    }
});

module.exports = router;
