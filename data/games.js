const mongoCollections = require('../config/mongoCollections.js');
let { ObjectId } = require('mongodb');
const games = mongoCollections.games;

const create = async (name,image,genre,size,compatibility,languages,age_rating,website,rating,reviews) =>{
    const gamesCollect = await games();
    
    if(!name|| typeof(name)!='string') {
        throw 'You must provide a title for the book in string format';
    }
    if(name.trim()=== ""){
        throw 'the given title is empty string please provide a title';
    }
//      Processing images
    //   if (!genre || !Array.isArray(genre)){
    //     throw 'You must provide an array of genre';
    //   }
    //   if (genre.length === 0) 
    //     throw 'You must provide at least one genre.';

    if(!genre || !Array.isArray(genre)){
        throw 'You must provide an array of genre';
      }
    if(genre.length === 0)
        throw 'You must provide at least one genre.';

    if(!size|| typeof(size)!='string') {
        throw 'You must provide a title for the book in string format';
    }
    if(size.trim()=== ""){
        throw 'the given title is empty string please provide a title'
    }

    if(!compatibility || !Array.isArray(compatibility)){
        throw 'You must provide an array of compatibility';
    }
    if(compatibility.length === 0) 
        throw 'You must provide at least one compatibility.';
    

    if(!languages || !Array.isArray(languages)){
        throw 'You must provide an array of languages';
    }
    if(languages.length === 0) 
        throw 'You must provide at least one languages.';


    if(!genre || !Array.isArray(genre)){
        throw 'You must provide an array of genre';
      }
    if(genre.length === 0) 
        throw 'You must provide at least one genre.';


    if(!age_rating|| typeof(age_rating)!='string') {
        throw 'You must provide a title for the book in string format';
      }
    if(age_rating.trim()=== ""){
        throw 'the given title is empty string please provide a title'
    }

    if(!website|| typeof(website)!='string') {
        throw 'You must provide a title for the book in string format';
    }
    if(website.trim()=== ""){
        throw 'the given title is empty string please provide a title'
    }
     
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
        reviews
    };
    const insertInfo = await gamesCollect.insertOne(newGame);
    if (insertInfo.insertedCount === 0) throw 'Could not add Game please debug';
    const newId = insertInfo.insertedId;

    return newId
}

const getAll = async() =>{
    const gamesCollect = await games();
    const gamesList = await gamesCollect.find({}).toArray();
    if(gamesList == null) throw 'No games exist in the DB';
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

module.exports = {
    create,
    getAll
}