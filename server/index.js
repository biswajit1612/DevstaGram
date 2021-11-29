import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true}));   //to parse json from incoming request before passing on to handler
app.use(express.urlencoded({limit: "30mb", extended: true}));   //to parse urlencoded from incoming request before passing on to handler
app.use(cors());  //Express allows you to configure and manage an HTTP server to access resources from the same domain.But when we need to access from different domain we use cors...CORS is a browser security feature that restricts cross-origin HTTP requests with other servers and specifies which domains access your resources.

app.get('/', (req,res) => {
    res.send("Hello go to /posts");
})
//const DB_URL = 'mongodb+srv://Biswajit:bissuTapu@cluster0.3tnbh.mongodb.net/DevstaGram?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
//mongoose connection
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connection Open!!');
    })
    .catch((err) => {
        console.log(err.message);
    })

// mongoose.set('useFindAndModify', false);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Server runing on Port ${PORT}`);
})