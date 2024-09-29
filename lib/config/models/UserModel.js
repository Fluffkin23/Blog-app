import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:'user',
    },
    profile_pic:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const UserModel = mongoose.models.user || mongoose.model('user', Schema);

export default UserModel;