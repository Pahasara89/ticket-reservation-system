import React, { useState, useEffect } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import Reservation from './Reservation.css';

function AddReservation() {

  const clearData = () => {
    window.location.reload(false);
};

  // State to store the reservation data
  const [reservationData, setReservationData] = useState({
    referenceId: '',
    reservationDate: '',
    userId: '',
    from: '',
    to: '',
    status: true,
    trainId: '',
    numberOfSeats: 1, 
  });

  // State to store available train IDs
  const [trainIds, setTrainIds] = useState([]);

  // State to control the success alert display
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    // Fetch available Train IDs from the API
    fetch('http://localhost:5046/api/train')
      .then((response) => response.json())
      .then((data) => setTrainIds(data))
      .catch((error) => console.error('Error fetching Train IDs:', error));
  }, []);

  // Handle changes in form input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setReservationData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send a POST request to add a new reservation
    try {
      const response = await fetch('http://localhost:5046/api/ticket/resv/new-resv/trainId/scheduleId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        // Reservation added successfully
        console.log('Reservation added successfully.');
        setShowSuccessAlert(true);
      } else {
        // Handle errors and display error message
        const errorMessage = await response.text();
        console.error('Error adding reservation:', errorMessage);
      }
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };

  return (
    <div className="containerss">
      <h2 style={{ textAlign: 'center' }}>Add New Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="referenceId">Reference ID</label>
          <input
            type="text"
            id="referenceId"
            name="referenceId"
            value={reservationData.referenceId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="reservationDate">Reservation Date</label>
          <input
            type="date"
            id="reservationDate"
            name="reservationDate"
            value={reservationData.reservationDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={reservationData.userId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="from">From</label>
          <input
            type="text"
            id="from"
            name="from"
            value={reservationData.from}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="to">To</label>
          <input
            type="text"
            id="to"
            name="to"
            value={reservationData.to}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={reservationData.status}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="trainId">Train ID</label>
          <select
            id="trainId"
            name="trainId"
            value={reservationData.trainId}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="" disabled>
              Select Train ID
            </option>
            {trainIds.map((train) => (
              <option key={train.id} value={train.id}>
                {train.trainNo} - {train.trainName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="numberOfSeats">Number of Seats</label>
          <input
            type="number"
            id="numberOfSeats"
            name="numberOfSeats"
            value={reservationData.numberOfSeats}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary mt-3">
            Add Reservation
          </button>
          <buttons type="clear" className="btn btn-primary mt-3" onClick={clearData}>Clear</buttons>
        </div>
      </form>
      {showSuccessAlert && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => setShowSuccessAlert(false)}
        >
          Reservation added successfully!
        </SweetAlert>
      )}
    </div>
  );
}

export default AddReservation;
