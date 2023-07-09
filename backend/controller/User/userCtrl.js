const User = require("../../model/user/user");
const appErr = require("../../utils/appErr");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeaders");

const userRegisterCtrl = async (req, res) => {

  const { name, userName, email, password, phone } = req.body;

  // console.log(name, userName);


  try {
    //checking if email is already exist
    const userfound = await User.findOne({ email });
    if (userfound) {
      return (res.status(500).json({ status: "error" }));
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      userName,

      email,
      password: hashedPassword,
      phone,
      photo: req && req.file && req.file.path,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error(error);
  }
}


const userLoginCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {

    //checking if email exist
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return (res.status(500).json({ status: "error" }))


    }

    //checking the password

    const ispasswordmatched = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!ispasswordmatched) {
      return (res.status(500).json({ status: "error" }));
    }

    const token = await generateToken(userFound._id);
    console.log(token);

    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true
    });

    res.json({
      status: "success",
      data: {
        name: userFound.name,
        userName: userFound.userName,
        email: userFound.email,
        token

      },
    });
  } catch (error) {
    res.status(500).json(
      {
        error: false, message: "inavlid user"
      })
  }
};




const userLogOutCtrl = async (req, res) => {

  try {
    res.clearCookie('jwtoken');
    res.status(200).send('user logout');
  } catch (error) {
    console.log(error);
  }


}

const userProfileCtrl = async (req, res, next) => {
  // console.log(req.userAuth);

  try {
    const token = getTokenFromHeader(req);
    // console.log(token);
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = { userRegisterCtrl, userLoginCtrl, userProfileCtrl, userLogOutCtrl };