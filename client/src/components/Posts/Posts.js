import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    //since it is an object and we want a particular part so we destructure it 
    const { posts, isLoading } = useSelector((state) => state.posts); //we get access to the whole redux store that is the state which helps us to read and access them...from there we access posts which is passed during combine reducer 
    const classes = useStyles();

    //console.log(posts);
    //if there is no post that is length is 0 then loading symbol or else posts
    if (!posts?.length && !isLoading) return 'No Posts';
    return ( 
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
        ) 
    );
}

export default Posts;