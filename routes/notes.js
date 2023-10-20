const notes = require("express").Router();
const fs = require("fs/promises");
const { v4: uuidv4 } = require('uuid');

notes.get("/", (req, res) =>
    fs.readFile("./db/db.json", "utf8").then((data) => res.json(JSON.parse(data)))
);

notes.post("/", (req, res) => {
    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuidv4(),
    }

    fs.readFile("./db/db.json", "utf8").then((data) => {
        const notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4));
    });

    res.end();
});

notes.delete("/:id", (req, res) => {
    if (req.params.id) {
        const idToBeDeleted = req.params.id;
        fs.readFile("./db/db.json", "utf8").then((data) => {
            const notes = JSON.parse(data);
            const filteredData = notes.filter(checkId);

            function checkId(note) {
                if (idToBeDeleted === note.id) {
                    return false;
                } else {
                    return true;
                }
            }

            fs.writeFile("./db/db.json", JSON.stringify(filteredData, null, 4));
        });
    }

    res.end();
});

module.exports = notes;