import React from 'react'
import CardItem from '../CardItem'
import '../Cards.css'
// import HomeNavBar from './HomeNavBar';
// import Footer from './Footer';

function Cards() {
  return (
    <>
    {/* <HomeNavBar/> */}
    <div className='bod'>
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
            <ul className='cards__items'>
                <CardItem
                    src="images/traveler-argent.gif"
                    text="Are you Travel Agent? "
                    label="Travel Agent"
                    path="/login"
                />
                <CardItem
                    src="images/admin.gif"
                    text="Are you Admin ? "
                    label="Admin"
                    path="/login"
                />
            </ul>
         
        </div>
      </div>
    </div>
    </div>
    {/* <Footer/> */}
    </>
  )
}

export default Cards