import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        creator:'', title: '', message: '', tags: '', selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); //if there is a currentid then it wiil loop over state.posts and find the post which is equal to currentid and will return that to fill the post or else it will return null
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        if(post) setPostData(post);   //if post exists which we get when we have currentid then we are using the setter function and setting the entire postData now it will be displayed in form...here since we are not setting individual fields so we dont need to spread directly we are setting the entire postData(because the form needs every field to be filled)
    }, [post])    //it will run when the post value changes(dependency value)

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else{
            dispatch(createPost(postData));
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({creator:'', title: '', message: '', tags: '', selectedFile: ''});
    }
    //postdata holds the data(state) while setpostdata is a setter function...while onchange event when we set data first spread all data then update the required one or else it will only add the updated one and rest other field will be missing
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a DevPost</Typography> 
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData, creator:e.target.value})}/>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title:e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message:e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value.split(',')})}/>
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;