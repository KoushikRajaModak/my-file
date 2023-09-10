//npm init -y //npm i express //npm install ejs
//for nodemon error "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser"
//const { clear } = require("console");
const express = require("express");
const app = express();
const port = 8080;
app.listen(port, () => {
  console.log(`listen ${port}`);
});
app.get("/home", (req, res) => {
  res.send("this is home");
});
//app.use(express.static("public"))//to share css and js file in view page it is require and it`s default name public
const path = require("path");
app.use(express.static(path.join(__dirname, "public")))// for any it is run for line 12


app.set("views", path.join(__dirname, "/views")); //_dirname through get current directery then add /views
app.set("view engine", "ejs"); //require ejs is not require because it is allready require by express internaly
app.get("/", (req, res) => {
  res.render("index"); //it also work index.ejs  //if we run the program in js dom it search views folder in js dom so it is not work (it solution is 15 line )
});
app.get("/rolldice", (req, res) => {
  let diceval = Math.floor(Math.random() * 6) + 1;

  //res.render("rolldice",{num:diceval});
  //res.render("rolldice",{diceval:diceval});
  res.render("rolldice", { diceval }); //sortcut
});
app.get("/in/:username", (req, res) => {
  //res.send(req.params);
  // let{username}=req.params;
  // let folowler=["ram","sam","anu"]
  //res.render("instagrame",{username,folowler})
  const instadata = require("./data.json");
  //console.log(instadata);
  //console.log(path)
  let { username } = req.params;
  res.render("instagrame", { data: instadata[username]})
  //res.render("instagrame", { data: instadata[username]["name"] });
});
