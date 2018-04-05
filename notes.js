const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notesData.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notesData.json',JSON.stringify(notes));
};

var addNote = (title,body) => {
 var notes = fetchNotes();
 var note = {
   title,
   body
 };

var duplicateNotes = notes.filter((note) => note.title === title);

if (duplicateNotes.length === 0) {
   notes.push(note);
   saveNotes(notes);
   return note;
}

};

var getAll = () => {
  return fetchNotes();
};

var removeNote = (title) => {
var notes = fetchNotes();
var keepNotes = notes.filter((note) => note.title !== title);
saveNotes(keepNotes);

return notes.length !== keepNotes.length;
};

var readNote = (title) => {
  var notes = fetchNotes();
  var note = notes.filter((note) => note.title === title);
  return note[0];
};

var printNote = (note) => {
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  removeNote,
  readNote,
  printNote
};
