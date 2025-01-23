const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cotp: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 20, 
    }
  },
  { timestamps: true }
);

userSchema.path("email").index({ unique: true });

module.exports = model("User", userSchema);
