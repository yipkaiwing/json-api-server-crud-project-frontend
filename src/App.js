import { useState, useEffect } from 'react';

// App starts, run useEffect to fetch data by using getNotes function
// after that, use .map to loop through the notes array and display the data

function App() {

  const [notes, setNotes] = useState([]);

  const api = 'http://localhost:3001/notes';

  useEffect(() => {
    getNotes();
  }, []);

  // either use .then or async/await method to fetch data
  const getNotes = async () => {
    const response = await fetch(api);
    const json = await response.json();

    setNotes(json);

  }

// https://chat.openai.com/share/c967f76b-88b6-408d-b788-6f4e7d3b53e2
// change the datetime to a more readable format

  function formatDateTime(dateTimeString) {
    const dateObj = new Date(dateTimeString);
    
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(dateObj.getDate()).padStart(2, '0');
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    if (hours === 0) {
        hours = 12;
    } else if (hours > 12) {
        hours -= 12;
    }

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

// const inputString = "2021-09-01T10:30:00Z";
// const formattedDate = formatDateTime(inputString);
// console.log(formattedDate);  // "2021-09-01 10:30 AM"


  return (
    <div>
      <h1 className='mt-5 font-bold text-3xl ml-5' >Notes</h1>
        <ul className='ml-5 mt-5 mr-5 p-2'>
          {notes.map((note) => (  // no need to use return or we can use {} + return inside
            <li className=' bg-slate-100' key={note.id}>
              <h2><span className=' text-red-500'>ID: </span>{note.id}</h2>
              <h2><span className=' text-green-500' >Title: </span>{note.title}</h2>
              <p><span className=' text-purple-500'>Content: </span>{note.content}</p>
              <p><span className='text-yellow-500' >Date Time: </span>{formatDateTime(note.datetime)}</p>
              <br />
            </li>
          ))}
        </ul>
    </div>
  )
}

export default App;