import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './screens/LandingPage/LandingPage';
import RegisterCard from './screens/RegisterCard/RegisterCard';
import LoginCard from './screens/LoginCards/LoginCard';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

import AdminHome from './components/AdminHome';
import UserManagement from './components/UserManagement';


import AddTrain from './components/AddTrain';
import UpdateTrain from './components/UpdateTrain';
import AddSchedule from './components/AddSchedule';
import UpdateSchedule from './components/UpdateSchedule'
import AddReservation from './components/AddReservation';
import UpdateReservation from './components/UpdateReservation';
import ScheduleTable from './components/ScheduleTable';
import ReservationTable from './components/ReservationTable';
import TrainTable from './components/TrainTable';

function App() {

  return (
<>
<Router>
    <Routes>

        <Route path="/" element={<LandingPage />} exact />
        <Route path ='/RegisterCard' element={<RegisterCard/>}/>
        <Route path ='/LoginCard' element={<LoginCard/>}/>
        <Route path="/register" element={<RegisterScreen />} exact />
        <Route path="/login" element={<LoginScreen />} exact />
        <Route path="/profile" element={<ProfileScreen />} />

        <Route path="/admin-home" element={<AdminHome/>} />
        <Route path="/userManagement" element={<UserManagement/>}/>


        <Route path="/trains" element={<TrainTable/>} />
        <Route path="/trains/add" element={<AddTrain/>} />
        <Route path="/trains/update/:id" element={<UpdateTrain />} />
        <Route path="/schedules" element={<ScheduleTable/>} />
        <Route path="/schedules/add" element={<AddSchedule/>} />
        <Route path="/schedules/update/:id" element={<UpdateSchedule />} />
        <Route path="/reservations" element={<ReservationTable />} />
        <Route path="/reservations/add" element={<AddReservation />} />
        <Route path="/reservations/update/:id" element={<UpdateReservation />} />

    </Routes>
    </Router>
</>
  );
}


export default App;
