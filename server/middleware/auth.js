import jwt from 'jsonwebtoken';
import decode from 'jwt-decode';
const auth = async (req, res, next) => {
    //here before a user performs a action we will check whether the user is owner or not
    try {
        const token = req.headers.authorization.split(" ")[1];   //we will get the token if user is logged in ...but we need to identify whether this token is our own token or the google auth token
        const isCustomAuth = token.length < 500; //if it is less than 500 then it is our own token or else google auth token

        let decodeData;
        if(token && isCustomAuth){
            //for own token
            decodeData = jwt.verify(token, 'Devstagram');  //this will give us the result which we passed while making token and salt is also passed
            req.userId = decodeData?.id;
        } else {
            //for google auth token
            decodeData = decode(token); //here we need to pass only token
            req.userId = decodeData?.id;
        }
        next();
    } catch (error) {
        console.log(error);
    }
}
export default auth;