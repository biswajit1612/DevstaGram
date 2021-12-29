import express from 'express';
import { signin, signup} from '../controllers/user.js'; //named export therefore we use {} while importing....in node while importing we need to add .js
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;