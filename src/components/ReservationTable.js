import React, { useEffect, useState } from 'react';
import { Link ,useNavigate  } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

const ReservationManage = () => {
  // State to store reservations data
  const [reservations, setReservations] = useState([]); 
  // State to store train names mapping
  const [trainNames, setTrainNames] = useState({});
  // State for error alert when cancelation condition is not met
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  // State for error alert when update condition is not met
  const [showErrorAlertUpdate, setShowErrorAlertUpdate] = useState(false);

  // Initialize navigation
  const navigate  = useNavigate (); // Initialize history

  useEffect(() => {
    // Fetch reservations data from the API
    fetch('http://localhost:5046/api/ticket/resv/all-reservations')
      .then((response) => response.json())
      .then((data) => setReservations(data.reservations || []))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Fetch available Train Names from the API
    fetch('http://localhost:5046/api/train')
      .then((response) => response.json())
      .then((data) => {
        const trainNameMapping = {};
        data.forEach((train) => {
          trainNameMapping[train._id] = train.trainName;
        });
        setTrainNames(trainNameMapping);
      })
      .catch((error) => console.error('Error fetching Train Names:', error));
  }, []);

  // Handle cancelation based on date difference
  const handleCancel = (reservationId, reservationDate) => {
    // Calculate date difference logic here
    const currentDate = new Date();
    const cancelDate = new Date(reservationDate);
    const timeDifference = cancelDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Check if the condition for cancelation is met (e.g., 5 days before)
    if (daysDifference >= 5) {
      navigate(`/reservations/update/${reservationId}`);
    } else {
      // If the condition is not met, show an error alert
      setShowErrorAlert(true);
    }
  };

  // Handle updating based on date difference
  const handleUpdate = (reservationId, reservationDate) => {
    // Calculate date difference logic here
    const currentDate = new Date();
    const cancelDate = new Date(reservationDate);
    const timeDifference = cancelDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // Check if the condition for cancelation is met (e.g., 5 days before)
    if (daysDifference >= 5) {
      navigate(`/reservations/update/${reservationId}`);
    } else {
      // If the condition is not met, show an error alert
      setShowErrorAlertUpdate(true);
    }
  };

  return (
    <div>
      <h1 className="my-4 text-center text-primary">Reservation Details</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Reference ID</th>
            <th>Reservation Date</th>
            <th>User ID</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Train Name</th>
            <th>Update</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            return (
              <tr key={reservation._id}>
                <td>{reservation.referenceId}</td>
                <td>{reservation.reservationDate.substring(0, 10)}</td>
                <td>{reservation.userId}</td>
                <td>{reservation.from}</td>
                <td>{reservation.to}</td>
                <td>{reservation.status ? 'true' : 'false'}</td>
                <td>{trainNames[reservation.trainName]}</td>
                <td className='text-center'>
                 
                    <button type="button" className="btn btn-secondary rounded-pill" onClick={()=>handleUpdate(reservation.id, reservation.reservationDate)}> 
                        Update
                    </button>
           
                </td>
                <td className='text-center'>
                  <button
                    type="button"
                    className="btn btn-danger rounded-pill"
                    onClick={() => handleCancel(reservation.id, reservation.reservationDate)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* Error Alert */}
      {showErrorAlert && (
        <SweetAlert
          error
          title="Error"
          onConfirm={() => setShowErrorAlert(false)}
        >
          You cannot cancel this reservation because it's less than 5 days before the reservation date.
        </SweetAlert>
      )}
        {/* Error Alert */}
        {showErrorAlertUpdate && (
        <SweetAlert
          error
          title="Error"
          onConfirm={() => setShowErrorAlertUpdate(false)}
        >
          You cannot update this reservation because it's less than 5 days before the reservation date.
        </SweetAlert>
      )}
    </div>
  );
};

export default ReservationManage;
