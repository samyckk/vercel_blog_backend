import Comment from "../model/comment.js";


export const addComment = async (request,response)=>{
    const comment = request.body;
    try{ 
        const newComment = new Comment(comment);
        await newComment.save();
        return response.status(200).json({msg: "Comment added"});
    }
    catch(err){
        return response.status(500).json({msg: err.message});
    }

}

export const getComments = async (request, response)=>{
    try{
        const comments = await Comment.find({postId: request.params.id});
        return response.status(200).json(comments);
    }
    catch(err){
        return response.status(500).json({msg: err.message});
    }
}

export const deleteComment = async (request, response) => {
    try{
        const comment = await Comment.findById(request.params.id);

        if(!comment){
            return response.status(404).json({msg:"Comment not found"});
        }

        await Comment.findByIdAndDelete(request.params.id);
        console.log("comment deleted re");
        return response.status(200).json({msg: "comment deleted successfully"});
    }
    catch(err){
        return response.status(500).json({msg:"error in deleting comment", err});
    }
}