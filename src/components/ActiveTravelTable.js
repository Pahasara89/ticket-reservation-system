import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ActiveTravelerNavBar from './ActiveTravelerNavBar';
import axios from 'axios'; // Import Axios

function ActiveTravelTabele() {
  const [travelers, setTravelers] = useState([]);

  useEffect(() => {
    // Fetch traveler data from the API using Axios
    axios.get('http://localhost:5212/api/Registration/users') // Replace with your actual API endpoint
      .then((response) => {
        setTravelers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDeleteTraveler = (id) => {
    // Send a DELETE request to your API to delete the traveler by ID
    axios.delete(`http://localhost:5212/api/Registration/users/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // Traveler successfully deleted, remove it from the state
          setTravelers((prevTravelers) => prevTravelers.filter((traveler) => traveler.id !== id));
        } else {
          console.error('Error deleting traveler:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting traveler:', error);
      });
  };

  return (
    <div className="containerssss">
      <ActiveTravelerNavBar />
      <br></br>

      <table className="table table-striped">
        <thead className='table header'>
          <tr>
            <th>Username</th>
            <th>NIC</th>
            <th>Is Activated</th>
            <th>Update Traveler</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {travelers.map((traveler) => (
            <tr key={traveler.id}>
              <td>{traveler.username}</td>
              <td>{traveler.nic}</td>
              <td>{traveler.isactivated ? 'Yes' : 'No'}</td>
              <td className='text-center'>
                <Link to={`/travelers/update/${traveler.id}`}>
                  <button type="button" className="btn btn-secondary mb-2 rounded-pill">
                    Update
                  </button>
                </Link>
              </td>
              <td className='text-center'>
                <button
                  type="button"
                  className="btn btn-danger mb-2 rounded-pill"
                  onClick={() => handleDeleteTraveler(traveler.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-danger mb-2 rounded-pill"
                  onClick={() => handleDeleteTraveler(traveler.id)}
                >
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActiveTravelTabele;
