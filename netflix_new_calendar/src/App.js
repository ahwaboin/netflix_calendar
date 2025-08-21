
import './App.css';
import AddContent from './comps/AddContent';
import AppTitle from './comps/AppBar';
import Cal from './comps/Cal';
import ContentCard from './comps/ContentCard';
import { useState, useEffect } from 'react';

function App() {
  const [contents,setContents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch contents from the API
  const fetchContents = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/contents');
      const data = await response.json();
      setContents(data._embedded.contents);
    } catch (error) {
      console.error('Error fetching contents:', error);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleDelete = async (href) => {
    try {
      const response = await fetch(href, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Refresh the contents after deletion
        fetchContents();
        setSelectedEvent(null); // Clear the selected event
      }
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };
  
  return (
    <div className='App'>
      <AppTitle />
      <Cal contents={contents} handleSelectEvent={handleSelectEvent} />
      <AddContent setContents={setContents} />
      {selectedEvent && (<ContentCard selectedEvent={selectedEvent} handleDelete={handleDelete}/>)}
    </div>
  );
}

export default App;
