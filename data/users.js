const mongoCollections = require('../config/mongoCollections.js');
let  objectId  = require('mongodb').ObjectId;
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

  
    email = email.toLowerCase();

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
    if (insertInfo.insertedCount === 0) throw 'Could not add user';
    const newId = insertInfo.insertedId;

    return newId
}

const remove = async(id, name) => {
    check_id(id)
    usersCollect = await users();
    const deletionGame = await usersCollect.deleteOne({ _id: ObjectId(id) });
      if (deletionGame.deletedCount === 0) {
        throw `Could not delete user}`;
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
        throw 'You must provide an userid to check user';
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
  }

const check_user_email = async(email_id) =>{
    if(!email_id) {
        throw 'You must provide an emailid to check user';
      }
    if(!email_id|| typeof(email_id)!='string') {
        throw 'You must provide a email_id for the game in a string format';
    }
    if(email_id.trim()=== ""){
        throw 'the given email_id is empty string please provide a email_id'
    }
   
    const usersCollect = await users();
    const usernameList = await usersCollect.findOne({"email": email_id});
    if(usernameList!=null){
        return true
    }
    return false
  }
  
const getAllUsers = async () => {
    const usersCollect = await users();
    const usernameList = await usersCollect.find({}).toArray();
    if (usernameList == null) {
        throw 'No users exist in the DB';
    }
    for (i = 0; i < usernameList.length; i++) {
        usernameList[i]._id = usernameList[i]._id.toString();
        usernameList[i].hashedPassword='';
    }
    return usernameList
}

module.exports = {
    create,
    remove,
    check_usernames,
    check_user_email,
    check_id,
    getAllUsers
}