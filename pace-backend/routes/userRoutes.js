import express from 'express';
import { userLogin, userRegister, refreshAccessToken ,userLogout, checkUser} from '../controller/userController.js'
import { authenticate } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/refresh-token', refreshAccessToken)
router.post('/logout',userLogout)

// Frontend state manage
router.get('/status', authenticate,checkUser)



export default router;