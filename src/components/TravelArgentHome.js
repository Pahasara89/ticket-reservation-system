import React from 'react';
import Footer from '../screens/Footer';
import AdminNavBar from './AdminNavBar';
import TravelArgentCards from './TravelArgentCards';



export default function TravelArgentHome(){
    return(
        <div className='back'>
            <AdminNavBar/>
            <TravelArgentCards/>
            <Footer/>
        </div>
    )
}