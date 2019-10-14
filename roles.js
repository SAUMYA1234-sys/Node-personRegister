const express = require('express');
const router = express.Router();
const Role = require('./modals').roleSChema;

//create Role
router.post('/createRole',(req,res)=>{
    console.log("create role ** ");
    const role = new Role({
        name:req.body.name
    });

    role.save();
    res.send("created");
    console.log("role added ** ",role);
});

//get All roles
router.get('/getAllRoles',(req,res)=>{
  Role.find().then(roles => res.send(roles)).catch(err => console.log(err));
});

//update roles
router.put('/updateRole',(req,res)=>{
    console.log("update role **");
  Role.findById(req.body._id).then(
      role=>{role.name = req.body.name;
      role.save();}
  ).catch(err => console.log(err));
});

//delete roles
router.delete('/deleteRole/:id',(req,res)=>{
Role.findById(req.body._id).then(Role=>Role.delete()).catch(err => console.log(err));
});

module.exports = router;
