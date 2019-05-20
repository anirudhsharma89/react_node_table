const express = require("express");
const tableRoutes = express.Router();

let Table = require("../model/table");

tableRoutes.route("/").get(function(req, res) {
  Table.find(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

// // Defined store route
tableRoutes.route("/add_evt").post(function(req, res) {
  Table.insertMany(req.body, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json("Inserted");
    }
  });
});

tableRoutes.route("/save_evt").post(function(req, res) {
  Table.deleteMany("", function(err, result) {
    if (err) {
      console.log(err);
    }

    Table.insertMany(req.body, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    });
  });
});

tableRoutes.route("/delete").post(function(req, res) {
  query = req.body;

  Table.deleteOne(query, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json("Deleted");
    }
  });
});

module.exports = tableRoutes;
