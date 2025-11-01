import express from 'express';
import { userLogin, userRegister, refreshAccessToken ,userLogout, checkUser} from '../controller/userController.js'
import { authenticate } from '../middlewares/authMiddleware.js';
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router();
const refreshPath = process.env.REFRESH_TOKEN_PATH;


router.post('/register', userRegister);
router.post('/login', userLogin);
router.post(refreshPath, refreshAccessToken)
router.post('/logout',userLogout)

// Frontend state manage
router.get('/status', authenticate,checkUser)



export default router;