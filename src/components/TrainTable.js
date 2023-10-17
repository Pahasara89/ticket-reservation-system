import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

import TrainNavBar from './TrainNavBar';

function TrainTable() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Use Axios to fetch train data
    axios.get('http://localhost:5212/api/traindetails/') // Replace with your actual API endpoint
      .then((response) => {
        setTrains(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDeleteSchedule = (id) => {
    // Use Axios to send a DELETE request
    axios.delete(`http://localhost:5212/api/traindetails/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setTrains((prevTrains) => prevTrains.filter((train) => train.id !== id));
        } else {
          console.error('Error deleting train:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error deleting train:', error);
      });
  };

  return (
    <div className="containerssss">
      <TrainNavBar />
      <br />
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
              <td>{train.trainNo}</td>
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
                  onClick={() => handleDeleteSchedule(train.id)}
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
