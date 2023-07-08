const User = require("../../model/user/user");
const appErr = require("../../utils/appErr");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");


const userRegisterCtrl = async (req, res) => {

    const { name, userName, email, password, phone } = req.body;

    // console.log(name, userName);

    
    try {
        //checking if email is already exist
        const userfound = await User.findOne({ email });
        if (userfound) {
            return (res.status(500).json({ status: "error"}));
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            userName,

            email,
            password:hashedPassword,
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
        return (res.status(500).json({ status: "error"}))
        
        
      }
  
      //checking the password
  
      const ispasswordmatched = await bcrypt.compare(
        password,
        userFound.password
      );
  
      if (!ispasswordmatched) {
        return  (res.status(500).json({ status: "error"}));
      }
  
      res.json({
        status: "success",
        data: {
          name: userFound.name,
          userName: userFound.userName,
          email: userFound.email,
          token: generateToken(userFound._id),
          
        },
      });
    } catch (error) 
    {
      res.status(500).json(
        { error: false, message: "inavlid user" 
      })
    }
  };

module.exports = { userRegisterCtrl ,userLoginCtrl};