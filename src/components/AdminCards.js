import React from 'react'
import CardItem from '../screens/CardItem'
import './AdminCards.css'

function AdminCards() {
  return (
    <div className='cards'>
      <h1>Welcome To Management Section</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
            <ul className='cards__items'>
                <CardItem
                    src="images/train-management.gif"
                    text="Manage All The Train Shedules"
                    label="Train Management"
                    path="/trains/add"
                />
                <CardItem
                    src="images/traveler-management.gif"
                    text="Manage Shedule Details"
                    label="Schedule Management"
                    path="/schedules/add"
                />
                </ul>
                <ul className='cards__items'>
                <CardItem
                    src="images/reservation.gif"
                    text="Manage Reservation Details"
                    label="Reservation Management"
                    path="/reservations/add"
                />
               <CardItem
                    src="images/user.gif"
                    text="Details of Users"
                    label="User Management"
                    path="/userManagement"
                />
              </ul>
            
        </div>
      </div>
    </div>
  )
}

export default AdminCards