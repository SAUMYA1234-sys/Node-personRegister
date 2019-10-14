const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Register').then(()=>console.log("connected to MongoDB")).
catch(err =>{console.error("Could not connect",err)});

const express = require('express');
const app = express();
const person = require('./personCrud');
const roles = require('./roles');
const user = require('./user');
app.use(express.json());
app.use('/',person);
app.use('/',roles);
app.use('/',user);



const port = process.env.port;
    app.listen(4001,()=>console.log(`listened here.. ${port}`));