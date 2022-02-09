import React, { useState, useEffect }  from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';


//to know what is my current location and what i have searched... it will act as a hook
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
        const [currentId, setCurrentId] = useState(0);
        const classes = useStyles();
        const dispatch = useDispatch();
        const query = useQuery();
        const navigate = useNavigate();
        const page = query.get('page') || 1;  //it will read the URL and look for page parameter and populate the variable ...if it is not there that means we are in first page
        const searchQuery = query.get('searchQuery');
        const tagQuery = query.get('searchQuery');
        const [search, setSearch] = useState('');
        const [tags, setTags] = useState([]);

        // useEffect(() => {
        //     dispatch(getPosts()); //we are triggering an action creator then from there we fetch our posts and then using dispatch we trigger our reducer which will return new state
        // },[currentId, dispatch])  //here we have added currentId because useEffect gets executed at start then it waits for its dependency to change then it will run and by default currentId is set to null so when we want to update a post the currentid is set to post so useeffect will fetch posts and when we update it becomes null so currentid changes and then we again fetch posts with the updated post
        
        const searchPost = () => {
            //trim if blank space is not there then search
            if(search.trim() || tags){
                //dispatch -> fetch search post
                //searchQuery is a object which contains search and tags
                //tags is an array which we cant pass in url so we are joining it with , to pass a string in url
                dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
                navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${(tags.join(','))}`);
            } else {
                navigate('/');
            }
        }

        const handleKeyPress = (e) => {
            if(e.keyCode === 13){
                //search post
                searchPost();
            }
        };
        const handleAdd = (tag) => setTags([...tags, tag]);  //we are spreading the previous tags in array and then adding the new tag

        const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));   //filter returns a new array now we will check tag one by one if they are not equal to tagToDelete then we add it in array
     
     return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container className={classes.gridContainer} justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                name="search"
                                variant="outlined"
                                label="Search DevPost"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput 
                                style={{ margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        {(!searchQuery && !tags.length) &&
                            <Paper className={classes.pagination} elevation={6}>   
                                <Pagination page={page} />
                            </Paper>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};
    
//elevation in material ui gives us a effect in which page looks lifted up in the background with a shadow and border effect

export default Home;
