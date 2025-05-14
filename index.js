// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// To-do lists
let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food"];
let workItems = ["Show Up"];
let funItems = ["Watch TV", "Read a Book"];
let weekendItems = ["Relax", "Watch TV"];
let finalExamItems = ["ICS 395", "MGT 430", "MKT 410", "BUSN 430"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Default route
app.get("/", function (req, res) {
  res.render("list", { listTitle: "Main To Do List", newListItems: items });
});

// Form handler
app.post("/", function (req, res) {
  let item = req.body.newItem;

  switch (req.body.list) {
    case "Work To Do List":
      workItems.push(item);
      res.redirect("/work");
      break;
    case "Fun To Do List":
      funItems.push(item);
      res.redirect("/fun");
      break;
    case "Weekend To Do List":
      weekendItems.push(item);
      res.redirect("/weekend");
      break;
    case "Final Exam Prep":
      finalExamItems.push(item);
      res.redirect("/finals");
      break;
    default:
      items.push(item);
      res.redirect("/");
  }
});

// List routes
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work To Do List", newListItems: workItems });
});

app.get("/fun", function (req, res) {
  res.render("list", { listTitle: "Fun To Do List", newListItems: funItems });
});

app.get("/weekend", function (req, res) {
  res.render("list", {
    listTitle: "Weekend To Do List",
    newListItems: weekendItems,
  });
});

app.get("/finals", function (req, res) {
  res.render("list", {
    listTitle: "Final Exam Prep",
    newListItems: finalExamItems,
  });
});

// Server
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
