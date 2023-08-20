const Post = require("../../model/post/post");
const User = require("../../model/user/user");
const Category = require("../../model/category/category");
const appErr = require("../../utils/appErr");
const APIFeatures = require('./../../utils/API Features');
const catchAsync = require('./../../utils/catchAsync');

const createPostCtrl = catchAsync(async (req, res, next) => {
  const { title, subtitle, category, content, minute_read, ContainImage, } = req.body;
  const author = await User.findById(req.user);
  // console.log(req.user);

  const summary = content.substring(0, 200);


  const TITLE = title;

  let ltext = TITLE;
  let text = ltext.toLowerCase();
  let Len = text.length;
  
  let str = "";

  for (let i = 0; i < Len; i++) {
    if (
      (text[i] >= "A" && text[i] <= "Z") ||
      (text[i] >= "a" && text[i] <= "z")
    ) {
      str = str + text[i];
    } else {
      str = str + "-";
    }
  }
  url_title = str;


  const postCreated = await Post.create({
    title,
    subtitle,
    summary,
    ContainImage,
    user: author._id,
    category,
    content,
    minute_read,
    url_title,
    photo: req && req.file && req.file.path,
  });

  author.posts.push(postCreated._id);
  await author.save();

  res.status(201).json({
    status: "success",
    data: {
      data: postCreated
    },
  });
});


//for all post
const fetchPostCtrl = async (req, res, next) => {
  try {

    const posts = new APIFeatures(Post.find({}).populate("user"), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginations();

    const doc1 = await posts.query;


    let doc = [];

    doc1.map((obj) => {
      doc.push(
        {
          title: obj.title,
          id: obj._id,
          likeCnt: obj.likes.length,
          content: obj.summary,
          minRead: obj.minute_read,
          photo: obj.photo,
          user: {
            userName: obj.user.userName,
            name: obj.user.name,
            userId: obj.user._id,
            profilePhoto: obj.user.profilePhoto
          },
          updatedAt: obj.updatedAt,
          ContainImage: obj.ContainImage
        }
      )
    })

    res.json({
      status: "success",
      data: {
        doc
      }
    });
  } catch (error) {
    next(appErr(error.message));
  }

};


const AuthecticatefetchPostCtrl = async (req, res, next) => {
  try {
    const posts = new APIFeatures(Post.find({}).populate("user"), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginations();

    const doc1 = await posts.query;

    const currentUser = await User.findById(req.user);


    // CODE COMPLEXCITY I HAVE TO REDUCE.
    currentUser.like.map(async (obj) => {
      doc1.map(async (ele) => {
        const x = ele._id.toString();
        const y = obj.toString();
        if (x == y) {
          ele.isLike = true;
        }
      })
    });

    // doc1.map(async (obj) => {
    //   currentUser.bookmarks.map(async (ele) => {
    //     const x = ele.toString();
    //     const y = obj._id.toString();
    //     if (x == y) {
    //       ele.isBookmarked = true;
    //     }
    //   })
    // });

    currentUser.Bookmarked_Post.map(async (obj) => {
      doc1.map(async (ele) => {
        const x = ele._id.toString();
        const y = obj.toString();
        if (x == y) {
          ele.isBookmarked = true;
        }
      })
    });

    let doc = [];

    doc1.map((obj) => {
      doc.push(
        {
          title: obj.title,
          id: obj._id,
          isLiked: obj.isLike,
          isBookmarked: obj.isBookmarked,
          likeCnt: obj.likes.length,
          content: obj.summary,
          minRead: obj.minute_read,
          photo: obj.photo,
          user: {
            userName: obj.user.userName,
            name: obj.user.name,
            userId: obj.user._id,
            profilePhoto: obj.user.profilePhoto
          },
          updatedAt: obj.updatedAt,
          ContainImage: obj.ContainImage
        }
      )
    })


    res.json({
      status: "success",
      data: {
        doc
      }
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const likeCtrl = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user);

  if (!currentUser.like.includes(req.params.id)) {
    currentUser.like.push(req.params.id);
    await currentUser.save();
    await Post.findByIdAndUpdate(req.params.id, { $push: { "likes": currentUser.id } }, { safe: true, upsert: true, new: true })

    res.status(200).json({
      message: "successfully liked"
    });
  }
  else{
    currentUser.like = currentUser.like.filter(item => item.toString() !== req.params.id.toString())
    await currentUser.save();
    await Post.findByIdAndUpdate(req.params.id, { $pull: { "likes": currentUser.id } }, { safe: true, upsert: true, new: true })

    res.status(200).json({
      message: "successfully like removed"
    });
  }

});


// const bookmarksCtrl = catchAsync(async(req,res,next) => {
//   const currentUser = await User.findById(req.user);

//   if (!currentUser.bookmarks.includes(req.params.id)) {
//     currentUser.bookmarks.push(req.params.id);
//     await currentUser.save();

//     res.status(200).json({
//       message: "successfully bookmarked"
//     });
//   }
//   else{
//     currentUser.bookmarks = currentUser.bookmarks.filter(item => item.toString() !== req.params.id.toString())
//     await currentUser.save();

//     res.status(200).json({
//       message: "successfully bookmark removed"
//     });
//   }

// });

const userPostsCtrl = async (req, res, next) => {
  const UserName = req.params;

  try {
    const USer = await User.find({ userName: UserName.id });

    if (USer.length > 0) {
      const user_id = USer[0]._id;

      const UsersPost = await Post.find({ user: user_id }).sort({createdAt:-1}).populate("user");
      res.status(200).json({
        status: "success",

        data: UsersPost,
      });
    } else {
      res.json({
        message: "Username doesnt exist",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

//toogle likes

// const toggleLikesPostCtrl = async (req, res, next) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     //check kr rhe hai ki kahin agar user pehle se ye post like kr chuka hoga to...
//     const isLiked = post.likes.includes(req.userAuth);

//     if (isLiked) {
//       post.likes = post.likes.filter(
//         (likes) => likes.toString() != req.userAuth.toString()
//       );
//       await post.save();
//     } else {
//       //agar user like nhi kiya hai ye vala post pehle tb.......
//       post.likes.push(req.userAuth);
//       await post.save();
//     }

//     res.json({
//       status: "success",
//       data: post,
//     });
//   } catch (error) {
//     next(appErr(error.message));
//   }
// };

//toggle dislikes

const toggleDisLikesPostCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    //check kr rhe hai ki kahin agar user pehle se ye post like kr chuka hoga to...
    const isUnLiked = post.disLikes.includes(req.userAuth);

    if (isUnLiked) {
      post.disLikes = post.disLikes.filter(
        (disLikes) => disLikes.toString() != req.userAuth.toString()
      );
      await post.save();
    } else {
      //agar user like nhi kiya hai ye vala post pehle tb.......
      post.disLikes.push(req.userAuth);
      await post.save();
    }

    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.json(error.message);
  }
};

// for viewing single post
const postDetailsCtrl = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const isViewed = post.numViews.includes(req.userAuth);

    if (isViewed) {
      res.json({
        status: "success",
        data: post,
      });
    } else {
      post.numViews.push(req.userAuth);
      await post.save();
    }
  } catch (error) {
    next(appErr(error.message));
  }
};


//Delete/api/v1/posts/:id
const deletePostCtrl = async (req, res, next) => {
  try {

    // When user delete blog then we have to delete blog id from user model.
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("you are not allowed to delte this post ", 403));
    }

    await Post.findByIdAndDelete(req.paramsid);
    res.json({
      status: "success",
      data: "post successfully deleted",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};


//put/api/v1/posts/:id
const updatePostCtrl = async (req, res, next) => {
  const { title, description, category, photo } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    //check kr rhe hain ki yee post iss user se belong krta hai ki nhi
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("you are not allowed to update this post ", 403));
    }

    await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        photo: req && req.file && req.file.path,
      },
      { new: true }
    );
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const BookmarkPostCtrl = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    const user = await User.findById(req.user);

    const bp = user.Bookmarked_Post.includes(req.params.id);
    // cobnst Is_Bookmarked = post.is_Bookmared.includes(req.userAuth);

    // console.log(bp);
    if (bp) {
      user.Bookmarked_Post = user.Bookmarked_Post.filter(
        (Bookmarked_Post) =>
          Bookmarked_Post.toString() != req.params.id.toString()
      );
     
      await user.save();
      return(res.status(201).json({
        status:"success",
        data:"bookmarked removed"
      }));
    } else {
      user.Bookmarked_Post.push(req.params.id);
   
      await user.save();
    }

    res.status(200).json({
      
      status: "success",
      data: "successfully bookmarked",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  createPostCtrl,
  likeCtrl,
  deletePostCtrl,
  updatePostCtrl,
  AuthecticatefetchPostCtrl,
  fetchPostCtrl,
  // bookmarksCtrl,
  toggleDisLikesPostCtrl,
  postDetailsCtrl,
  userPostsCtrl,
  BookmarkPostCtrl,
};
