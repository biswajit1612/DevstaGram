import bcrypt from 'bcryptjs';  //to hash password and save it in database
import jwt from 'jsonwebtoken';  // to store the user for a certain period of time in browser
import User from "../models/user.js";

export const signin = async (req, res) => {
    const { email, password } = req.body; //it is a post request
    try {
        const existingUser = await User.findOne({ email }); //we will find the existing user
        if(!existingUser) res.status(404).json({ message: "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);  //it will compare it with hashed password
        if(!isPasswordCorrect) res.status(400).json({ message: "Invalid Credentials" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'Devstagram' ,{ expiresIn: "1h" }); //jwt is used to send information in form of token to browser along with secret code

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong "});
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body; //it is a post request

    try {
        const existingUser = await User.findOne({ email }); //we will find the existing user and if it exists we won't be allowed to create an another account
        if(existingUser) res.status(400).json({ message: "User already exists"});

        if(password !== confirmPassword) res.status(400).json({ message: "Password do not match"});
        //if user already doesn't exist and the passwords match then we hash password and create user
        const hashedPassword = await bcrypt.hash(password, 12); //we are hashing the password and salt is the level of difficulty and mostly people use 12
        //create user
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});
        const token = jwt.sign({ email: result.email, id: result._id }, 'Devstagram' ,{ expiresIn: "1h" }); //jwt is used to send information in form of token to browser along with secret code
        
        //res.status(200).json({ result: result, token }); here result itself is result(user)
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    
        console.log(error);
    }


}