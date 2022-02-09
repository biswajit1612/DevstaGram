import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import devstagramLogo from '../../images/Devstagram-Logo.png';
import devstagramText from '../../images/DevstagramText.png';
const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        //after dispatching logout we need to redirect to home page
        navigate('/');
       
        //now since we dont have any user so we will set it to null
        setUser(0);
        window.location.reload();
    };
    //when we login after successful login we are redirected to home page but in navbar the changes are not reflected because it got loaded once before we login(at that time user was not there in local storage so it was set to null) now after login auth reducer returns a new state which is then provided by the store to all components(also user is there in the local storage) but now we need to set the user from local storage to see the changes...for that we need to use the useEffect Hook where we will set the user...here the dependency we are using is location because when we login we are in /auth and then navigate to '/' so the loaction changes and useEffect hook runs only when there is a change 
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            //if token has expired then we will logout
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        //jwt
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={devstagramText} alt="icon" height="40px"/>
                <img className={classes.image} src={devstagramLogo} alt="devstagram" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar
