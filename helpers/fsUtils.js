const fs = require("fs/promises");

const readNotes = (file) => {
    return fs.readFile(file, "utf8").then((data) => {
        const notes = JSON.parse(data);
        return notes;
    });
}

const writeNotes = (file, notes) => {
    fs.writeFile(file, JSON.stringify(notes, null, 4));
}

const readAndWriteNote = (file, newNote) => {
    readNotes(file).then((notes) => {
        notes.push(newNote);
        writeNotes(file, notes);
    });
}

const deleteNote = (file, idToBeDeleted) => {
    readNotes(file).then((notes) => {
        // Remove note with the given id
        const checkId = (note) => idToBeDeleted === note.id ? false : true;
        const filteredData = notes.filter(checkId);
        writeNotes(file, filteredData);
    });
}

module.exports = { readNotes, readAndWriteNote, deleteNote };