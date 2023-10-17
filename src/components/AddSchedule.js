import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [scheduleIdToDelete, setScheduleIdToDelete] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Fetch schedules from your API and update the 'schedules' state.
    axios.get('')
      .then((response) => setSchedules(response.data))
      .catch((error) => console.error('Error fetching schedules:', error));
  }, [isSuccess]);

  const handleDeleteSchedule = () => {
    // Send a DELETE request to your API to delete a schedule by ID.
    axios.delete(`/${scheduleIdToDelete}`)
      .then(() => {
        setIsSuccess(!isSuccess); // Trigger a re-fetch of schedules
        setScheduleIdToDelete(''); // Clear the schedule ID to delete
      })
      .catch((error) => console.error('Error deleting schedule:', error));
  };

  return (
    <div>
      <h2>Manage Schedules</h2>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            {schedule.TrainName} - {schedule.DepartureTime} from {schedule.From} to {schedule.Destination}
            <button onClick={() => setScheduleIdToDelete(schedule.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {scheduleIdToDelete && (
        <div>
          <p>Are you sure you want to delete this schedule?</p>
          <button onClick={handleDeleteSchedule}>Confirm Delete</button>
        </div>
      )}

      {isSuccess && <p>Schedule deleted successfully!</p>}
    </div>
  );
}

export default ManageSchedules;
