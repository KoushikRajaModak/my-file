const express = require("express");
const app = express();
const port = 8080;
app.listen(port, () => {
  console.log(`listen ${port}`);
});

app.use(express.urlencoded({extended:true}));// if it is not user post data req.body is not readable it convert to readable , it not read json data so use express.json()
app.use(express.json());
app.get("/ragister",(req,res)=>{
    let {user , password}=req.query;
    res.send(`it is get && wellcome ${user}`)
})
app.post("/ragister",(req,res)=>{
    console.log(req.body);
    let {user , password}=req.body;
    res.send(`it is post && wellcome ${user}`)
})