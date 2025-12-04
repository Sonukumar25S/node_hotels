const mongoose=require('mongoose');

const menuscheme=new mongoose.Schema({
                name:{
                    type:String,
                    required:true
                },
                price:{
                    type:Number,
                    required:true
                },
                taste:{
                    type:String,
                    enum:['spicy','sweet','sour'],
                    required:true
                },
                is_drink:{
                    type:Boolean,
                    default:false
                },
                ingredients:{
                    type:[String],
                    default:[]
                },
                noofsale:{
                    type:Number,
                    default:0
                }
});

const menu=mongoose.model('menu',menuscheme);
module.exports=menu;