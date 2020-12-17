const express = require('express')
const router = express.Router()
const userData = require('../data/users')

router.post('/delete/:user_id', async (req, res) => { //for admin only... sessions required
    //Delete user with the ID
    try {
        let user_id = req.params.user_id
        const deletedUser = await userData.remove(user_id)
        if (deletedUser == 1) {
            res.render("posts/admin-homepage", { title: "Admin Homepage", message: "User Deleted Successfully!" });
        }
    } catch (e) {
        res.status(401).render("posts/deleteuser", { title: "Admin Homepage", message: e });
    }
});


module.exports=router;