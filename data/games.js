<<<<<<< HEAD
const mongoCollections = require('../config/mongoCollections.js');
let { ObjectId } = require('mongodb');
const games = mongoCollections.games;

const create = async (name,image,genre,size,compatibility,languages,age_rating,website,rating,reviews) =>{
    const gamesCollect = await games();
    
    if(!name|| typeof(name)!='string') {
        throw 'You must provide a name for the book in string format';
    }
    if(name.trim()=== ""){
        throw 'the given name is empty string please provide the name of the game';
    }
    //  Processing images only send in the image name.
      if (!genre || !Array.isArray(genre)){
        throw 'You must provide an array of genre';
      }
      if (genre.length === 0) 
        throw 'You must provide at least one genre.';

    if(!genre || !Array.isArray(genre)){
        throw 'You must provide an array of genre';
      }
    if(genre.length === 0)
        throw 'You must provide at least one genre.';

    if(!size|| typeof(size)!='string') {
        throw 'You must provide a size for the game in string format';
    }
    if(size.trim()=== ""){
        throw 'the given size is empty string please provide a size'
    }

    if(!compatibility || !Array.isArray(compatibility)){
        throw 'You must provide an array of compatible devices';
    }
    if(compatibility.length === 0) 
        throw 'You must provide at least one compatible device.';
    

    if(!languages || !Array.isArray(languages)){
        throw 'You must provide an array of languages that game supports';
    }
    if(languages.length === 0) 
        throw 'You must provide at least one language that game supports.';


    if(!genre || !Array.isArray(genre)){
        throw 'You must provide a genre or an array of genres';
      }
    if(genre.length === 0) 
        throw 'You must provide a genre or an array of genres.';


    if(!age_rating|| typeof(age_rating)!='string') {
        throw 'You must provide the age_rating for the game in string format';
      }
    if(age_rating.trim()=== ""){
        throw 'the given age_rating is empty string please provide a value in age_rating'
    }

    if(!website|| typeof(website)!='string') {
        throw 'You must provide a website for the game in a string format';
    }
    if(website.trim()=== ""){
        throw 'the given website is empty string please provide a website link'
    }
    // actually we dont add reviews here.
    if(!reviews || !Array.isArray(reviews)){
        throw 'You must provide an array of reviews';
    }
    if(reviews.length === 0) 
        throw 'You must provide at least one reviews.';
      
    
    
    let newGame ={
        name,
        image,
        genre,
        size,
        compatibility,
        languages,
        age_rating,
        website,
        rating,
        reviews,
        "no_of_downloads" : 0
    };
    const insertInfo = await gamesCollect.insertOne(newGame);
    if (insertInfo.insertedCount === 0) throw 'Could not add Game please debug';
    const newId = insertInfo.insertedId;

    return newId
}


const update = async (id, name,image,genre,size,compatibility,languages,age_rating,website,rating,reviews, no_of_downloads) =>{
  const gamesCollect = await games();
  if (!id){
    throw 'You must provide an id to search for';
  }
  var re =  /^[0-9a-fA-F]+$/;
  if(!re.test(id)) {
    throw 'Given Input is not in hexadecimal please verify ID'
  } 
  if(!name|| typeof(name)!='string') {
      throw 'You must provide a name for the book in string format';
  }
  if(name.trim()=== ""){
      throw 'the given name is empty string please provide the name of the game';
  }
  //  Processing images only send in the image name.
    if (!genre || !Array.isArray(genre)){
      throw 'You must provide an array of genre';
    }
    if (genre.length === 0) 
      throw 'You must provide at least one genre.';

  if(!genre || !Array.isArray(genre)){
      throw 'You must provide an array of genre';
    }
  if(genre.length === 0)
      throw 'You must provide at least one genre.';

  if(!size|| typeof(size)!='string') {
      throw 'You must provide a size for the game in string format';
  }
  if(size.trim()=== ""){
      throw 'the given size is empty string please provide a size'
  }

  if(!compatibility || !Array.isArray(compatibility)){
      throw 'You must provide an array of compatible devices';
  }
  if(compatibility.length === 0) 
      throw 'You must provide at least one compatible device.';
  

  if(!languages || !Array.isArray(languages)){
      throw 'You must provide an array of languages that game supports';
  }
  if(languages.length === 0) 
      throw 'You must provide at least one language that game supports.';


  if(!genre || !Array.isArray(genre)){
      throw 'You must provide a genre or an array of genres';
    }
  if(genre.length === 0) 
      throw 'You must provide a genre or an array of genres.';


  if(!age_rating|| typeof(age_rating)!='string') {
      throw 'You must provide the age_rating for the game in string format';
    }
  if(age_rating.trim()=== ""){
      throw 'the given age_rating is empty string please provide a value in age_rating'
  }

  if(!website|| typeof(website)!='string') {
      throw 'You must provide a website for the game in a string format';
  }
  if(website.trim()=== ""){
      throw 'the given website is empty string please provide a website link'
  }
  // actually we dont add reviews here.
  if(!reviews || !Array.isArray(reviews)){
      throw 'You must provide an array of reviews';
  }
  if(reviews.length === 0) 
      throw 'You must provide at least one reviews.';
    
  
  
  let updatedGame ={
      name,
      image,
      genre,
      size,
      compatibility,
      languages,
      age_rating,
      website,
      rating,
      reviews,
      no_of_downloads
  };
  const insertInfo = await gamesCollect.updateOne({_id: id},{$set: updatedGame});
  if (insertInfo.insertedCount === 0) throw 'Could not add Game please debug';

  return "Success"
}

const getAll = async() =>{
    const gamesCollect = await games();
    const gamesList = await gamesCollect.find({}).toArray();
    if(gamesList == null) throw 'No games exist in the DB';
    for(i=0;i<gamesList.length;i++){
        gamesList[i]._id = gamesList[i]._id.toString();
    }
    return gamesList
  }


  const getOne = async(game_id) =>{
    const gamesCollect = await games();
    const gamesList = await gamesCollect.findOne({"_id": ObjectId(game_id)});;
    if(gamesList == null) throw 'No game exist in the DB with that id';
    gamesList._id = gamesList._id.toString();

    // let result =[]
    // // console.log(Info.length)
    // for (let k=0; k<Info.length; k++){
    //   let inner_val = {}
    //   for (const [key, value] of Object.entries(Info[k])){
    //     if(key == '_id'){
    //       inner_val['_id'] = value.toString();
    //     }
    //     if(key == 'title'){
    //       inner_val['title'] = value;
    //     }
    //   }
    //   // console.log(inner_val);
    //   result.push(inner_val);
    // }
    return gamesList
  }

const remove = async(id, name) => {
    if (!id) {
      throw 'You must provide an id to delete game';
    }
   
    var re =  /^[0-9a-fA-F]+$/;
    if(!re.test(id)) {
      throw 'Given Input is not in hexadecimal please verify ID'
    } 
    // gametitle = await get(id)
    // let reviewcount = booktitle.reviews.length
    // console.log(movietitle)
    gamesCollect = await games();
    const deletionGame = await gamesCollect.deleteOne({ _id: id });
      // console.log(deletionMovie);
      if (deletionGame.deletedCount === 0) {
        throw `Could not delete Game with id of ${id}`;
      }
    
    return name;
  
  }

module.exports = {
    create,
    update,
    getAll,
    getOne,
    remove,
}
=======
const mongoCollections = require("../config/mongoCollections.js");
let objectId = require("mongodb").ObjectId;
const games = mongoCollections.games;

const check_id = async (gameid) => {
  if (!gameid || typeof gameid !== "string") {
    throw `ID is not proper`;
  }
  gameid = userid.trim();
  if (gameid == "") {
    throw `ID should not be blank`;
  }
  if (objectId.isValid(gameid) === false) {
    throw `ID is not valid`;
  }
};

const create = async (
  name,
  image,
  genre,
  size,
  compatibility,
  languages,
  age_rating,
  website,
  rating,
  reviews
) => {
  const gamesCollect = await games();

  if (!name || typeof name != "string") {
    throw "You must provide a name for the book in string format";
  }
  if (name.trim() === "") {
    throw "the given name is empty string please provide the name of the game";
  }
  //  Processing images only send in the image name.
  if (!genre || !Array.isArray(genre)) {
    throw "You must provide an array of genre";
  }
  if (genre.length === 0) throw "You must provide at least one genre.";

  if (!genre || !Array.isArray(genre)) {
    throw "You must provide an array of genre";
  }
  if (genre.length === 0) throw "You must provide at least one genre.";

  if (!size || typeof size != "string") {
    throw "You must provide a size for the game in string format";
  }
  if (size.trim() === "") {
    throw "the given size is empty string please provide a size";
  }

  if (!compatibility || !Array.isArray(compatibility)) {
    throw "You must provide an array of compatible devices";
  }
  if (compatibility.length === 0)
    throw "You must provide at least one compatible device.";

  if (!languages || !Array.isArray(languages)) {
    throw "You must provide an array of languages that game supports";
  }
  if (languages.length === 0)
    throw "You must provide at least one language that game supports.";

  if (!genre || !Array.isArray(genre)) {
    throw "You must provide a genre or an array of genres";
  }
  if (genre.length === 0)
    throw "You must provide a genre or an array of genres.";

  if (!age_rating || typeof age_rating != "string") {
    throw "You must provide the age_rating for the game in string format";
  }
  if (age_rating.trim() === "") {
    throw "the given age_rating is empty string please provide a value in age_rating";
  }

  if (!website || typeof website != "string") {
    throw "You must provide a website for the game in a string format";
  }
  if (website.trim() === "") {
    throw "the given website is empty string please provide a website link";
  }
  // actually we dont add reviews here.
  if (!reviews || !Array.isArray(reviews)) {
    throw "You must provide an array of reviews";
  }
  if (reviews.length === 0) throw "You must provide at least one reviews.";

  let newGame = {
    name,
    image,
    genre,
    size,
    compatibility,
    languages,
    age_rating,
    website,
    rating,
    reviews,
    no_of_downloads: 0,
  };
  const insertInfo = await gamesCollect.insertOne(newGame);
  if (insertInfo.insertedCount === 0) throw "Could not add Game please debug";
  const newId = insertInfo.insertedId;

  return newId;
};

const getAll = async () => {
  const gamesCollect = await games();
  const gamesList = await gamesCollect.find({}).toArray();
  if (gamesList == null) throw "No games exist in the DB";
  for (i = 0; i < gamesList.length; i++) {
    gamesList[i]._id = gamesList[i]._id.toString();
  }
  return gamesList;
};

const getOne = async (game_id) => {
  console.log("here")
  const gamesCollect = await games();
  const gamesList = await gamesCollect.findOne({ _id: objectId(game_id) });;
  if (gamesList == null) throw 'No game exist in the DB with that id';
  gamesList._id = gamesList._id.toString();
  return gamesList;
};

const remove = async (id, name) => {
  check_id(id);
  gamesCollect = await games();
  const deletionGame = await gamesCollect.deleteOne({ _id: objectId(id) });
  if (deletionGame.deletedCount === 0) {
    throw `Could not delete game.`;
  }
  return name;
};

const getByGenre = async (genre) => {
  if (!genre || typeof genre != "string") {
    throw "You must provide a genre for the game in a string format";
  }
  if (genre.trim() === "") {
    throw "the given genre is empty string";
  }
  gamesCollect = await games();
  const gamesList = await gamesCollect.find({ genre: genre }).toArray();
  if (gamesList == null) throw "No games exist in the DB";
  for (i = 0; i < gamesList.length; i++) {
    gamesList[i]._id = gamesList[i]._id.toString();
  }

  return gamesList;
};

module.exports = {
  create,
  getAll,
  getOne,
  remove,
  getByGenre,
};
>>>>>>> 72d77c25a47267a10102ad68c16a0f058f4841c8
