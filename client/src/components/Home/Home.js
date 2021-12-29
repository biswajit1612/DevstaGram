 import React, { useState, useEffect }  from 'react'
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import useStyles from '../../styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
        const [currentId, setCurrentId] = useState(0);
        const classes = useStyles();
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(getPosts()); //we are triggering an action creator then from there we fetch our posts and then using dispatch we trigger our reducer which will return new state
        },[currentId, dispatch])  //here we have added currentId because useEffect gets executed at start then it waits for its dependency to change then it will run and by default currentId is set to null so when we want to update a post the currentid is set to post so useeffect will fetch posts and when we update it becomes null so currentid changes and then we again fetch posts with the updated post
     return (
        <Grow in>
            <Container>
                <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};
    


export default Home;
