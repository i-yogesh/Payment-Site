const mongoose = require("mongoose");
const { string } = require("zod");
mongoose.connect("mongodb://localhost:27017/paytm");


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        minLength:3,
        maxLength:50
    },
    password:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        minLength:3
    },
    firstName:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        maxLength:30
    },
    lastName:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        maxLength:30
    }
});
const AccountsSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    Balance:{
        type:Number,
        reuired:true
    }
});
const User = mongoose.model("User",UserSchema) ;
const Account = mongoose.model("Account",AccountsSchema);
module.exports = {
    Account,
    User,
};