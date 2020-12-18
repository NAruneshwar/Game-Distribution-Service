const mongoCollections = require("../config/mongoCollections.js");
let objectId = require("mongodb").ObjectId;
const games = mongoCollections.games;

const check_id = async (gameid) => {
  if (!gameid || typeof gameid !== "string") {
    throw `ID is not proper`;
  }
  gameid = gameid.trim();
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
  price
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
  // if (!reviews || !Array.isArray(reviews)) {
  //   throw "You must provide an array of reviews";
  // }
  // if (reviews.length === 0) throw "You must provide at least one reviews.";

  if (!price || typeof price != "string") {
    throw "You must provide a price for the book in string format";
  }
  if (price.trim() === "") {
    throw "the given price is empty string please provide the price of the game";
  }

  let newGame = {
    name,
    image,
    genre,
    size,
    compatibility,
    languages,
    age_rating,
    website,
    rating: "",
    reviews: [],
    no_of_downloads: 0,
    price,
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
  const gamesCollect = await games();
  const gamesList = await gamesCollect.findOne({ _id: objectId(game_id) });
  if (gamesList == null) throw "No game exist in the DB with that id";
  gamesList._id = gamesList._id.toString();
  return gamesList;
};

const remove = async (id) => {
  check_id(id);
  gamesCollect = await games();
  const deletionGame = await gamesCollect.deleteOne({ _id: objectId(id) });
  if (deletionGame.deletedCount === 0) {
    throw `Could not delete game.`;
  }
  return 1;
};

const getByGenre = async (genre) => {
  if (!genre || typeof genre != "string") {
    throw "You must provide a genre for the game in a string format";
  }
  if (genre.trim() === "") {
    throw "the given genre is empty string";
  }
  let gamesList = [];
  // gamesCollect = await games();
  let allGames = await getAll();
  // console.log(allGames[0].genre.includes("action"));
  for (i = 0; i < allGames.length; i++) {
    if (allGames[i].genre.includes(genre)) {
      gamesList[i] = { name: allGames[i].name, id: allGames[i]._id };
    }
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
