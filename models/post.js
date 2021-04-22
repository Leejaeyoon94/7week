const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

mongoose.set("useCreateIndex", true);
const validator = require("validator");
const bcrypt = require("bcryptjs");

// const Post = mongoose.model("Post", {
const Post = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("이미 존재하는 이메일 입니다.");
      }
    },
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('비밀번호에 "password"라는 단어가 포함되면 안됩니다.');
      }
    },
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  no: {
    type: Number,

    default: 0,
  },
  comment: {
    type: String,
    required: true,
  },
});
Post.plugin(
  autoIncrement.plugin,

  {
    model: "Post",

    field: "no",

    startAt: 1,
    increment: 1,
  }
);

//비밀번호 암호화
Post.pre("save", async function (next) {
  const post = this;
  if (post.isModified("password")) {
    //비밀번호 수정시 암호화 다시함
    post.password = await bcrypt.hash(post.password, 8); //무난한 8자리
  }
  next();
});

module.exports = mongoose.model("Post", Post);
// module.exports = Post;
