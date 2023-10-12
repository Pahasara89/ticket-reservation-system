import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';
import SweetAlert from 'react-bootstrap-sweetalert';

function UpdateScheduleForm() {
  // Extracting the 'id' parameter from the route
  const { id } = useParams();

  // State for schedule data
  const [scheduleData, setScheduleData] = useState({
    scheduleNo: '',
    trainNo: '',
    routeNo: '',
    arrivalDate: '',
    arrivalTime: '',
    departureDate: '',
    departureTime: '',
    firstClassPrice: 0,
    secondClassPrice: 0,
    thirdClassPrice: 0,
    stoppingStations: [],
  });

  // State to manage success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for SweetAlert

  // Fetch schedule data when 'id' parameter changes
  useEffect(() => {
    fetch(`http://localhost:5046/api/TrainSchedule/schedule/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setScheduleData(data);
      })
      .catch((error) => console.error('Error fetching schedule data:', error));
  }, [id]);

  // State for storing available train IDs
  const [trainIds, setTrainIds] = useState([]);

  // Fetch available train IDs from the server
  useEffect(() => {
    fetch('http://localhost:5046/api/train')
      .then((response) => response.json())
      .then((data) => setTrainIds(data))
      .catch((error) => console.error('Error fetching Train IDs:', error));
  }, []);

  // State for storing available route IDs
  const [routeIds, setRouteIds] = useState([]);

  // Fetch available route IDs from the server
  useEffect(() => {
    fetch('http://localhost:5046/api/route')
      .then((response) => response.json())
      .then((data) => setRouteIds(data))
      .catch((error) => console.error('Error fetching Route IDs:', error));
  }, []);

  // Handle changes in form input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setScheduleData((prevState) => ({
      ...prevState,
      [name]: name === 'firstClassPrice' || name === 'secondClassPrice' || name === 'thirdClassPrice' ? parseFloat(value) : value,
    }));
  };

  // Handle changes in stopping station fields
  const handleStoppingStationChange = (index, field, value) => {
    const updatedStoppingStations = [...scheduleData.stoppingStations];
    updatedStoppingStations[index][field] = value;

    setScheduleData((prevState) => ({
      ...prevState,
      stoppingStations: updatedStoppingStations,
    }));
  };

   // Add a new stopping station to the schedule data
  const addStoppingStation = () => {
    const newStoppingStation = {
      id:'',
      stationName: '',
      arrivalTime: '',
      departureTime: '',
    };

    setScheduleData((prevState) => ({
      ...prevState,
      stoppingStations: [...prevState.stoppingStations, newStoppingStation],
    }));
  };

  // Remove a stopping station from the schedule data
  const removeStoppingStation = (index) => {
    const updatedStoppingStations = [...scheduleData.stoppingStations];
    updatedStoppingStations.splice(index, 1);

    setScheduleData((prevState) => ({
      ...prevState,
      stoppingStations: updatedStoppingStations,
    }));
  };

   // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5046/api/TrainSchedule/update-schedule/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Schedule updated:', data);
        setShowSuccessAlert(true);
      })
      .catch((error) => console.error('Error adding new train schedule:', error));

      // Next, check if there are new stopping stations to add
      const newStoppingStations = scheduleData.stoppingStations.filter((station) => !station.StationId);
      if (newStoppingStations.length > 0) {
        // Add the new stopping stations
        fetch(`http://localhost:5046/api/TrainSchedule/new-schedule/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStoppingStations),
        })
          .then((response) => response.json())
          .then((addedStoppingStations) => {
            console.log('New stopping stations added:', addedStoppingStations);
            // Optionally, you can update the state or perform any additional actions here.
          })
          .catch((error) => console.error('Error adding new stopping stations:', error));
      }
  };

  // Render the form
  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', color: 'blue' }}>Update Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="scheduleNo">Schedule No</label>
          <input
            type="text"
            className="form-control"
            id="scheduleNo"
            name="scheduleNo"
            value={scheduleData.scheduleNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="arrivalDate">Arrival Date</label>
          <input
            type="date"
            className="form-control"
            id="arrivalDate"
            name="arrivalDate"
            value={DateTime.fromISO(scheduleData.arrivalDate).setZone('Asia/Colombo').toISODate()}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="arrivalTime">Arrival Time</label>
          <input
            type="time"
            className="form-control"
            id="arrivalTime"
            name="arrivalTime"
            value={scheduleData.arrivalTime}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            type="date"
            className="form-control"
            id="departureDate"
            name="departureDate"
            value={scheduleData.departureDate.substring(0, 10)}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="departureTime">Departure Time</label>
          <input
            type="time"
            className="form-control"
            id="departureTime"
            name="departureTime"
            value={scheduleData.departureTime}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="firstClassPrice">First Class Price</label>
          <input
            type="number"
            className="form-control"
            id="firstClassPrice"
            name="firstClassPrice"
            value={scheduleData.firstClassPrice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="secondClassPrice">Second Class Price</label>
          <input
            type="number"
            className="form-control"
            id="secondClassPrice"
            name="secondClassPrice"
            value={scheduleData.secondClassPrice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="thirdClassPrice">Third Class Price</label>
          <input
            type="number"
            className="form-control"
            id="thirdClassPrice"
            name="thirdClassPrice"
            value={scheduleData.thirdClassPrice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="trainNo">Train</label>
          <select
            id="trainNo"
            name="trainNo"
            value={scheduleData.trainNo}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="" disabled>
              Select Train 
            </option>
            {trainIds.map((train) => (
              <option key={train.trainNo} value={train.trainNo}>
                {train.trainNo} - {train.trainName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="routeNo">Route</label>
          <select
            id="routeNo"
            name="routeNo"
            value={scheduleData.routeNo}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="" disabled>
              Select Route
            </option>
            {routeIds.map((route) => (
              <option key={route.routeNo} value={route.routeNo}>
                {route.departure} - {route.arrival}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
      <label htmlFor="reservationStatus">Reservation Status</label>
      <select
        id="reservationStatus"
        name="reservationStatus"
        value={scheduleData.reservationStatus}
        onChange={handleChange}
        className="form-control"
        required
      >
        <option value="" disabled>
          Select Reservation Status
        </option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
      {/* Stopping Stations Section */}
        <div className="form-group mb-3">
          <h3 style={{ textAlign: 'center', color: 'blue' }}>Stopping Stations</h3>
          {scheduleData.stoppingStations.map((stoppingStation, index) => (
            <div key={index}>
              <div className="form-group">
                <label htmlFor={`Id_${index}`}>Station Id</label>
                <input
                  type="number"
                  className="form-control"
                  id={`Id_${index}`}
                  name={`Id_${index}`}
                  value={stoppingStation.id}
                  onChange={(e) =>
                    handleStoppingStationChange(index, 'id', e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`stationName_${index}`}>Station Name</label>
                <input
                  type="text"
                  className="form-control"
                  id={`stationName_${index}`}
                  name={`stationName_${index}`}
                  value={stoppingStation.stationName}
                  onChange={(e) =>
                    handleStoppingStationChange(index, 'stationName', e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`arrivalTime_${index}`}>Arrival Time</label>
                <input
                  type="time"
                  className="form-control"
                  id={`arrivalTime_${index}`}
                  name={`arrivalTime_${index}`}
                  value={stoppingStation.arrivalTime}
                  onChange={(e) =>
                    handleStoppingStationChange(index, 'arrivalTime', e.target.value)
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor={`departureTime_${index}`}>Departure Time</label>
                <input
                  type="time"
                  className="form-control"
                  id={`departureTime_${index}`}
                  name={`departureTime_${index}`}
                  value={stoppingStation.departureTime}
                  onChange={(e) =>
                    handleStoppingStationChange(index, 'departureTime', e.target.value)
                  }
                />
              </div>
              <button
                type="button"
                className="btn btn-danger mt-3"
                onClick={() => removeStoppingStation(index)}
              >
                Remove Station
              </button>
            </div>
          ))}
          <button type="button" className="btn btn-warning mt-3" onClick={addStoppingStation}>
            Add Station
          </button>
        </div>
        <div className='text-center'>
          <button type="submit" className="btn btn-primary">
            Update Schedule
          </button>
        </div>
      </form>
       {/* SweetAlert for success */}
       {showSuccessAlert && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => setShowSuccessAlert(false)} // Close the alert on confirm
        >
          Schedule updated successfully!
        </SweetAlert>
      )}
    </div>
  );
}

export default UpdateScheduleForm;
