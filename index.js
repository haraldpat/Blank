const path = require("path");
const express = require("express");
const app = express();
const { v4: uuid } = require("uuid"); //For generating ID's
const ejs = require("ejs");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blank",
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  let { name, email, contact, password1, password2 } = req.body;
  if (password1 === password2 && name && email && contact) {
    const contactnum = parseInt(contact);
    id = uuid();
    password2 = await bcrypt.hash(password2, 16);
    role = "user";
    // const queryString =
    //     `INSERT INTO info (id,name,email,contact,password,role) VALUES (('${id}','${name}','${email}','${contactnum}','${password2}','${role}')`;
    const queryString =
      "INSERT INTO info (id,name,email,contact,password,role) VALUES ('" +
      id +
      "','" +
      name +
      "','" +
      email +
      "','" +
      contactnum +
      "','" +
      password2 +
      "','" +
      role +
      "')";

    con.query(queryString, (err) => {
      if (err) console.log(err);
      else console.log("Value Inserted!");
    });
    res.redirect("login");
  } else res.redirect("register");
});

app.get("/registerblank", (req, res) => {
  res.render("registerblank");
});

app.post("/registerblank", async (req, res) => {
  let { name, email, contact, password1, password2, role } = req.body;
  if (password1 === password2 && name && email && contact && role) {
    id = uuid();
    password2 = await bcrypt.hash(password2, 16);
    // const queryString =
    //     `INSERT INTO info (id,name,email,contact,password,role) VALUES (('${id}','${name}','${email}','${contactnum}','${password2}','${role}')`;

    const queryString =
      "INSERT INTO info (id,name,email,contact,password,role) VALUES ('" +
      id +
      "','" +
      name +
      "','" +
      email +
      "','" +
      parseInt(contact) +
      "','" +
      password2 +
      "','" +
      role +
      "')";

    con.query(queryString, (err) => {
      if (err) console.log(err);
      else console.log("Value Inserted!");
    });
    res.redirect("login");
  } else res.redirect("registerblank");
});


// app.get("/home/:id", (req, res) => {
//   const { id } = req.params;
//   const queryString = "SELECT * FROM info WHERE id =?";
//   con.query(queryString, [id], (err, result) => {
//     if (err) console.log(err);
//     console.log(result[0].name);
//     res.render("home/user");
//   });
// });

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // let store = "";
  const queryString = "SELECT * FROM info WHERE email= ?"; //+ mysql.escape(email);
  con.query(queryString, [email], (err, result) => {
    if (err) console.log(err);
    if (result.length === 0) {
      const reg = document.getElementsById("reg");
      console.log(reg);
    }
    if (result[0].password === password) {
      res.redirect("/home");
    } else res.redirect("login");
  });
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/home/deladdress",(req,res)=>{
  res.render("deladdress");
})

app.get("/home/:product/payment",(req,res)=>{
  res.render("payment");
})

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
