
const mongoose=require('mongoose');
require('dotenv').config();


//const mongourl='mongodb://localhost:27017/mydb';
const mongourl=process.env.MONGO_DBURL;
mongoose.connect(mongourl)
.then(()=>{
    console.log('connected suceesfully');
})
.catch(()=>{
    console.error('connection disconnected due to error',err);
});
module.exports=mongoose;

// const mongourl='mongodb://localhost:27017/sonu';
// mongoose.connect(mongourl);
//  const db=mongoose.connection;

//  db.on('connected',()=>{
//    console.log('mongodb connected sucessfully');
//  });
//  db.on('disconnected',()=>{
//    console.log('mongodb disconnected ');
//  });  

//  db.on('error',()=>{
//    console.error('mongodb disconnected due to error',err);
//  });
 
//  module.exports=db;
 
