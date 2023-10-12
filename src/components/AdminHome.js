import React from 'react';
import AdminCards from './AdminCards';
import Footer from '../screens/Footer';
import AdminNavBar from './AdminNavBar';



export default function AdminHome(){
    return(
        <div className='back'>
            <AdminNavBar/>
            <AdminCards/>
            <Footer/>
        </div>
    )
}