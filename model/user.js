import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const user = mongoose.model('users', userSchema);    //user is collection and userSchema is schema which has to be applied

export default user;