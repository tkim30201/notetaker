const express = require("express");
const fs = require("fs");
const PORT = process.env.PORT || 3000;
const app = express();

app.get("/notes", function(req, res) {
    res.sendFile("public/notes.html", {root: __dirname });
});
app.get("/", function(req, res) {
    res.sendFile("public/index.html", {root: __dirname });
});
app.get("/api/notes/", function(req, res) {
    readDataBase(function(err, data) {
        res.json(data);
    });
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    addToFile(newNote);
    res.end();
});

app.delete("/api/notes/:id", function(req, res) {
    let chosen = req.params.id;
    readDataBase(function(err, data) {
        newData = data.filter(function(obj) {
            return obj.id !== parseInt(chosen);
        });
        writeDataBase(newData);
    });
    res.end();
});

app.listen(PORT, function() {
    console.log("listening on port: " + PORT);
});