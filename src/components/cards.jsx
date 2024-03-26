import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Card({ note }) {
  const [isNoteEditable, setIsNoteEditable] = useState(false);
  const [noteMsg, setNoteMsg] = useState(note.message);
  const [error, setError] = useState(null);

  const editNote = (noteId) => {
    axios.patch(`http://localhost:3000/api/v1/notes/${noteId}`, { message: noteMsg })
      .then(response => {
        console.log('Note updated successfully:', response.data);
        setIsNoteEditable(false);
        setError(null);
      })
      .catch(error => {
        console.error('Error updating note:', error);
        setError(error);
      });
  }

  const deleteNote =  (noteId) => {
    axios.delete(`http://localhost:3000/api/v1/notes/${noteId}`)
      .then(() => {
        console.log('Note deleted successfully');
        setError(null);
      })
      .catch(error => {
        console.error('Error deleting note:', error);
        setError(error);
      });
  }

  return (
    <div className={`relative bg-neutral-300 flex border border-black/10 rounded-lg px-3 py-8 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black`}>
      <div className="absolute bottom-2 left-2 text-xs text-gray-500">{new Date(note.createdAt).toLocaleString()}</div>
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${isNoteEditable ? "border-black/10 px-2" : "border-transparent"}`}
        value={noteMsg}
        onChange={(e) => setNoteMsg(e.target.value)}
        readOnly={!isNoteEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={isNoteEditable ? () => editNote(note._id) : () => setIsNoteEditable(true)}
      >
        {isNoteEditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteNote(note._id)}
      >
        ❌
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Card;
