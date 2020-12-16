const express = require('express')
const router = express.Router()
const gamesData = require('../data/games')

function checkForGame(name, image, genre, size, compatibility, languages, age_rating, website, rating) {

    name = name.trim();
    if (!name || name == "" || typeof name != "string") {
        throw `Invalid name`
    }

    if (!image || image == "" || typeof image != "array") {
        throw `Invalid Image`
    }

    if (!genre || genre == "" || typeof genre != "array") {
        throw `Invalid genre`
    }

    size = size.trim();
    if (!size || size == "" || typeof size != "string") {
        throw `Invalid Size`
    }

    if (!compatibility || compatibility == "" || typeof compatibility != "array") {
        throw `Invalid compatibility`
    }

    if (!languages || languages == "" || typeof languages != "array") {
        throw `Invalid languages`
    }

    age_rating = age_rating.trim();
    if (!age_rating || age_rating == "" || typeof age_rating != "string") {
        throw `Invalid age_rating`
    }

    website = website.trim();
    if (!website || website == "" || typeof website != "string") {
        throw `Invalid website`
    }

    rating = rating.trim();
    if (!rating || rating == "" ) {
        throw `Invalid rating`
    }

    if (isNaN(Number(rating)) == true) {
        throw `Rating is not a number`
    }

}

router.get('/', async (req, res) => {
    res.render("posts/genre", { title: "Browse Genres" });
});

router.get('/genre/:genre', async (req, res) => {
    //will show games of that genre
    const genre = req.params.genre;
    try {
        const games = await gamesData.gamesByGenre(genre)
        res.status(200).render("posts/gamelist", { title: "Games", data: games });
    } catch (e) {
        res.status(404).render("posts/genre", { title: "Browse", message: e });
    }
});

router.get('/getAll', async(req,res)=>{
    try{
        let allGames =await gamesData.getAll();
        // res.json(allGames)
        res.status(200).render("posts/delete",{title : "Delete Game", data: allGames});
    }catch(e){
        res.status(404).render("posts/delete", { title: "Delete Game", message: "Something went wrong!" });
    }
});

router.get('/:game_id', async (req, res) => {
    //Will show an individual game with that ID
    const game_id = req.params.game_id
    try {
        const game = await gamesData.gameByID(game_id)
        res.status(200).render("posts/game", { title: game.title, data: game })
    } catch (e) {
        res.status(404).render("posts/genre", { title: "Browse", message: e })
    }
});

router.post('/add', async (req, res) => { //for admin only... sessions required
    //Add games using this route

    let name = req.body.name
    let image = req.body.image
    let genre = req.body.genre
    let size = req.body.size
    let compatibility = req.body.compatibility
    let languages = req.body.languages
    let age_rating = req.body.age_rating
    let website = req.body.website
    let rating = req.body.rating

    checkForGame(name, image, genre, size, compatibility, languages, age_rating, website, rating)
    try {
        const game = await gamesData.create(name, image, genre, size, compatibility, languages, age_rating, website, rating, []);
        res.render("posts/admin-homepage", { title: "Admin Homepage", message: "Game Added" });
    } catch (e) {
        res.status(401).render("posts/admin-homepage", { title: "Admin Homepage", message: e });
    }
});

router.post('/delete/:game_id', async (req, res) => { //for admin only... sessions required
    //Delete game with the ID
    try {
        let game_id = req.params.game_id
        const deletedGame = await gamesData.deleteGameById(game_id)
        if (deletedGame == 1) {
            res.render("posts/admin-homepage", { title: "Delete Game", message: "Game Deleted Successfully!" });
        }
    } catch (e) {
        res.status(401).render("posts/delete", { title: "Delete Game", message: e });
    }
});

// router.patch('/update/:game_id', async (req, res) => { //for admin only... sessions required
//     //Used to update a game's content
// })

module.exports = router;