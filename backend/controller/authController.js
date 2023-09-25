const User = require('./../model/user/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError')
const sendEmail = require('./../utils/email');
const { LOADIPHLPAPI } = require('dns');
const UserToken = require('./../model/user/userToken');
const { log } = require('console');
const verifyRefreshToken = ('./../utils/varifyRefreshToken');


const signToken = (id, secret, expireTime) => {
    return jwt.sign({ id }, secret, {
        expiresIn: expireTime
    });
}

exports.createSendToken = async (user, statusCode, res) => {
    
    const accessToken = signToken(user._id, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = signToken(user._id, process.env.JWT_RFRESH_SECRET, process.env.JWT_REFRESH_EXPIRES_IN);

    // console.log(accessToken);
    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.deleteOne({userId: user._id });
    await new UserToken({ userId: user._id, token: refreshToken }).save();

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'lax',
        secure: true
    }

    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
    user.password = undefined;
    
    res.cookie('jwt', refreshToken, cookieOptions);
    // res.cookie('hello', 'fuckall');
    res.status(statusCode).json({
        status: 'success',
        accessToken,
        refreshToken,
        data: {
            userName:user.userName,
            profilePhoto: user.profilePhoto
        }
    });
}


exports.renewAccessToken = catchAsync(async (req, res, next) => {
    // console.log("Hi");
    // const refreshToken = req.body.token;
    // console.log(refreshToken);

    const cookies = req.cookies
    // console.log(req);
    // console.log(cookies);
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })
    const refreshToken = cookies.jwt

    let decoded;
    if (refreshToken) {
        const valid = await UserToken.findOne({ token: refreshToken });
        if (valid) {
            // console.log("humm hm");
            decoded = await promisify(jwt.verify)(refreshToken, process.env.JWT_RFRESH_SECRET);
        } else {
            res.status(404).json({
                message: 'Your are not authenticated 🙃🙃🙃🙃'
            });
        }
    } else {
        res.status(404).json({
            message: 'Please Send refresh token 🙃🙃🙃🙃'
        });
    }

    const accessToken = signToken(decoded.id, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES_IN);

    const x = await User.findById(decoded.id);
    // console.log(decoded.id);
    return res.status(201).json({
        accessToken: accessToken,
        profilePhoto: x.profilePhoto
    });


    console.log("renew");
});


exports.logOut = catchAsync(async (req, res, next) => {
    // const refreshToken = req.body.token;

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;


    const userToken = await UserToken.findOne({ token: refreshToken });

    if (!userToken) {
        // console.log("uooooo");
        return res
            .status(200)
            .json({ error: false, message: "Logged Out Sucessfully" });
    }

    await userToken.remove();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

	res.status(200).json({ error: false, message: "Logged Out Sucessfully" });

})


exports.checkPassAndUserID = catchAsync(async (req, res, next) => {
    let { userName, email } = req.body;
    let resObj = { usernameAva: false, emailAva: false };

    userName = await User.findOne({ userName });

    if (!userName) {
        // console.log("hi user");
        resObj.usernameAva = true;
    }

    email = await User.findOne({ email });

    if (!email) {
        // console.log("hi email");
        resObj.emailAva = true;
    }


    res.status(200).json({
        resObj
    });

});


exports.signup = catchAsync(async (req, res, next) => {

    let { userName, email } = req.body;
    let resObj = { usernameAva: false, emailAva: false };

    userName = await User.findOne({ userName });

    if (!userName) {
        // console.log("hi user");
        resObj.usernameAva = true;
    }

    email = await User.findOne({ email });

    if (!email) {
        // console.log("hi email");
        resObj.emailAva = true;
    }

    if (resObj.usernameAva && resObj.emailAva) {
        const newUser = await User.create(req.body);
        createSendToken(newUser, 201, res);
    }
    else {
        res.status(200).json({
            resObj
        });
    }

})


exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email or password 🙃🙃🙃 !!', 400));
    }
    const user = await User.findOne({ email }).select('+password');

    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect Email or Password 😔😔😔😔 !!', 401));
    }
    this.createSendToken(user, 200, res);
});


exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      
    }
    if (!token) {
        return next(new AppError('You are not logged in 🙃🙃🙃!!', 401));
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_ACCESS_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('This user belonging to this token does not no longer exist. ', 401));
    }
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently change password! Please Long In !!', 401));
    }
    req.user = currentUser;
    next();
});


exports.forgetPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with this email adderess !!', 404));
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/user/resetPassword/${resetToken}`
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (Valid for 10 min).',
            message
        })
        res.status(200).json({
            status: 'success',
            message: 'Token send to email !!'
        })
    }
    catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There war an error to sending mail. Please try again !!', 500));
    }
});


exports.resetPassword = catchAsync(async (req, res, next) => {
    // console.log("Hi....");
    const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ passwordResetToken: hashToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) {
        return next(new AppError('Token is invalid or has expired.!!', 400));
    }
    user.password = req.body.password;
    // user.confirmPassword = req.body.confirmPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    this.createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
        next(new AppError('You are not authenticated !!', 404));
    }

    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Incorrect Password 😔😔😔😔 !!', 401));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    this.createSendToken(user, 200, res);

});

