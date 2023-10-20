const express = require("express");
const notesRouter = require("./notes");

const app = express ();

//Foward to notes api
app.use("/notes", notesRouter);

module.exports = app;