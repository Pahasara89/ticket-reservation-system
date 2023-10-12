import React, { useEffect, useState } from 'react';
// import '../../CSS/traintable.css'
import { Link } from 'react-router-dom';
import ViewTrain from './ViewTrain.css';

function TrainTable() {
  // State to store train data
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch train data from your API when the component mounts
    fetch('http://localhost:5046/api/train/') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setTrains(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Function to handle train deletion
  const handleDeleteSchedule = (id) => {
    // Send a DELETE request to your API to delete the train by ID
    fetch(`http://localhost:5046/api/train/delete-train/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          // Schedule successfully deleted, remove it from the state
          setTrains((prevTrains) => prevTrains.filter((train) => train.id !== id));
        } else {
          console.error('Error deleting train:', response.statusText);
        }
      })
      .catch((error) => console.error('Error deleting train:', error));
  };

  return (
    <div className="containersss">
      <br></br>
      {/* <h1 className="my-4 text-center text-primary">Train Details</h1> */}
      <table className="table table-striped">
        <thead className='table header'>
          <tr>
            <th>Train No</th> 
            <th>Train Name</th> 
            <th>First Class Capacity</th> 
            <th>Second Class Capacity</th> 
            <th>Third Class Capacity</th> 
            <th>Type</th>
            <th>Published</th>
            <th>Active</th>
            <th>Update Train</th>
            <th>Delete Train</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.id}>
              <td>{train.trainNo}</td> {/* Display Train No */}
              <td>{train.trainName}</td>
              <td>{train.firstClassCapacity}</td> 
              <td>{train.secondClassCapacity}</td>
              <td>{train.thirdClassCapacity}</td> 
              <td>{train.type}</td>
              <td>{train.isPublished ? 'Yes' : 'No'}</td>
              <td>{train.isActive ? 'Yes' : 'No'}</td>
              <td className='text-center'>
                <Link to={`/trains/update/${train.id}`}>
                  <button type="button" className="btn btn-secondary mb-2 rounded-pill">
                    Update
                  </button>
                </Link>
              </td>
              <td className='text-center'>
              <button
                  type="button"
                  className="btn btn-danger mb-2 rounded-pill"
                  onClick={() => handleDeleteSchedule(train.id)} // Attach the delete function
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TrainTable;
