import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req,res) => {
   try{
       const postMessages = await PostMessage.find();
       res.status(200).json(postMessages); //ok
   }
   catch (error){
       res.status(404).json({message: error.message}); 
   }
}

export const createPost = async (req,res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);   //succesfully created
    } catch (error) {
        res.status(409).json({message: error.message});   //conflict error
    }
}

export const updatePost = async (req,res) => {
    const { id : _id } = req.params;
    const post = req.body;  //it consists of form data but it does not have id ..since we are updating a document which has a id already in database so we need to pass the id also(but i dont think its necessary)
    //we are checking if the id we have passed is valid or not
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id }, { new: true});  //new will return the updated post
    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully'})
}

export const likePost = async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');
    const post = await PostMessage.findById(id); //we are finding this post so that we can pass it in upadate parameter
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount : post.likeCount + 1 }, {new : true});  // we found the same post again but used the previous one here to update the like count
    res.json(updatedPost);
}