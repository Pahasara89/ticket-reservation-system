import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

function UpdateTravelerForm() {
  // Access the travelerId from the URL
  const { id } = useParams(); 

  const [formData, setFormData] = useState({
    firstName: '', 
    lastName: '', 
    dateOfBirth: '',
    idNumber: '',
    email:'',
    trvalertype: '',
    isActive:true ,
  });

  // State for SweetAlert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for SweetAlert

  useEffect(() => {
    // Fetch traveler data for the specified travelerId
    fetch(`http://localhost:5046/api/traveler/traveler/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the form data with the fetched data
        setFormData(data);
      })
      .catch((error) => console.error('Error fetching traveler data:', error));
  }, [id]);

  // Update the form data with the fetched data
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a PUT request to update the traveler data
    fetch(`http://localhost:5046/api/traveler/update-traveler/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or errors here
        console.log('Traveler updated:', data);
        setShowSuccessAlert(true);
      })
      .catch((error) => console.error('Error updating traveler:', error));
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', color: 'blue' }}>Update traveler</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="dateOfBirth">Date Of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={(formData.dateOfBirth)}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="idNumber">NIC</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="trvalertype">Traveler Type</label>
          <select
            id="trvalertype"
            name="trvalertype"
            value={formData.trvalertype}
            onChange={handleInputChange}
            className="form-control"
            required
          >
            <option value="" hidden selected>Select traveler type</option>
            <option value="Express">Adult</option>
            <option value="Intercity">Child</option>
            <option value="Night Mail">Infant</option>
          </select>
        </div>
        <div className="form-check mb-3">
          <label htmlFor="isActive">Active</label>
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Traveler
        </button>
      </form>
      {/* SweetAlert for success */}
      {showSuccessAlert && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => setShowSuccessAlert(false)} // Close the alert on confirm
        >
          Traveler updated successfully!
        </SweetAlert>
      )}
    </div>
  );
}

export default UpdateTravelerForm;
