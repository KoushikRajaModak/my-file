//npm init -y //npm i express //npm install ejs
const express=require("express");
const app=express();
 const port=8080;
 app.listen(port,()=>{
console.log(`listen ${port}`)
 })
 app.get("/home",(req,res)=>{
    res.send("this is home");
 })


 const path=require("path");

 app.set("views",path.join(__dirname,"/views"))//_dirname through get current directery then add /views 
 app.set("view engine","ejs");//require ejs is not require because it is all ready require by express internaly 
 app.get("/",(req,res)=>{
    res.render("index");//it also work index.ejs  //if we run the program in js dom it search views folder in js dom so it is not work (it solution is 15 line )
 })
 app.get("/rolldice",(req,res)=>{
    let diceval=Math.floor(Math.random()*6)+1;

    //res.render("rolldice",{num:diceval});
    //res.render("rolldice",{diceval:diceval});
    res.render("rolldice",{diceval});//sortcut
 })
 app.get("/in/:username",(req,res)=>{
//res.send(req.params);
let{username}=req.params;
let folowler=["ram","sam","anu"]
res.render("instagrame",{username,folowler})
 })