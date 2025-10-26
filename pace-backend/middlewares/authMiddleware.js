import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import { HTTP_STATUS } from '../utils/httpStatus.js';

// This is for both students and seniorCordinator authentication
export const authenticate = asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Access Token Missing" });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Token is invalid or expired' });
    }
});

// this one if for role based access to Admin panel
export const checkAdminRole = (req, res, next) => {

    if (req.user && req.user.role === 'seniorCordinator') {
        next();
    } else {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ message: 'Not authorized as an admin' });
    }
};