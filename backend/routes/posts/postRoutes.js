const express = require("express");

const postRouter = express.Router();

const storage = require("../../config/cloudinary");
const multer = require("multer");

const {
  createPostCtrl,
  deletePostCtrl,
  updatePostCtrl,
  fetchPostCtrl,
  // bookmarksCtrl,
  toggleDisLikesPostCtrl,
  postDetailsCtrl,
  userPostsCtrl,
  AuthecticatefetchPostCtrl,likeCtrl,
  BookmarkPostCtrl
} = require("../../controller/post/postCtrl");

const {protect} = require('./../../controller/authController');



// const isLogin = require("../../middlewares/isLogin");
postRouter.get("/",fetchPostCtrl);
postRouter.get("/user/:id",userPostsCtrl);   // soln => change get to post method

postRouter.use(protect);
postRouter.get("/authenticateUser",AuthecticatefetchPostCtrl);
const upload = multer({ storage });
postRouter.post("/",upload.single("image"), createPostCtrl);
postRouter.post("/likePost/:id",likeCtrl);
// postRouter.post("/bookmarkPost/:id",bookmarksCtrl);


// postRouter.get("/likes/:id",toggleLikesPostCtrl);

// postRouter.get("/disLikes/:id",toggleDisLikesPostCtrl);

// //Delete/api/v1/posts/:id
// postRouter.delete("/:id",deletePostCtrl);
// //put/api/v1/posts/:id

// postRouter.put("/:id", upload.single("image"), updatePostCtrl);

// postRouter.get("/:id", postDetailsCtrl);

postRouter.get("/bookmark/:id",BookmarkPostCtrl);

module.exports = postRouter;
