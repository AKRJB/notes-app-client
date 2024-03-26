import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/cards.jsx';
import AddNote from './components/addNote.jsx';
import Nav from './components/nav.jsx';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/notes/notes");
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [notes]);

  return (
    <div>
      <Nav />
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <div className="mb-4">
            <AddNote />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <Card key={note._id} note={note} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
