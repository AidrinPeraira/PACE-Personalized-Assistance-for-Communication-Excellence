import jwt from 'jsonwebtoken';


export const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
}
export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
}