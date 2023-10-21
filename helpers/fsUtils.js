const fs = require("fs/promises");

function readNotes(file) {
    return fs.readFile(file, "utf8").then(function (data) {
        const notes = JSON.parse(data);
        return notes;
    });
}

function writeNotes(file, notes) {
    fs.writeFile(file, JSON.stringify(notes, null, 4));
}


function readAndWriteNote(file, newNote) {
    readNotes(file).then(function (notes) {
        notes.push(newNote);
        writeNotes(file, notes);
    });
}

function deleteNote(file, idToBeDeleted) {
    readNotes(file).then(function (notes) {
        // Remove note with given id
        const checkId = (note) => {
            return idToBeDeleted === note.id ? false : true;
        };

        const filteredData = notes.filter(checkId);

        writeNotes(file, filteredData);
    });
}

module.exports = { readNotes, readAndWriteNote, deleteNote };