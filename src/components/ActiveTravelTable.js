import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ActiveTravelerNavBar from './ActiveTravelerNavBar'

function ActiveTravelTabele() {
  // State to store traveler data
  const [travelers, setTravelers] = useState([]);

  useEffect(() => {
    // Fetch traveler data from your API when the component mounts
    fetch('http://localhost:5046/api/traveler/') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setTravelers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to handle traveler deletion
  const handleDeleteSchedule = (id) => {
    // Send a DELETE request to your API to delete the traveler by ID
    fetch(`http://localhost:5046/api/traveler/delete-traveler/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          // Schedule successfully deleted, remove it from the state
          setTravelers((prevTravelers) => prevTravelers.filter((traveler) => traveler.id !== id));
        } else {
          console.error('Error deleting traveler:', response.statusText);
        }
      })
      .catch((error) => console.error('Error deleting traveler:', error));
  };

  return (

    <div className="containerssss">
        <ActiveTravelerNavBar/>
      <br></br>
      
      <table className="table table-striped">
        <thead className='table header'>
          <tr>
            <th>First Name</th> 
            <th>Last Name</th> 
            <th>Date Of Birth</th> 
            <th>NIC</th> 
            <th>Email</th> 
            <th>Traveler Type</th>
            <th>Active</th>
            <th>Update Traveler</th>
            <th>Delete Traveler</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {travelers.map((traveler) => (
            <tr key={traveler.id}>
              <td>{traveler.firstName}</td> 
              <td>{traveler.lastName}</td>
              <td>{traveler.dateOfBirth}</td> 
              <td>{traveler.idNumber}</td>
              <td>{traveler.email}</td> 
              <td>{traveler.trvalertype}</td>
              <td>{traveler.isActive ? 'Yes' : 'No'}</td>
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
                  onClick={() => handleDeleteSchedule(traveler.id)} // Attach the delete function
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-danger mb-2 rounded-pill"
                  onClick={() => handleDeleteSchedule(traveler.id)} // Attach the delete function
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
