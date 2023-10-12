import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

function UpdateTrainForm() {
  // Access the trainId from the URL
  const { id } = useParams(); 

  const [formData, setFormData] = useState({
    trainNo: '', 
    trainName: '', 
    firstClassCapacity: '',
    secondClassCapacity: '', 
    thirdClassCapacity: '', 
    type: '',
    isActive: true,
    isPublished: true, 
  });

  // State for SweetAlert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for SweetAlert

  useEffect(() => {
    // Fetch train data for the specified trainId
    fetch(`http://localhost:5046/api/train/train/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the form data with the fetched data
        setFormData(data);
      })
      .catch((error) => console.error('Error fetching train data:', error));
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

    // Send a PUT request to update the train data
    fetch(`http://localhost:5046/api/train/update-train/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or errors here
        console.log('Train updated:', data);
        setShowSuccessAlert(true);
      })
      .catch((error) => console.error('Error updating train:', error));
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', color: 'blue' }}>Update Train</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="trainNo">Train No</label>
          <input
            type="text"
            className="form-control"
            id="trainNo"
            name="trainNo"
            value={formData.trainNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="trainName">Train Name</label>
          <input
            type="text"
            className="form-control"
            id="trainName"
            name="trainName"
            value={formData.trainName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="firstClassCapacity">First Class Capacity</label>
          <input
            type="text"
            className="form-control"
            id="firstClassCapacity"
            name="firstClassCapacity"
            value={formData.firstClassCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="secondClassCapacity">Second Class Capacity</label>
          <input
            type="text"
            className="form-control"
            id="secondClassCapacity"
            name="secondClassCapacity"
            value={formData.secondClassCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="thirdClassCapacity">Third Class Capacity</label>
          <input
            type="text"
            className="form-control"
            id="thirdClassCapacity"
            name="thirdClassCapacity"
            value={formData.thirdClassCapacity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />
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
        <div className="form-check mb-3">
          <label htmlFor="isPublished">Published</label>
          <input
            type="checkbox"
            className="form-check-input"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Train
        </button>
      </form>
      {/* SweetAlert for success */}
      {showSuccessAlert && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => setShowSuccessAlert(false)} // Close the alert on confirm
        >
          Train updated successfully!
        </SweetAlert>
      )}
    </div>
  );
}

export default UpdateTrainForm;
