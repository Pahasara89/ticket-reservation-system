import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

function UpdateReservation() {
  // Get the reservation ID from the URL params
  const { id } = useParams();

  // State to store reservation data
  const [reservationData, setReservationData] = useState({
    referenceId: '',
    reservationDate: '',
    userId: '',
    fromDestination: '',
    toDestination: '',
    status: true,
    trainId: '',
  });

  // State to store available train IDs
  const [trainIds, setTrainIds] = useState([]);

  // State for success alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    // Fetch available Train IDs from the API
    fetch('http://localhost:5046/api/train') 
      .then((response) => response.json())
      .then((data) => setTrainIds(data))
      .catch((error) => console.error('Error fetching Train IDs:', error));

    // Fetch reservation details by ID and populate the form for editing
    fetch(`http://localhost:5046/api/ticket/resv/${id}`) 
      .then((response) => response.json())
      .then((data) => {
        setReservationData(data);
      })
      .catch((error) => console.error('Error fetching Reservation details:', error));
  }, [id]);

  // Handle change when the select value changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setReservationData({
      ...reservationData,
      [name]: newValue,
    });
  };

  // Handle submission of the reservation update form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5046/api/ticket/resv/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        console.log('Reservation updated successfully.');
        setShowSuccessAlert(true);
      } else {
        // Handle error response
        const errorMessage = await response.text();
        console.error('Error updating reservation:', errorMessage);
      }
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', color: 'blue', marginBottom:'30px'}}>Update Reservation</h2>
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
            value={reservationData.reservationDate.substring(0,10)}
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
          <label htmlFor="fromDestination">From</label>
          <input
            type="text"
            id="fromDestination"
            name="fromDestination"
            value={reservationData.from}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="toDestination">To</label>
          <input
            type="text"
            id="toDestination"
            name="toDestination"
            value={reservationData.to}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-check mb-3">
          <label htmlFor="status">Status</label>
          <input
            type="checkbox"
            className="form-check-input"
            id="status"
            name="status"
            checked={reservationData.status}
            onChange={handleChange}
          />
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
          <button type="submit" className="btn btn-primary mt-3">
            Update Reservation
          </button>
        </div>
      </form>
              {/* React Sweet Alert for success */}
              {showSuccessAlert && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => setShowSuccessAlert(false)} // Close the alert on confirm
        >
          Reservation updated successfully!
        </SweetAlert>
        )}
    </div>
  );
}

export default UpdateReservation;
