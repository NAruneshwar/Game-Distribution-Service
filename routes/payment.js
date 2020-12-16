const express = require('express');
const router = express.Router();

router.get('/:game_id', async (req, res) => {
    //Display payment details of the game
    //getPriceForGame
});

router.post('/success',async(req,res)=>{
    //Add the game to gamer's profile and display a static page with success message with a link to home page
    //addToGamersProfile
});

module.exports = router;