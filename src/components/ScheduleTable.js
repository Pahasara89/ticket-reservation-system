import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import ScheduleNavBar from './ScheduleNavBar';
import axios from 'axios';

function ScheduleTable() {
  const [schedules, setSchedules] = useState([]);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  useEffect(() => {
    // Fetch schedule data from the API using Axios
    axios.get('http://localhost:5212/api/train-schedules/')
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDeleteSchedule = (id, reservationStatus) => {
    if (reservationStatus === 'Active') {
      setShowCancelPopup(true);
    } else {
      // Send a DELETE request to the API to delete the schedule by ID
      axios.delete(`http://localhost:5046/api/train-schedules/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== id));
          } else {
            console.error('Error deleting schedule:', response.statusText);
          }
        })
        .catch((error) => {
          console.error('Error deleting schedule:', error);
        });
    }
  };

  return (
    <div className="container">
      <ScheduleNavBar />
      <br></br>
      <table className="table table-striped">
        <thead className="table header">
          <tr>
            <th>ID</th>
            <th>Train Name</th>
            <th>Departure Time</th>
            <th>From</th>
            <th>Destination</th>
            <th>Schedule Actions</th>
          </tr>
        </thead>
        <tbody className="small">
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.id}</td>
              <td>{schedule.trainname}</td>
              <td>{schedule.departuretime}</td>
              <td>{schedule.from}</td>
              <td>{schedule.destination}</td>
              <td className="text-center">
                <Link to={`/schedules/update/${schedule.id}`}>
                  <button type="button" className="btn btn-success btn-md mb-2 rounded-pill small">
                    Update
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-danger btn-md mb-2 rounded-pill"
                  onClick={() => handleDeleteSchedule(schedule.id, schedule.reservationStatus)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showCancelPopup && (
        <SweetAlert
          warning
          confirmBtnText="Ok"
          confirmBtnBsStyle="danger"
          title="Cannot Cancel Train"
          onConfirm={() => {
            setShowCancelPopup(false);
          }}
          onCancel={() => setShowCancelPopup(false)}
          focusCancelBtn
        >
          There are existing reservations for this train. Cancellation is not allowed.
        </SweetAlert>
      )}
    </div>
  );
}

export default ScheduleTable;
