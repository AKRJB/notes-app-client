import React, { useState } from 'react'
import axios from 'axios';

function AddNote() {
    const [note, setNote] = useState("")

    const add = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3000/api/v1/notes/addnotes', {message: note})
      .then(response => {
        console.log('Note added successfully:', response.data);
        setNote("");
      })
      .catch(error => {
        console.error('Error adding note:', error);
    });
    }

  return (
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write note..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={note}
              onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
      </form>
  );
}

export default AddNote;