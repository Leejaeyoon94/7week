const express = require("express");
require("./db/mongoose");

const postRouter = require("./routers/post");

const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(express.json()); //json 가능
app.use(postRouter);

app.get("/hh99/board", (req, res) => {
  res.render("./main");
});

app.get("/hh99/board/post", (req, res) => {
  res.render("./new");
});

app.get("/hh99/board/:id", (req, res) => {
  res.render("./detail");
});

app.listen(port, () => {
  console.log("sever is up on port" + port);
});
