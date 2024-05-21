import express from 'express';
import { signupUser, loginUser} from '../controller/user-controller.js';
import { createPost,sendPost, sendPostById, updatePost, deletePost } from '../controller/post-controller.js';
import {addComment, getComments, deleteComment} from '../controller/comment-controller.js';

//THIS is middleware function
import { authenticateToken } from '../controller/jwt-controller.js';


const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/create',authenticateToken, createPost);
router.get('/posts',authenticateToken, sendPost);
router.get('/postById',authenticateToken, sendPostById);
router.put('/updatePost', authenticateToken, updatePost);
router.delete('/deletePost/:id', authenticateToken, deletePost);
router.post('/addComment',authenticateToken, addComment);
router.get('/comments/:id',authenticateToken, getComments);
router.delete('/deleteComment/:id', authenticateToken, deleteComment);

// app.get('*',(req,res,next)=>{
//     res.status(200).json({
//       message:'bad request'
//     })
//   })


export default router;