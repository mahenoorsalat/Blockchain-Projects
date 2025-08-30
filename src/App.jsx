import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import { dkeeper_backend } from "../../declarations/dkeeper_backend";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper_backend.createNote(newNote.title , newNote.content)
      return [newNote , ...prevNotes];
    });
  }

  useEffect(()=>{
    console.log("useEffect is triggered")
    fetchData();
  },[])

 async function fetchData(){
  const notesArray = await dkeeper_backend.readNotes();
  setNotes(notesArray)
 }


  function deleteNote(id) {
    dkeeper_backend.removeNote(id)
    setNotes(prevNotes => {
      
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
