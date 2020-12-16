// Database insertions here
const games = require('./data/games') //Importing the games file
const users = require('./data/users')

const main = async () =>{

    try{
        newgame1 = await games.create("World Of Tanks",["img1","img2"],["Action","Strategy shooter"],"24GB",["Windows 10","Mac OS high sierra"],["English","German","French","italian"],"17+","https://worldoftanks.asia/","9.1/10",["aljeghjadlhg"]);
        console.log(newgame1);
        newgame2 = await games.create("COD",["img32525235","img215135135"],["Action","FPS"],"11GB",["Windows 10","Android 10+"],["English","Hindi","cantonese"],"27+","https://www.callofduty.com/home","8.6/10",[""]);
        console.log(newgame2);
        allresult = await games.getAll();
        // user1 = await users.create("Arun","Nalluri","Ar","22","arun.nalluri@gmail.com","yes","NY","USA","aelighaljg;gkagladnglkadnn")
        // console.log(user1)
        usersupdate = await games.update(newgame2,"COD2",["img32525235","img215135135"],["Action","FPS"],"11GB",["Windows 10","Android 10+"],["English","Hindi","cantonese"],"27+","https://www.callofduty.com/home","8.6/10",[""],10);
        console.log(usersupdate)
        console.log(await users.login("Arun_91","aelighaljg;gkagladnglkadnn"))
        // console.log(newgame1)
        // console.log(await games.remove(newgame1))
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
