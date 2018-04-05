const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe : 'Title of the note.',
  demand : true,
  alias : 't'
};

const bodyOptions = {
  describe : 'Contents of note.',
  demand : true,
  alias : 'b'
};

const argv = yargs
.command('add','Add a new note.',{
  title : titleOptions,
  body : bodyOptions
})
.command('list','Print out all the saved notes.')
.command('read','Print a specific note.',{
  title : titleOptions
})
.command('remove','Remove a specific note.',{
  title : titleOptions
})
.help()
.argv;
var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title,argv.body);
  if (note) {
    console.log('Note added');
    notes.printNote(note);
  } else {
    console.log('Title chosen for note already exists. Please choose a different one.');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing all ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.printNote(note));
} else if (command === 'read') {
  var note = notes.readNote(argv.title);
  if (note) {
    console.log('Requested Note.');
    notes.printNote(note);
  } else {
    console.log('No such note.');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note removed.' : 'No such note.';
  console.log(message);
} else {
  console.log('Command not recognized.');
}
