const PersonObj  = require('./modals.js').personSchema;

 async function findByName(name){
  let persons = await  PersonObj.find({firstName:name});
  return persons;
 }

 async function findByAge(age){
  let persons = await  PersonObj.find({age:age});
  return persons;
 }

 async function findByCity(city){
   let persons = await PersonObj.find({city:city}); 
   return persons; 
 }

 async function findByNameAndAge(name,age){
     let persons = await PersonObj.find({firstName:name,age:age});
     return persons;
 }
  
 async function findByCityAndAge(city,age){
  let persons = await PersonObj.find({city:city,age:age});
  return persons;
}


async function findByNameAndCity(name,city){
  let persons = await PersonObj.find({firstName:name,city:city});
  return persons;
}

async function findByNameAndCityAndAge(name,city,age){
  let persons = await PersonObj.find({firstName:name,city:city,age:age});
  return persons;
}

module.exports.findByName = findByName;
module.exports.findByAge = findByAge;
module.exports.city = findByCity;
module.exports.findByNameAndAge = findByNameAndAge;
module.exports.findByNameAndCity = findByNameAndCity;
module.exports.findByCityAndAge = findByCityAndAge;
module.exports.findByNameAndCityAndAge = findByNameAndCityAndAge;