const notes = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readNotes, readAndWriteNote, deleteNote } = require("../helpers/fsUtils.js");

// Returns all saved notes
notes.get("/", (req, res) =>
    readNotes("./db/db.json").then((notes) => res.json(notes))
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
    readAndWriteNote("./db/db.json", newNote);

    // Send an empty response to end the request
    res.end();
});

// Handles deleting a note
notes.delete("/:id", (req, res) => {
    if (req.params.id) {
        deleteNote("./db/db.json", req.params.id);
    }
    // Send an empty response to end the request
    res.end();
});

module.exports = notes;