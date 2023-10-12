import React, { useState, useEffect} from 'react';
import { DateTime } from 'luxon'; // Import DateTime from luxon
import SweetAlert from 'react-bootstrap-sweetalert';
import Schedule from './Schedule.css';

function AddSchedule() {
  // State variables for schedule data 
  const [scheduleData, setScheduleData] = useState({
    scheduleNo: '', 
    trainNo:'',
    arrivalDate: '', 
    arrivalTime: '', 
    departureDate: '', 
    departureTime: '', 
    firstClassPrice: 0, 
    secondClassPrice: 0, 
    thirdClassPrice: 0, 
    reservationStatus: '',
    stoppingStations: [],
  });

  // State variables for success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); 

  // State variables for available train IDs
  const [trainIds, setTrainIds] = useState([]); 

  // State variables for route IDs
  const [routeIds, setRouteIds] = useState([]);

  useEffect(() => {
    // Fetch available Train IDs from the API
    fetch('http://localhost:5046/api/train/active-published')
      .then((response) => response.json())
      .then((data) => setTrainIds(data))
      .catch((error) => console.error('Error fetching Train IDs:', error));
  }, []);


  useEffect(() => {
    // Fetch available Train IDs from the API
    fetch('http://localhost:5046/api/route') 
      .then((response) => response.json())
      .then((data) => setRouteIds(data))
      .catch((error) => console.error('Error fetching Route IDs:', error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setScheduleData((prevState) => ({
      ...prevState,
      [name]: name === 'firstClassPrice' || name === 'secondClassPrice' || name === 'thirdClassPrice' ? parseFloat(value) : value,
    }));

    console.log(scheduleData.trainId)
  };

  // Add a new empty stopping station to the array
  const handleAddStoppingStation = () => {
    setScheduleData((prevState) => ({
      ...prevState,
      stoppingStations: [
        ...prevState.stoppingStations,
        {
          id:'',
          stationName: '',
          arrivalTime: '',
          departureTime: '',
        },
      ],
    }));
  };

  // Remove the stopping station at the specified index
  const handleRemoveStoppingStation = (index) => {
    setScheduleData((prevState) => {
      const updatedStoppingStations = [...prevState.stoppingStations];
      updatedStoppingStations.splice(index, 1);
      return {
        ...prevState,
        stoppingStations: updatedStoppingStations,
      };
    });
  };

  // Extract the name and value of the input field that triggered the change event
  const handleStoppingStationChange = (index, event) => {
    const { name, value } = event.target;
    setScheduleData((prevState) => {
      const updatedStoppingStations = [...prevState.stoppingStations];
      updatedStoppingStations[index][name] = value;
      return {
        ...prevState,
        stoppingStations: updatedStoppingStations,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // API endpoint of adding new train schedule
      const response = await fetch('http://localhost:5046/api/TrainSchedule/new-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scheduleData),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log('Schedule added successfully.');
        setShowSuccessAlert(true);
      } else {
        // Handle error response
        const errorMessage = await response.text();
        console.log('Added Schedule Data:', scheduleData); // Log the added schedule data
        console.error('Error adding schedule:', errorMessage);
      }
    } catch (error) {
      console.error('Error adding schedule:', error);
    }

  // Create a function to format SLST time
    function formatSLSTTime(utcTimeString) {
      const utcDateTime = DateTime.fromISO(utcTimeString, { zone: 'utc' });
      const slstDateTime = utcDateTime.setZone('Asia/Colombo');
      return slstDateTime.toLocaleString(DateTime.TIME_WITH_SECONDS);
    }
    
  };

  // Formats a time span string (HH:mm:ss) to a shorter format (HH:mm).
  function formatTimeSpan(timeSpanString) {
    const [hours, minutes, seconds] = timeSpanString.split(':');
    return `${hours}:${minutes}`;
  }

  return (
    <div className="containers">
      <h2 style={{ textAlign: 'center' }}>Add New Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          
        </div>
        <div className="form-group mb-3">
          <label htmlFor="scheduleNo">Schedule No</label>
          <input
            type="text"
            id="scheduleNo"
            name="scheduleNo"
            value={scheduleData.scheduleNo}
            onChange={handleChange}
            className="form-control"
            required
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
          <label htmlFor="arrivalDate">Arrival Date</label>
          <input
            type="date"
            id="arrivalDate"
            name="arrivalDate"
            value={(scheduleData.arrivalDate)}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="arrivalTime">Arrival Time</label>
          <input
            type="time"
            id="arrivalTime"
            name="arrivalTime"
            value={formatTimeSpan(scheduleData.arrivalTime)}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={scheduleData.departureDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="departureTime">Departure Time</label>
          <input
            type="time"
            id="departureTime"
            name="departureTime"
            value={formatTimeSpan(scheduleData.departureTime)}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="firstClassPrice">First Class Price</label>
          <input
            type="number"
            id="firstClassPrice"
            name="firstClassPrice"
            value={scheduleData.firstClassPrice}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="secondClassPrice">Second Class Price</label>
          <input
            type="number"
            id="secondClassPrice"
            name="secondClassPrice"
            value={scheduleData.secondClassPrice}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="thirdClassPrice">Third Class Price</label>
          <input
            type="number"
            id="thirdClassPrice"
            name="thirdClassPrice"
            value={scheduleData.thirdClassPrice}
            onChange={handleChange}
            className="form-control"
            required
          />
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
        {/* Stopping Stations */}
        <div className="form-group mb-3">
          <h3 style={{ textAlign: 'center', color: 'black' }}>Train Stations</h3>
          {scheduleData.stoppingStations.map((station, index) => (
            <div key={index} className="stopping-station">
              <div className="form-group">
                <label htmlFor={`stationName${index}`}>Station Id</label>
                <input
                  type="text"
                  id={`id${index}`}
                  name="id"
                  value={station.id}
                  onChange={(event) =>
                    handleStoppingStationChange(index, event)
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`stationName${index}`}>Station Name</label>
                <input
                  type="text"
                  id={`stationName${index}`}
                  name="stationName" 
                  value={station.stationName}
                  onChange={(event) =>
                    handleStoppingStationChange(index, event)
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`arrivalTime${index}`}>Arrival Time</label>
                <input
                  type="time"
                  id={`arrivalTime${index}`}
                  name="arrivalTime"
                  value={station.arrivalTime}
                  onChange={(event) =>
                    handleStoppingStationChange(index, event)
                  }
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`departureTime${index}`}>Departure Time</label>
                <input
                  type="time"
                  id={`departureTime${index}`}
                  name="departureTime"
                  value={station.departureTime}
                  onChange={(event) =>
                    handleStoppingStationChange(index, event)
                  }
                  className="form-control"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveStoppingStation(index)}
                className="btn btn-danger mt-3" 
              >
                Remove Station
              </button>
            </div>
          ))}
          <br></br>
            <button
              type="button"
              onClick={handleAddStoppingStation}
              className="btn btn-warning mt-3"
            >
              Add Station
            </button>
        </div>
        <br></br>
        <div className="form-group mb-3 text-center">
          <button type="submit" className="btn btn-primary mt-3">
            Add Schedule
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

export default AddSchedule;
