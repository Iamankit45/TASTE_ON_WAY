const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please tell us your name! ']
      },
  
      userName: {
        type: String,
        required: [true, "userName is required"],
      },
      photo: {
        type: String,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        // select: false
      },
      phone:{
        type: Number,
        required: [true, "Please enter your number"]
      },
      cart:[],
      
      
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
      active: {
        type: Boolean,
        default: true,
        select: false
      },
  
  
      
  
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
    }
  );


const User = mongoose.model("User", userSchema);

module.exports = User;