const User = require("../../model/user/user");


const bcrypt = require("bcryptjs");
const appErr = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");

const { createSendToken } = require("../authController");

const userProfileCtrl = async (req, res, next) => {
  // console.log(req.userAuth);

  try {
    const token = getTokenFromHeader(req);
    // console.log(token);
    const user = await User.findById(req.user);
    // console.log(user);
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const userProfileByUserNameCtrl = async (req, res, next) => {
  //as username is unique
  // console.log(req.userAuth);
  const UserName = req.params;
  // console.log(name.id);
  try {
    const token = getTokenFromHeader(req);
    // console.log(token);
    const user = await User.find({ userName: UserName.id });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const whoViewedMyProfileCtrl = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const userWhoViewed = await User.findById(req.userAuth);

    //check if user and userwhoviewed are found

    if (user && userWhoViewed) {
      //check if user and userwhoviewed is already in the users viewers array
      const isUserAlreadyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toString()
      );

      if (isUserAlreadyViewed) {
        return next(appErr("you already viewed this profile"));
      } else {
        user.viewers.push(userWhoViewed._id);

        await user.save();
        res.json({
          status: "success",
          data: "you have successfully viewed this profile",
        });
      }
    }
  } catch (error) {
    next(appErr(error.message));
  }
};





//block


//unblock


const adminBlockUsersCtrl = async (req, res, next) => {
  try {
    const userToBeBlocked = await User.findById(req.params.id);

    if (!userToBeBlocked) {
      return next(appErr("user not found"));
    }

    userToBeBlocked.isBlocked = true;

    await userToBeBlocked.save();
    res.json({
      status: "success",
      data: " u have succesfully blocked this user",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const adminUnBlockUsersCtrl = async (req, res, next) => {
  try {
    const userToBeUnBlocked = await User.findById(req.params.id);

    if (!userToBeUnBlocked) {
      return next(appErr("user not found"));
    }

    userToBeUnBlocked.isBlocked = false;

    await userToBeUnBlocked.save();
    res.json({
      status: "success",
      data: " u have succesfully unblocked this user",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const usersCtrl = async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deleteUserAccountCtrl = async (req, res, next) => {
  try {
    const userToDelete = await User.findById(req.userAuth);

    await Post.deleteMany({ user: req.userAuth });
    await Comment.deleteMany({ user: req.userAuth });
    await Category.deleteMany({ user: req.userAuth });
    await userToDelete.delete();
    res.json({
      status: "success",
      data: "u have successfully deleted your account ",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const updateUserCtrl = async (req, res, next) => {
  const { email, lastName, firstName } = req.body;

  try {
    // checking if email is not taken

    if (email) {
      const emailTaken = await User.findOne({ email });

      if (emailTaken) {
        return next(
          appErr("email already taken ..so u cant update the email", 400)
        );
      }
    }

    //update the user

    const user = await User.findByIdAndUpdate(
      req.userAuth,
      {
        lastName,
        firstName,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const updatePasswordCtrl = async (req, res, next) => {
  const { password } = req.body;
  try {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //update user

      const user = await User.findByIdAndUpdate(
        req.userAuth,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.json({
        status: "success",
        data: "password changed succcesfully",
      });
    } else {
      return next(appErr("please provide password field"));
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const profilePhotoUploadCtrl = async (req, res, next) => {
  // console.log(req.file)
  try {
    const userToUpdate = await User.findById(req.userAuth);

    if (!userToUpdate) {
      return next(appErr("user not found", 403));
    }
    if (userToUpdate.isBlocked) {
      return next(appErr("action not allowed", 403));
    }

    if (req.file) {
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );

      res.json({
        status: "success",
        data: "you have successfully uploaded profile photo ",
      });
    }
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

// isme sirf abhi summary bhejna hai ..ye kaam krna hai ankit tee ko

const addToCartCtrl = async (req, res, next) => {


  // console.log(req.body);
  const ele = req.body;
  

  try {
    const token = getTokenFromHeader(req);

    const user = await User.findById(req.user);
  // console.log(user);
    const existingCartItems = user.cart;
  // console.log(existingCartItems);

    // console.log(existingCartItems);
    for (const item of ele) {
      const existingCartItem = existingCartItems.find((cartItem) => cartItem.id === item.id);
   
     
      if (existingCartItem) {
        // If the amount has changed, update the cart item
        if (existingCartItem.amount !== item.amount) {
          existingCartItem.amount = item.amount;
          user.markModified('cart')
          await user.save(); // Save changes for the existing cart item

        }
      } else {
        existingCartItems.push(item);
      }
    }


    // Remove deleted cart items if any due to which this route has called by frontened
    existingCartItems.forEach((existingCartItem, index) => {
      const matchingItem = ele.find((item) => item.id === existingCartItem.id);
      if (!matchingItem) {
        existingCartItems.splice(index, 1);
      }
    });

    user.markModified('cart');
    await user.save();

    res.json(
      {
        status: "success",
        data: user.cart
      }
    )


  } catch (error) {

    console.log(error.message);
  }



}


const getCartdataCtrl = async (req, res) => {

  try {
    const token = getTokenFromHeader(req);
    // console.log(token);
    const user = await User.findById(req.user);
    // console.log(user);
    const existingCartItems = user.cart;
  // console.log(existingCartItems);
    res.json({
      status: "success",
      data: existingCartItems
    })


  } catch (error) {
    console.log(error.message);
  }

}

const userLogOutCtrl = async (req, res) => {

  try {
    res.clearCookie('jwt');
    res.status(200).send('user logout');
  } catch (error) {
    console.log(error);
  }


}

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
    // const salt = await bcrypt.genSalt(12);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      userName,

      email,
      password,
      phone,
      photo: req && req.file && req.file.path,
    });

    createSendToken(user,201,res);
    // res.json({
    //   status: "success",
    //   data: user,
    // });
  } catch (error) {
    console.error(error);
  }
}
module.exports = {
  userProfileCtrl,
  usersCtrl,
  deleteUserAccountCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl,
 
  
  adminBlockUsersCtrl,
  adminUnBlockUsersCtrl,
  updatePasswordCtrl,
  userProfileByUserNameCtrl,
  
  addToCartCtrl,
  getCartdataCtrl,
  userLogOutCtrl,
  userRegisterCtrl
};
