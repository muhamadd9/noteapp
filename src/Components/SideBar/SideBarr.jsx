import React from 'react';
import { NavLink } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function Sidebarr() {

    const navigate = useNavigate();

    function logOut() {
        localStorage.removeItem("userToken")
        navigate("/login")
    }


    return (
        <>
            <nav className=''>
                <div className='fixed-top bg-dark min-vh-100 overflow-hidden pt-2 ' style={{maxWidth : '250px'}} >
                    <NavLink className='py-3 d-flex mb-3' to={"/home"}>
                        <div className='text-center d-flex logo  '>
                            <i className=' fa-regular fa-note-sticky text-main fs-1 ms-3 me-2'></i>
                            <h1 className='text-main h2'>NoteNest</h1>
                        </div>
                    </NavLink>
                    <ul className='p-0'>
                        <NavLink className='li-bg fs-5 text-white ps-3 p-2 mb-3'>
                            Home
                        </NavLink>
                        <NavLink className='li-bg fs-5 text-white ps-3 p-2' onClick={logOut} >
                            Logout
                        </NavLink>
                    </ul>
                </div>
            </nav>


        </>
    )
}