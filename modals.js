const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    id:String,
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20
    },
    middleName:{
        type:String,
        minlength:3,
        maxlength:20
    },
    lastName:{
            type:String,
            required:true,
            minlength:3,
            maxlength:20
        },
    gender:String,
    age:{
        type:Number,
        required:true},
    address:String,
    mobileNo:Number,
    city:String,
    maritialStatus:String,
    physicalDisablity:Boolean,
    isAuthorized:Boolean,
    personUUID:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}); 
const Person =  mongoose.model('Person',personSchema);

const roleSChema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        enum:['AccessUser','Operator','Administrator']
        }
}); 
const Role =  mongoose.model('Role',roleSChema);

const userSchema = new mongoose.Schema({
        name:String,
        emailId:String,
        password:String,
        role:{
            type:String,
            ref:'Roles'
        }
});
const User =  mongoose.model('User',userSchema);


module.exports.personSchema = Person;
module.exports.userSchema = User;
module.exports.roleSChema = Role;