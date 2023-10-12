import React, { useEffect, useState } from 'react';
// import '../../CSS/traintable.css';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import ScheduleNavBar from './ScheduleNavBar'

function ScheduleTable() {
  // State variables for schedules, train names, route names, and the cancellation popup
  const [schedules, setSchedules] = useState([]);
  const [trainNames, setTrainNames] = useState({});
  const [routeNames, setRouteNames] = useState({});
  const [stoppingStations, setStoppingStations] = useState({});
  const [showCancelPopup, setShowCancelPopup] = useState(false); // State for SweetAlert popup

  useEffect(() => {
    // Fetch schedule data from the API
    fetch('http://localhost:5046/api/TrainSchedule/')
      .then((response) => response.json())
      .then((data) => setSchedules(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Fetch available Train IDs from the API
    fetch('http://localhost:5046/api/train')
      .then((response) => response.json())
      .then((data) => {
        const trainNameMapping = {};
        data.forEach((train) => {
          trainNameMapping[train.trainNo] = train.trainName;
        });
        setTrainNames(trainNameMapping);
      })
      .catch((error) => console.error('Error fetching Train IDs:', error));
  }, []);

  useEffect(() => {
    // Fetch available Route data from the API
    fetch('http://localhost:5046/api/route')
      .then((response) => response.json())
      .then((data) => {
        const routeNamesMapping = {};
        data.forEach((route) => {
          routeNamesMapping[route.routeNo] = {
            departure: route.departure,
            arrival: route.arrival,
          };
        });
        setRouteNames(routeNamesMapping);
      })
      .catch((error) => console.error('Error fetching Route data:', error));
  }, []);

  useEffect(() => {
    // Fetch stopping station data for each schedule
    schedules.forEach((schedule) => {
      fetch(`http://localhost:5046/api/TrainSchedule/${schedule.id}/stopping-stations`)
        .then((response) => response.json())
        .then((data) => setStoppingStations((prevData) => ({ ...prevData, [schedule.id]: data })))
        .catch((error) => console.error('Error fetching stopping stations:', error));
    });
  }, [schedules]);

  const handleDeleteSchedule = (id, reservationStatus) => {
    if (reservationStatus === 'Active') {
      // Show a confirmation dialog if reservationStatus is Active
      setShowCancelPopup(true);
    } else {
      // Send a DELETE request to the API to delete the schedule by ID
      fetch(`http://localhost:5046/api/TrainSchedule/delete-schedule/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.status === 200) {
            // Schedule successfully deleted, remove it from the state
            setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== id));
          } else {
            console.error('Error deleting schedule:', response.statusText);
          }
        })
        .catch((error) => console.error('Error deleting schedule:', error));
    }
  };

  return (
    <div className="container">
      <ScheduleNavBar/>
      <br></br>
      <table className="table table-striped">
        <thead className="table header">
          <tr>
            <th>Sche No</th>
            <th>Arrival Date-Time</th>
            <th>Departure Date-Time</th>
            <th>Train Name</th>
            <th>Route Details</th>
            <th>Train Stopping Stations Departure & Arrival Times</th>
            <th>Train Class Prices</th>
            <th>Resev Status</th>
            <th>Schedule Actions</th>
          </tr>
        </thead>
        <tbody className="small">
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>{schedule.scheduleNo}</td>
              <td className="col-md-7">
                {schedule.arrivalDate.substring(0, 10)} - {schedule.arrivalTime}
              </td>
              <td className="col-md-3">
                {schedule.departureDate.substring(0, 10)} - {schedule.departureTime}
              </td>
              <td className="col-md-3">{trainNames[schedule.trainNo]}</td>
              <td className="col-md-3">
                {routeNames[schedule.routeNo]?.departure} - {routeNames[schedule.routeNo]?.arrival}
              </td>
              <td>
                <table style={{ width: '200px' }}>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#7490df' }}>Station</th>
                      <th style={{ backgroundColor: '#7490df' }}>D:Time</th>
                      <th style={{ backgroundColor: '#7490df' }}>A:Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stoppingStations[schedule.id]?.map((station) => (
                      <tr key={station.id}>
                        <td>{station.stationName}</td>
                        <td>{station.arrivalTime.substring(0, 5)}</td>
                        <td>{station.departureTime.substring(0, 5)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <th style={{ backgroundColor: '#7490df' }}>Class</th>
                      <th style={{ backgroundColor: '#7490df' }}>Price</th>
                    </tr>
                    <tr>
                      <td>FC</td>
                      <td>{schedule.firstClassPrice}</td>
                    </tr>
                    <tr>
                      <td>SC</td>
                      <td>{schedule.secondClassPrice}</td>
                    </tr>
                    <tr>
                      <td>TC</td>
                      <td>{schedule.thirdClassPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                {schedule.reservationStatus === 'Active' ? (
                  <div className="container">
                    <span className="active-indicator"></span>
                  </div>
                ) : (
                  <div className="container">
                    <span className="inactive-indicator"></span>
                  </div>
                )}
                {schedule.reservationStatus === 'Active' ? 'Active' : 'Inactive'}
              </td>
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
            // Handle any other logic here
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
