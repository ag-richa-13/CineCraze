const express = require("express");
const mysql = require("mysql");
const path = require("path");
const app = express();

// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Root@1234",
  database: "watchlist_app",
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "Image")));

// Set view engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  connection.query("SELECT * FROM watchlist", (err, rows) => {
    if (err) throw err;
    res.render("index", { watchlist: rows });
  });
});

app.post("/add", (req, res) => {
  const newItem = req.body.newItem;
  connection.query(
    "INSERT INTO watchlist (item) VALUES (?)",
    [newItem],
    (err, result) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

app.post("/delete", (req, res) => {
  const id = req.body.id;
  connection.query(
    "DELETE FROM watchlist WHERE id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
