const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please add the user Name"],    
    },
    email : {
        type : String,
        required : [true, "Please add the user email address"],
        unique: [true, "Email Adress already taken"],   
    },
    password : {
        type : String,
        required : [true, "Please add the user password"],    
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("User" , userSchema);