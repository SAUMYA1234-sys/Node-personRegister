const express = require('express');
const userRouter = express.Router();
const user = require('./modals').userSchema;

userRouter.post('/createUser',(req,res)=>{
 const userdetails = new user({
 name : req.body.name,
 emailId : req.body.emailId,
 password : req.body.password,
 role : req.body.role
});
userdetails.save();
console.log("user created**");
res.send("created");

});

userRouter.get('/getAllUsers',(req,res)=>{
 user.find().then(users=>{res.send(users); console.log("find users")});
});

userRouter.put('/updateUser',(req,res)=>{
    user.findById(req.body.id).then(
      user=>{
        user.set({
            name : req.body.name,
            emailId : req.body.emailId,
            password : req.body.password,
            role : req.body.role
        });
        user.save();
       console.log(user);
       res.send(user);
      })
})

userRouter.put('/deleteUser:id',(req,res)=>{
 user.findByIdAndDelete(req.params.id).then(res.send("deleted"));
})

module.exports = userRouter;