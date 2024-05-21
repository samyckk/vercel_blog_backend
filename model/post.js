import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    category:{
        type: String
    },
    createdDate:{
        type: Date
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
    },
    title:{
        type: String,
        required: true,
        unique: true

    },
    username: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;