import Post from '../model/post.js';



//Creating Posts
export const createPost = async (request, response)=>{
    try{
        const post = request.body;
        const newPost = new Post(post);
        await newPost.save();
        console.log("Post is saved successfully");

        return response.status(200).json({msg : "Published successufully"});
    }
    catch (err) {
        response.status(500).json({msg :"Error while publishing post"});
    }
    
}

//Sending Posts

export const sendPost = async(request, response)=>{
    try{
        let category = request.query.category;
        let posts;
        if(category !== "All"){
            posts = await Post.find({category: category});
        }
        else{
            posts = await Post.find({});
        }
         


        return response.status(200).json(posts);
    }
    catch (err) {
        return response.status(500).json({msg :"Error while fetching post"});
    }
}

export const sendPostById = async (request, response) => {
    try{
        const posts = await Post.findById(request.query.id);
        return response.status(200).json(posts);
    }
    catch(err){

        return response.status(500).json({msg :"Error in Detail backend"});
    }
}

export const updatePost = async (request, response) =>{
    try{
        const post = await Post.findById(request.query.id);
        if(!post){
            console.log("Rejecting update");
            return response.status(404).json({msg: "No post found"});
        }
        
        await Post.findByIdAndUpdate(request.query.id, {$set: request.body});

        return response.status(200).json({msg: "Post updated successfully"});
    }
    catch(error){
        return response.status(500).json({msg: "Error updating post"});
    }
}

export const deletePost = async (request, response) => {
    try{
        const post = await Post.findById(request.params.id);
        if(!post){
            console.log("Rejecting deletiion");
            return response.status(404).json({msg: "No post found to delete"});
        }
        await Post.findByIdAndDelete(request.params.id);

        return response.status(200).json({msg: "Deleted successfully"});
    }
    catch(error){
        console.log("Error while deleting post");
        return response.status(404).json({msg:"Error while deleting post"});
    }
}