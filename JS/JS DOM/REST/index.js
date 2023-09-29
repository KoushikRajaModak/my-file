// mkdir public  touch index.js npm i express  npm init -y npm install ejs npm i uuid npm install method-override
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

var methodOverride = require("method-override");
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

const port = 8080;
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(port, () => {
  console.log(`listen ${port}`);
});
let post = [
  {
    id: uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    username: "koushik",
    content: "I Love Coding!",
  },
  {
    id: uuidv4(),
    username: "Modak",
    content: "Hard & Smart Work is need for Success!",
  },
  { id: uuidv4(), username: "Anu", content: "I Get A MY Fast Job!" },
];
app.get("/posts", (req, res) => {
  res.render("index.ejs", { post });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let posts = post.find((p) => id == p.id); //p==post

  res.render("show", { posts });
});
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  console.log(req.body);
  post.push({ id, username, content });
  res.redirect("/posts");
});
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newcontent = req.body.content;
  let posts = post.find((p) => id == p.id);
  posts.content = newcontent;
  res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;

  let posts = post.find((p) => id == p.id);
  res.render("edit.ejs", { posts });
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;

  post = post.filter((p) => id !== p.id);
  res.redirect("/posts");
});
