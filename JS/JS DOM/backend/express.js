const express = require("express");
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`); //it is use for lisen the  web site request
})

// app.use((req, res) => {
//   // res.send("your request responce");
//   //   res.send({
//   //     name: "koushik",
//   //     age: "25",
//   //   });
//   res.send("<h1>fruit</h1>");
//   console.log("request resive");
// });
app.get("/", (req, res) => {
  res.send("you are contact  home page"); //localhost:3000/  or localhost:3000 is same
});
// app.get("/apple", (req, res) => {
//   res.send("you are contact  apple page"); //localhost:3000/apple
// });
// app.get("*", (req, res) => {
//   res.send("you are not a right page"); //if rounter is not avable
// });
// app.post("/", (req, res) => {
//   res.send("you are send post request to root");
// });
app.get("/:username/:id", (req, res) => {
  console.log(req.params); //http://localhost:3000/kou/15
  let { username, id } = req.params; //"/:username/:id" same let{ username, id }
  res.send(`<h1>wellcome ${username} your number ${id}</h1>`); //if rounter any it go to username
});
app.get("/search", (req, res) => {
  console.log(req.query); //http://localhost:3000/search?id=213
  //http://localhost:3000/search?id=213&call=0155
  let { q } = req.query;
  if (!q) {
    res.send(`<h1>nothing search</h1>`);
  }
  res.send(`<h1>wellcome, ${q} your number</h1>`); //if rounter any it go to username
});
