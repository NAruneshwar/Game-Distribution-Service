// for data related to login
const mongoCollections = require('../config/mongoCollections.js');
let { ObjectId } = require('mongodb');
const users = mongoCollections.users;
const admin = mongoCollections.admin;
const bcrypt = require('bcryptjs')

// create a function called check(username,hashedPassword) to check username and password of user
const check = async(username,hash) =>{
    if(!username|| typeof(username)!='string') {
        throw 'You must provide a username for the user to login in a string format';
    }
    if(username.trim()=== ""){
        throw 'the given username is empty string please provide a username'
    }
    if(!hash|| typeof(hash)!='string') {
        throw 'You must provide a password for the user in a string format';
    }
    if(hash.trim()=== ""){
        throw 'the given password is empty string please provide a password for the user'
    }
    
    usersCollect = await users();
    const userDetails = await usersCollect.findOne({"username": username})
    if(userDetails == null){
        throw `Username or password is Incorrect!`
    }
    compared = await bcrypt.compare(hash,userDetails.hashedPassword)
    if(compared==false){
        throw `Username or password is Incorrect!`
    }
    return;
}

// create a function called admin_check(username,hashedPassword) to check username and password of admin
const admin_check = async(username,hash) =>{
    if(!username|| typeof(username)!='string') {
        throw 'You must provide a username in correct format';
    }
    if(username.trim()=== ""){
        throw 'You must provide a username.'
    }
    if(!hash|| typeof(hash)!='string') {
        throw 'You must provide a password in correct format';
    }
    if(hash.trim()=== ""){
        throw 'You must provide a password'
    }
    
    adminCollect = await admin();
    const adminDetails = await adminCollect.findOne({"username": username})
    if(adminDetails == null){
        throw `Username or password is Incorrect!`
    }
    compared = await bcrypt.compare(hash,adminDetails.hashedPassword)
    if(compared==false){
        throw `Username or password is Incorrect!`
    }
    return;
}

module.exports ={
    check,
    admin_check
}