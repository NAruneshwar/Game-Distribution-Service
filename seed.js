// Database insertions here
const games = require('./data/games') //Importing the games file
const users = require('./data/users')
const reviews = require('./data/reviews')

const main = async () =>{

    try{
        newgame1 = await games.create("World Of Tanks",["img1","img2"],["Action","Strategy shooter"],"24GB",["Windows 10","Mac OS high sierra"],["English","German","French","italian"],"17+","https://worldoftanks.asia/","9.1",["aljeghjadlhg"]);
        console.log(newgame1);
        newgame2 = await games.create("COD",["img32525235","img215135135"],["Action","FPS"],"11GB",["Windows 10","Android 10+"],["English","Hindi","cantonese"],"27+","https://www.callofduty.com/home","8.6",[""]);
        // console.log(newgame2);
        allresult = await games.getAll();
        // user1 = await users.create("Arun","Nalluri","Ar","22","arun.nalluri@gmail.com","yes","NY","USA","aelighaljg;gkagladnglkadnn")
        // console.log(user1)
        usersupdate = await games.update(newgame2,"COD2",["img32525235","img215135135"],["Action","FPS"],"11GB",["Windows 10","Android 10+"],["English","Hindi","cantonese"],"27+","https://www.callofduty.com/home","8.6",[""],10);
        // console.log(usersupdate)
        // console.log(await users.login("Arun_91","aelighaljg;gkagladnglkadnn"))
        newReview = await reviews.addReviewForGame("5fd91df1a5932d26d9c1f97b","5fd7aa16f71aa18540f47841","all right all right all right!","3","image.img!");
        console.log(newReview)
        console.log(await reviews.reviewsByGameId("5fd91df1a5932d26d9c1f97b"));
        // console.log(await reviews.deleteGameById("5fd91df1a5932d26d9c1f97b"));
       
    }
    catch(e){
        console.error(e)
    }
    return
};

main().catch((error) => {
    console.log(error);
    return

});
