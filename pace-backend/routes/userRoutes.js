import express from 'express';
import { userLogin, userRegister, refreshAccessToken ,userLogout} from '../controller/userController.js'
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/register', userRegister);
router.post('/login', userLogin);
router.post('/refresh-token', refreshAccessToken)
router.post('/logout',userLogout)


router.get('/protected', authenticate, (req, res) => {
    res.json('Success')
})



export default router;