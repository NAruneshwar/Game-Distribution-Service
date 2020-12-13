// Database insertions here
const games = require('./data/games') //Importing the games file

const main = async () =>{

    try{
        newgame1 = await games.create("World Of Tanks",["img1","img2"],["Action","Strategy shooter"],"24GB",["Windows 10","Mac OS high sierra"],["English","German","French","italian"],"17+","https://worldoftanks.asia/","9.1/10",["aljeghjadlhg"]);
        console.log(newgame1);
        newgame2 = await games.create("COD",["img32525235","img215135135"],["Action","FPS"],"11GB",["Windows 10","Android 10+"],["English","Hindi","cantonese"],"27+","https://www.callofduty.com/home","8.6/10",[""]);
        console.log(newgame2);
        allresult = await games.getAll();
        console.log(allresult)
    }
    catch(e){
        console.error(e)
    }
};

main().catch((error) => {
    console.log(error);
});
