// Database insertions here
const games = require('./data/games') //Importing the games file

const main = async () =>{

    try{
        newgame = await games.create("All right All right All right!");
        console.log(newgame);
    }
    catch(e){
        console.error(e)
    }
};

main().catch((error) => {
    console.log(error);
});
