const mongoose = require('mongoose');

const connect =mongoose.connect("mongodb://localhost:27017/pegaUser")
connect.then(()=>{
    console.log("Database connected successfully")
    
}).catch((err)=>{
    console.error(err);
});

// Creating a schema
const userSchema=new mongoose.Schema({
    name:{type : String , required : true},  // field in the database table
    email : { type : String,required :true },   // unique value in the column
    password : { type :String, required : true }
})

// collection part

const collection = new mongoose.model("users",userSchema)

module.exports = collection;