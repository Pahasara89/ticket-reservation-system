import React from 'react'
import CardItem from '../screens/CardItem'
import './AdminCards.css'

function TravelArgentCards() {
  return (
    <div className='cards'>
      <h1>Hi Travel Argent</h1>
      <h1>Welcome To Management Section</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
            <ul className='cards__items'>
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
                    text="Details of Travelers"
                    label="Travel Management"
                    path="/traveler/add"
                />
              </ul>
            
        </div>
      </div>
    </div>
  )
}

export default TravelArgentCards