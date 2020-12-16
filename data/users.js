const mongoCollections = require('../config/mongoCollections.js');
let { ObjectId } = require('mongodb');
const users = mongoCollections.users;

const create = async (first_name,last_name,username,age,email,admin,state,country,hashedPassword) => {
    const usersCollect = await users();
    
    if(!first_name|| typeof(first_name)!='string') {
        throw 'You must provide a first_name for the user in string format';
    }
    if(first_name.trim()=== ""){
        throw 'the given first_name is empty string please provide the first_name of the user';
    }

    if(!last_name|| typeof(last_name)!='string') {
        throw 'You must provide a last_name for the user in string format';
    }
    if(last_name.trim()=== ""){
        throw 'the given last_name is empty string please provide the last_name of the user';
    }

    if(!username|| typeof(username)!='string') {
        throw 'You must provide a username for the user in string format';
    }
    if(username.trim()=== ""){
        throw 'the given username is empty string please provide the username of the user';
    }
    if(await check_usernames(username)){
        throw 'Username is taken please select another username';
    }

    if(!age|| typeof(age)!='string') {
        throw 'You must provide a age for the user in string format';
    }
    if(age.trim()=== ""){
        throw 'the given age is empty string please provide the age of the user';
    }
    try{
        age = Number(age)
    }
    catch(e){
        throw 'Error provided age is not a number.'
    }


    if(!email|| typeof(email)!='string') {
        throw 'You must provide a email for the user in string format';
    }
    if(email.trim()=== ""){
        throw 'the given email is empty string please provide the email of the user';
    }

    if(!admin|| typeof(admin)!='string') {
        throw 'You must provide a admin setting for the user in string format';
    }
    if(admin.trim()=== ""){
        throw 'the given admin is empty string please provide the admin setting of the user';
    }

    if(!state|| typeof(state)!='string') {
        throw 'You must provide the state for the game in string format';
    }
    if(state.trim()=== ""){
        throw 'the given state is empty string please provide a value in state'
    }

    if(!country|| typeof(country)!='string') {
        throw 'You must provide a country for the game in a string format';
    }
    if(country.trim()=== ""){
        throw 'the given country is empty string please provide a country name'
    }

    if(!hashedPassword|| typeof(hashedPassword)!='string') {
        throw 'You must provide a hashedPassword for the game in a string format';
    }
    if(hashedPassword.trim()=== ""){
        throw 'the given hashedPassword is empty string please provide a hashedPassword'
    }
  
    
    let newGame ={
        first_name,
        last_name,
        username,
        age,
        email,
        admin,
        state,
        country,
        hashedPassword,
        "reviews" : [],
        "comment" : [],
        "game_ids": []
    };
    const insertInfo = await usersCollect.insertOne(newGame);
    if (insertInfo.insertedCount === 0) throw 'Could not add Game please debug';
    const newId = insertInfo.insertedId;

    return newId
}

const remove = async(id, name) => {
    if (!id) {
      throw 'You must provide an id to delete user';
    }
    if(typeof(id)!="string" || id.length!=24){
      throw 'You must only pass in id as string that is 24 charecters long'
    }
    if(id.trim()===""){
      throw 'Id can not be empty spaces'
    }
    var re =  /^[0-9a-fA-F]+$/;
    if(!re.test(id)) {
      throw 'Given Input is not in hexadecimal please verify ID'
    } 
    usersCollect = await users();
    const deletionGame = await usersCollect.deleteOne({ _id: ObjectId(id) });
      // console.log(deletionMovie);
      if (deletionGame.deletedCount === 0) {
        throw `Could not delete Game with id of ${id}`;
      }
    
    return name;
  
  }

const check_usernames = async(username) =>{
    const usersCollect = await users();
    const usernameList = await usersCollect.findOne({"username": username});
    if(usernameList!=null){
        return true
    }
    return false
  }

const check_id = async(userid) =>{
    if (!userid) {
        throw 'You must provide an userid to delete user';
      }
      if(typeof(userid)!="string" || userid.length!=24){
        throw 'You must only pass in userid as string that is 24 charecters long'
      }
      if(userid.trim()===""){
        throw 'Id can not be empty spaces'
      }
      var re =  /^[0-9a-fA-F]+$/;
      if(!re.test(userid)) {
        throw 'Given Input is not in hexadecimal please verify ID'
      } 
    const usersCollect = await users();
    const usernameList = await usersCollect.findOne({"_id": ObjectId(userid)});
    if(usernameList!=null){
        return true
    }
    return false
  }
  
module.exports = {
    create,
    remove,
    check_usernames,
    check_id
}