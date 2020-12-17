const express = require('express')
const router = express.Router()
const reviewsData = require('../data/reviews')

router.get('/:game_id', async (req, res) => {
    //Will show reviews for game with specified ID
    const game_id = req.params.game_id;
    try {
        const reviews = await reviewsData.reviewsByGameId(game_id);
        res.status(200).render("posts/game", { title: "Game", data: reviews });
    } catch (e) {
        res.status(404).render("posts/game", { title: "Game", message: e });
    }
});

router.post('/add/:game_id',async(req,res)=>{
    //Post reviews for the specified game
    let game_id=req.params.game_id
    data=req.body
    try{
        user_id=data.user_id
        review = data.review
        rating  = data.rating
    }catch(e){

    }
});

router.delete('/delete/:review_id',async(req,res)=>{//for admin only... sessions required
    //Delete review with that ID

    try {
        let review_id = req.params.review_id
        const deletedGame = await reviewsData.deleteGameById(review_id)
        if (deletedGame == 1) {
            res.render("posts/admin-homepage", { title: "Admin Homepage", message: "Game Deleted" }); // change this
        }
    } catch (e) {
        res.status(401).render("posts/admin-homepage", { title: "Admin Homepage", message: e }); // change this
    }


});

module.exports = router;