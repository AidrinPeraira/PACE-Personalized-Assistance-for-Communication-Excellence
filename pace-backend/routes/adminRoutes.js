import express from 'express';
import { authenticate, checkAdminRole } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/dash', authenticate, checkAdminRole, (req, res) => {
    res.json({ message: 'admin accessed' })
})

export default router;