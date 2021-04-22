const express = require("express");
const Post = require("../models/post");
const router = new express.Router();

//글쓰기
router.post("/hh99/board/post", async (req, res) => {
  const post = new Post(req.body);
  console.log(post);
  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});
//글 보기
router.get("/hh99/board/list", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});
//글 조회
router.get("/hh99/board/view/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

//글 수정
router.patch("/hh99/board/view/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "author", "comment"];
  const isValidOperation = updates.every((update) => {
    //값이 없을때
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ eroor: "invalid updates!" });
  }
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

//글 삭제
router.delete("/hh99/board/view/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send();
    }
    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
