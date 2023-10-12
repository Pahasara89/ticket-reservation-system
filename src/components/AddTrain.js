import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';


function AddTrain() {

  const clearData = () => {
    window.location.reload(false);
};

  // State to manage train data with default values
  const [trainData, setTrainData] = useState({
    trainNo: '', 
    trainName: '', 
    firstClassCapacity: 0,
    secondClassCapacity: 0,
    thirdClassCapacity: 0, 
    type: '',
    isPublished: true,
    isActive:true ,
  });

  // State to manage success alert display
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Function to handle changes in form fields
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    // Handle checkbox input
    if (type === 'checkbox') {
      setTrainData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
    setTrainData((prevState) => ({
      ...prevState,
      [name]: name === 'firstClassCapacity' || name === 'secondClassCapacity' || name === 'thirdClassCapacity' ? parseInt(value, 10) : value,
    }));
  }
  };
  
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add new train from the api endpoint
      const response = await fetch('http://localhost:5046/api/train/new-train', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainData),
      });

      if (response.ok) {
        // Handle success, e.g., show a success message or redirect
        setShowSuccessAlert(true);
        console.log('Train added successfully.');
      } else {
        // Handle error response
        const errorMessage = await response.text();
        console.error('Error adding train:', errorMessage);
      }
    } catch (error) {
      console.error('Error adding train:', error);
    }
  };

  return (
    <div className="containerss">
      <h2 style={{ textAlign: 'center' }}>Add New Train</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="trainNo">Train No</label>
          <input
            type="text"
            id="trainNo"
            name="trainNo"
            value={trainData.trainNo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="trainName">Train Name</label>
          <input
            type="text"
            id="trainName"
            name="trainName"
            value={trainData.trainName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="firstClassCapacity">First Class Capacity</label>
          <input
            type="number"
            id="firstClassCapacity"
            name="firstClassCapacity"
            value={trainData.firstClassCapacity}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="secondClassCapacity">Second Class Capacity</label>
          <input
            type="number"
            id="secondClassCapacity"
            name="secondClassCapacity"
            value={trainData.secondClassCapacity}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="thirdClassCapacity">Third Class Capacity</label>
          <input
            type="number"
            id="thirdClassCapacity"
            name="thirdClassCapacity"
            value={trainData.thirdClassCapacity}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={trainData.type}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="" hidden selected>Select train type</option>
            <option value="Express">Express</option>
            <option value="Intercity">Intercity</option>
            <option value="Night Mail">Night Mail</option>
            <option value="Slow">Slow</option>
          </select>
        </div>
        <div className="form-check mb-3">
          <label htmlFor="isActive">Active</label>
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            name="isActive"
            checked={trainData.isActive}
            onChange={handleChange}
          />
        </div>
        <div className="form-check mb-3">
          <label htmlFor="isPublished">Published</label>
          <input
            type="checkbox"
            className="form-check-input"
            id="isPublished"
            name="isPublished"
            checked={trainData.isPublished}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <button type="submit" className="btn btn-primary mt-3">
            Add Train
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
          Train added successfully!
        </SweetAlert>
      )}
    </div>
  );
}

export default AddTrain;
