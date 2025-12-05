const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
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
        },
        username:{
            type:String,
            required:true 
        },
        password:{
            type:String,
            required:true
        }
});
personschema.pre('save',async function () {
    const person=this;  //it takes the detail of person
    //hash the password only if it has been modified or new
    if(!person.isModified('password')) return ;
    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);
        //hash password
        const hashedpassword=await bcrypt.hash(person.password,salt);
        person.password=hashedpassword;//override the plain text password
             return;
    }
    catch(error)
    {
            return  ;
    }
})
  
  personschema.methods.comparepassword=async function(candidatepassword)
  {
    
    try{
         //use bcrypt to compare the provided password with the hashed password
       
         const ismatch=await bcrypt.compare(candidatepassword,this.password);
         return ismatch;
    }
    catch(err){
                throw err;
    }
  }


      //create person model
const person=mongoose.model('person',personschema);
module.exports=person;