import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import TravelerNavBar from './TravelerNavBar';
import './Train.css';


function AddTraveler() {

  const clearData = () => {
    window.location.reload(false);
};

  // State to manage traveler data with default values
  const [travelData, setTravelData] = useState({
    firstName: '', 
    lastName: '', 
    dateOfBirth: '',
    idNumber: '',
    email:'',
    trvalertype: '',
    isActive:true ,
  });

  // State to manage success alert display
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Function to handle changes in form fields
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Handle checkbox input
    if (type === 'checkbox') {
      setTravelData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
    setTravelData((prevState) => ({
      ...prevState,
      [name]: name === 'firstClassCapacity' || name === 'secondClassCapacity' || name === 'thirdClassCapacity' ? parseInt(value, 10) : value,
    }));
  }
  };
  
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add new traveler from the api endpoint
      const response = await fetch('http://localhost:5046/api/traveler/new-traveler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(travelData),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        setShowSuccessAlert(true);
        console.log('Traveler added successfully.');
      } else {
        // Handle error response
        const errorMessage = await response.text();
        console.error('Error adding traveler:', errorMessage);
      }
    } catch (error) {
      console.error('Error adding traveler:', error);
    }
  };

  return (
    <>
    <TravelerNavBar/>
    <div className="containersss">
      <h2 style={{ textAlign: 'center' }}>Add New Traveler</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={travelData.firstName}
            onChange={handleChange}
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
            value={travelData.lastName}
            onChange={handleChange}
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
            value={(travelData.dateOfBirth)}
            onChange={handleChange}
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
            value={travelData.idNumber}
            onChange={handleChange}
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
            value={travelData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="trvalertype">Traveler Type</label>
          <select
            id="trvalertype"
            name="trvalertype"
            value={travelData.trvalertype}
            onChange={handleChange}
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
            checked={travelData.isActive}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary mt-3">
            Add Travler
          </button>
          <buttons type="clear" className="btn btn-primary mt-3" onClick={clearData}>Clear</buttons>
        </div>
      </form>
            {/* React Sweet Alert for success */}
            {showSuccessAlert && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => setShowSuccessAlert(false)} // Close the alert on confirm
        >
          Traveler added successfully!
        </SweetAlert>
      )}
    </div>
    </>
  );
}

export default AddTraveler;
