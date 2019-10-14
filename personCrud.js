const express = require('express');
const personRouter = express.Router();
const searchCriteria = require('./searchCriteria');
const Person  = require('./modals.js').personSchema;
const User = require('./modals.js').userSchema;
const Role = require('./modals.js').roleSChema;
const Login = require('./login.js').login;

    //to maintain login details
    personRouter.post('/loginDetails',(req,res)=>{
       try{ 
           const login = new Login({
                UserName: req.body.userName,
                RoleId: req.body.RoleId,
                DateTime: new Date(),
              });

              login.save();
              res.send("details saved");
          }catch(err){
                console.log(err);
            }
    })


    // to register or add person identification
    personRouter.post('/addPerson',(req,res)=>{
        try{
        const person = new Person({
            firstName:req.body.firstName,
            middleName:req.body.middleName,
            lastName:req.body.lastName,
            gender:req.body.gender,
            age:req.body.age,
            address:req.body.address,
            mobileNo:req.body.mobileNo,
            city:req.body.city,
            maritialStatus:req.body.maritialStatus,
            physicalDisablity:req.body.physicalDisablity,
            isAuthorized:false,
            personUUID:" ",
            user:req.body.user
        });
       
        getRoleOfUser(req.body.user).then(role=>{
            console.log("role name ** ",role.name);
            if((role.name).trim() === 'Administrator'){
                console.log("role name inside** ",role.name);
                person.set({
                    isAuthorized : true,
                    personUUID : person.firsName+""+person.age+""+person.gender+""+person.mobileNo
                });
            }
        }).catch(err=>console.log(err.message));
        person.save();
        res.send("created");
        }catch(err){
          console.log(err);
        }

    });


    //to get list of all persons
    personRouter.get('/getAllRegisteredPerson',(req,res)=>{
        getRoleOfUser(req.body.user).then(role=>{
            console.log("role name ** ",role.name);
            if(JSON.stringify(role.name) === 'AccessUser'){
                res.send("Not accessible to AccessUser");
            }
        }).catch(err=>console.log(err.message));

    Person.find().then(persons =>{
        console.log(persons);
        res.send(persons)}).catch(err =>console.log(err));
   
   });

   //to get person by id
   personRouter.get('/getPersonById/:id',(req,res)=>{
       Person.findById(req.params.id).then(person => {console.log(person);
       res.send(person);
    }).catch(err =>console.log(err));

   });

   //update person
   personRouter.put('/updatePerson',(req,res)=>{
       console.log("id is *** ",req.body.id);
    Person.findById(req.body.id).then(person => {console.log(person);
        person.set({
            firstName:req.body.firstName,
            middleName:req.body.middleName,
            lastName:req.body.lastName,
            gender : req.body.gender,
            age : req.body.age,
            address : req.body.address,
            mobileNo : req.body.mobileNo,
            city:req.body.city,
            maritialStatus : req.body.maritialStatus,
            physicalDisablity : req.body.physicalDisablity,
            user:req.body.user
        });

        if(person.personUUID === " "){
            getRoleOfUser(req.body.user).then(role=>{
                console.log("role name ** ",role.name);
                let name = JSON.stringify(role.name);
                if(name === 'Administrator'){
                    person.set({
                        isAuthorized : true,
                        personUUID : person.firsName+""+person.age+""+person.gender+""+person.mobileNo
                    });
                   
                }
            }).catch(err=>console.log(err.message));  
        }
        person.save();
        console.log(person);
        res.send(person);
    }).catch(err => console.log(err));
   });

   //delete person
   personRouter.delete('/deletePerson/:id',(req,res)=>{
    Person.findById(req.params.id).then(person=>{person.delete(); 
    res.send("deleted");}).catch(err=>console.log(err));
   });



   //person details authorized by Administrator
   personRouter.put('/authenticatePerson/:id',(req,res)=>{
    Person.findById(req.params.id).then(person => {console.log(person);
        res.send(person);
     }).catch(err =>console.log(err));

     

     //not completed
   });





  //search criteria on basis of name , age and city
   personRouter.post('/searchPerson/:userId',(req,res)=>{
    getRoleOfUser(req.params.userId).then(role=>{
        console.log("role name ** ",role.name);
        if(JSON.stringify(role.name) === 'AccessUser'){
            res.send("Not accessible to AccessUser");
        }
    }).catch(err=>console.log(err.message));

    if(req.body.firstName != '' && req.body.firstName != null && req.body.age != null && req.body.age != '' && req.body.city != '' && req.body.city != null ){
        searchCriteria.findByNameAndCityAndAge(req.body.firstName,req.body.city,req.body.age).then(persons=>res.send(persons)).catch(err => console.log(err.message));  
    }else if(req.body.firstName != '' && req.body.firstName != null && req.body.age != null && req.body.age != ''){
        searchCriteria.findByNameAndAge(req.body.firsName,req.body.age).then(persons => res.send(persons)).catch(err => console.log(err.message));
    }else if( req.body.age != null && req.body.age != '' && req.body.city != '' && req.body.city != null){
        searchCriteria.findByCityAndAge(req.body.city,req.body.age).then(persons=>res.send(persons)).catch(err => console.log(err.message));
    }else  if( req.body.firstName != '' && req.body.firstName != null && req.body.city != '' && req.body.city != null ){
         searchCriteria.findByNameAndCity(req.body.firstName,req.body.city).then(persons=>res.send(persons)).catch(err => console.log(err.message));
    }else if(req.body.city != '' && req.body.city != null){
        searchCriteria.findByCity(req.body.city).then(persons=>res.send(persons)).catch(err => console.log(err.message));
    }else if(req.body.age != null && req.body.age != ''){
        searchCriteria.findByAge(req.body.age).then(persons=>res.send(persons)).catch(err => console.log(err.message));
    }else{
        searchCriteria.findByName(req.body.firstName).then(persons=>res.send(persons)).catch(err => console.log(err.message));
    }
 });


    async function getRoleOfUser(user){
       let userObj = await User.findById(user);
       let role = await Role.findById(userObj.role);
       return role;
    }

   module.exports = personRouter;