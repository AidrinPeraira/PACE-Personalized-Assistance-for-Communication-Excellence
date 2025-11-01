import asyncHandler from '../middlewares/asyncHandler.js';
import jwt, { decode } from 'jsonwebtoken'
import { HTTP_STATUS } from '../utils/httpStatus.js';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { usernameRegex, passwordRegex, emailRegex, batchRegex } from '../validators/validators.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenService.js';


const userRegister = asyncHandler(async (req, res) => {
    const { name : username, email, password, batch } = req.body;
    console.log(req.body)

    if (!usernameRegex.test(username)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid username" });
    }
    if (!emailRegex.test(email)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid Email!" })
    }
    if (!passwordRegex.test(password)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid Password Format" });
    }
    // if (!batchRegex.test(batch)) {
    //     return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid Batch" });
    // }


    const userExist = await User.findOne({ email })

    if (userExist) return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "User Already Exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        batch
    });

    await newUser.save();

    res.status(HTTP_STATUS.CREATED).json({user : {
        username : newUser.username,
        email :newUser.email,
        batch : newUser.batch,
        role : newUser.role

        }, message: "Registeration Success wait for the Approval"
    });

});

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!emailRegex.test(email)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid Email Format" });
    }
    if (!passwordRegex.test(password)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid Password Format" })
    }


    const user = await User.findOne({ email });

    if (!user) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "User not found!" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid credentials" });
    }
    if (!user.isActive) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Your account is deactivated. Please contact support." });
    }

    if (!user.isApproved) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Your account is not yet approved." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
        path: '/'
    })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: process.env.REFRESH_TOKEN_COOKIE_PATH
    })

    res.status(HTTP_STATUS.OK).json({
        user: {
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.role
        },
        message: "Login success"
    })

});


const refreshAccessToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(req.cookies.refreshToken)

    if (!refreshToken) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Refresh Token Missing' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const userPayload = {
        _id: decoded.id,
        username: decoded.username,
        role: decoded.role
    }

    if (!userPayload._id) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid Refresh Token Payload' });
    }
    const newAccessToken = generateAccessToken(userPayload);

    res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
        path: '/'
    })

    res.status(HTTP_STATUS.CREATED).json({ message: "AccessToken Refreshed..." })
});

const userLogout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: process.env.REFRESH_TOKEN_COOKIE_PATH
    })

    res.status(HTTP_STATUS.OK).json({ message: "Logout Successful" })
})

const checkUser = asyncHandler(async(req,res) =>{
    res.status(HTTP_STATUS.OK).json({user: req.user})
})

export {
    userLogin,
    userRegister,
    refreshAccessToken,
    userLogout,
    checkUser
}




