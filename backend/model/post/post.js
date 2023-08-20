const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, "Post Title is required"],
    trim: true,
  },
  subtitle: {
    type: String,
    required: [true, "Subtitle Title is required"],
  },
  summary: {
    type: String,
  },
  minute_read: {
    type: String,
    required: [true, "Reading Time Title is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  report_number: { type: String },


  is_Bookmared: [
    {
      type: Boolean,
      default: false,
      // ref: "User",
    },
  ],

  category: {
    type: String,
    required: [true, "Catagory is required"],
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please Author is required"],
  },
  photo: {
    type: String,
  },
  ContainImage: {
    type: Boolean,
    default: false,
    required: [true, "Please specify that your post contains an image or not"]
  },
  url_title: {
    type: String,
    unique: true,
  },
},

  {
    timestamps: true,
    toJSON: { virtuals: true }
  })

//hook
postSchema.pre(/^find/, function (next) {



  // postSchema.virtual("likescount").get(function () {

  //   const post = this;
  //   return post.likes.length;
  // })



  postSchema.virtual("daysAgo").get(function () {
    const post = this;
    const date = new Date(post.createdAt);
    const daysAgo = Math.floor((Date.now() - date) / 86400000);
    return daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo} days Ago`;

  })
  next();
})


const Post = mongoose.model("Post", postSchema);

module.exports = Post;