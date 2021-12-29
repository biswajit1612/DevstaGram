import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); //if there is a currentid then it wiil loop over state.posts and find the post which is equal to currentid and will return that to fill the post or else it will return null
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));  //to get anything stored in local storage we need to parse it

    useEffect(() => {
        if(post) setPostData(post);   //if post exists which we get when we have currentid then we are using the setter function and setting the entire postData now it will be displayed in form...here since we are not setting individual fields so we dont need to spread directly we are setting the entire postData(because the form needs every field to be filled)
    }, [post])    //it will run when the post value changes(dependency value)
    
    const clear = () => {
        setCurrentId(0);
        setPostData({title: '', message: '', tags: '', selectedFile: ''});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //we fill a form either for creating or updating a post and  now when we submit a form if there is currentId then its for update or else create
        if(currentId) { 
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else{
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    }
    
    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own DevPost and like other's post.
            </Typography>
          </Paper>
        );
    }
    //postdata holds the data(state) while setpostdata is a setter function...while onchange event when we set data first spread all data then update the required one or else it will only add the updated one and rest other field will be missing
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a DevPost</Typography> 
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
};

export default Form;