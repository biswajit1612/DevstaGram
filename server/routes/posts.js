import express from 'express';
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'; //named export....in node while importing we need to add .js
import auth from '../middleware/auth.js'; //to check whether a user is logged in or not ...we are checking if token is present or not which will be there only after we login or signup and if it is there we are getting the userId from the token and setting it to req.userid and then we can perform our  next operation which is in controller or else if token is not there then we will get an error
const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
export default router;