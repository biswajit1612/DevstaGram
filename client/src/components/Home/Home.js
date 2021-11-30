import React, { useState, useEffect }  from 'react'
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import useStyles from '../../styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
        const [currentId, setCurrentId] = useState(null);
        const classes = useStyles();
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(getPosts()); //we are triggering an action creator then from there we fetch our posts and then using dispatch we trigger our reducer which will return new state
        },[currentId, dispatch])
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
