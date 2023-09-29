//npm init -y npm i @faker-js/faker node index.js npm i mysql2
//cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
//.\mysql.exe -u root -p
// npm i express  npm i uuid npm i nodemon  npm i ejs

const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// let createRandomUser = () => {
//   return {
//     userId: faker.datatype.uuid(),
//     username: faker.internet.userName(),
//     email: faker.internet.email(),
//     avatar: faker.image.avatar(),
//     password: faker.internet.password(),
//     birthdate: faker.date.birthdate(),
//     registeredAt: faker.date.past(),
//   };
// };

// console.log(createRandomUser());

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "college",
  password: "Valtech@1234",
});

// let GetRandomUser = () => {
//   return [
//     faker.datatype.uuid(),
//     faker.internet.userName(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// };

// try {
// let q = "Insert into user (id,username,email,password) values (?,?,?,?);";
// let user = ["123", "123_abc", "abc@gmail.com", "abc123"];
// let q = "Insert into user (id,username,email,password) values ?;";
// let user = [
//   ["1", "1_abc", "1abc@gmail.com", "1abc123"],
//   ["2", "2_abc", "2abc@gmail.com", "2abc123"],
// ];
//   let q = "Insert into user (id,username,email,password) values ?;";
//   let data = [];
//   for (let i = 1; i <= 100; i++) {
//     data.push(GetRandomUser());
//   }
//   //connection.query(q, user, (err, results) => {
//   // connection.query(q, [user], (err, results) => {
//   connection.query(q, [data], (err, results) => {
//     if (err) throw err;
//     console.log(results);
//   });
// } catch (err) {
//   console.log(err);
// }
// connection.end();

//console.log(GetRandomUser());

app.get("/", (req, res) => {
  try {
    let q = ` select count(*) from user;`;
    connection.query(q, (err, results) => {
      if (err) throw err;
      const count = results[0]["count(*)"];
      res.render("home.ejs", { count }); //connection.end() is not require because when it send response the connection automatic end
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.get("/user", (req, res) => {
  try {
    let q = ` select * from user;`;
    connection.query(q, (err, results) => {
      if (err) throw err;
      res.render("showuser.ejs", { results });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = ` select * from user where id='${id}';`;
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      let users = results[0];
      res.render("edit.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
app.post("/user/:email", (req, res) => {
  let { email } = req.params;
  let { username, password } = req.body;
  let q = ` select * from user where email='${email}';`;
  // console.log(req.body);
  try {
    connection.query(q, (err, results) => {
      if (err) throw err;
      let users = results[0];
      if (password != users.password) {
        res.send("Wrong password");
      } else {
        let q2 = ` Update user  SET username='${username}' where email='${email}';`;
        connection.query(q2, (err, results) => {
          if (err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
  //res.redirect("/");
});
app.listen("8080", () => {
  console.log("app is listen 8080");
});
