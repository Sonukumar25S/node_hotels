const mongoose=require('mongoose');
const personschema=new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        age:{
            type:Number
        },
        mobile:{
            type:String,
            required:true,
            unique:true
        },
        salary:{
            type:Number,
            required:true
        },
        work:{
            type:String,
            enum:['chef','waiter','manager']
        }
});

const person=mongoose.model('person',personschema);
module.exports=person;