const notes = require("express").Router();
const fs = require("fs/promises");
const { v4: uuidv4 } = require('uuid');

// Returns all saved notes
notes.get("/", (req, res) =>
    fs.readFile("./db/db.json", "utf8").then((data) => res.json(JSON.parse(data)))
);

// Receives user input and save as new note
notes.post("/", (req, res) => {
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        // Generates unique id using uuid package
        id: uuidv4(),
    }
    // Updates db.json file
    fs.readFile("./db/db.json", "utf8").then((data) => {
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4));
    });
    // Send an empty response to end the request
    res.end();
});

// Handles deleting a note
notes.delete("/:id", (req, res) => {
    if (req.params.id) {
        const idToBeDeleted = req.params.id;
        fs.readFile("./db/db.json", "utf8").then((data) => {
            const notes = JSON.parse(data);
            // Remove note with given id
            const filteredData = notes.filter(checkId);

            const checkId = (note) => {
                return idToBeDeleted === note.id ? false : true;
            };

            fs.writeFile("./db/db.json", JSON.stringify(filteredData, null, 4));
        });
    }
    // Send an empty response to end the request
    res.end();
});

module.exports = notes;