import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReservationNavBar from './ReservationNavBar';
import axios from 'axios'; // Import Axios

const ReservationManage = () => {
  const [reservations, setReservations] = useState([]);
  const [trainNames, setTrainNames] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showErrorAlertUpdate, setShowErrorAlertUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch reservations data from the API using Axios
    axios.get('http://localhost:5212/api/TicketReservation')
      .then((response) => {
        setReservations(response.data.reservations || []);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch available Train Names from the API using Axios
    axios.get('http://localhost:5212/api/traindetails')
      .then((response) => {
        const trainNameMapping = {};
        response.data.forEach((train) => {
          trainNameMapping[train._id] = train.trainName;
        });
        setTrainNames(trainNameMapping);
      })
      .catch((error) => {
        console.error('Error fetching Train Names:', error);
      });
  }, []);

  const handleCancel = (reservationId, reservationDate) => {
    const currentDate = new Date();
    const cancelDate = new Date(reservationDate);
    const timeDifference = cancelDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysDifference >= 5) {
      navigate(`/reservations/update/${reservationId}`);
    } else {
      setShowErrorAlert(true);
    }
  };

  const handleUpdate = (reservationId, reservationDate) => {
    const currentDate = new Date();
    const cancelDate = new Date(reservationDate);
    const timeDifference = cancelDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysDifference >= 5) {
      navigate(`/reservations/update/${reservationId}`);
    } else {
      setShowErrorAlertUpdate(true);
    }
  };

  return (
    <>
      <ReservationNavBar />
      <br></br>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Reference ID</th>
              <th>Reservation Date</th>
              <th>From</th>
              <th>To</th>
              <th>Update</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => {
              return (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.referenceId}</td>
                  <td>{reservation.reservationDate.substring(0, 10)}</td>
                  <td>{reservation.fromDestination}</td>
                  <td>{reservation.toDestination}</td>
                  <td className='text-center'>
                    <button type="button" className="btn btn-secondary rounded-pill" onClick={() => handleUpdate(reservation.id, reservation.reservationDate)}>
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
        
        {showErrorAlert && (
          <SweetAlert
            error
            title="Error"
            onConfirm={() => setShowErrorAlert(false)}
          >
            You cannot cancel this reservation because it's less than 5 days before the reservation date.
          </SweetAlert>
        )}
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
    </>
  );
};

export default ReservationManage;
