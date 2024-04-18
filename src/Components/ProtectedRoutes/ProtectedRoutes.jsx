import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {
    const token = localStorage.getItem('userToken');
    if(token === null){
        return (
            <>
            <Navigate to={'/login'}></Navigate>
            </>
          )
    }
    else{
        return (
            <>
            {children}
            </>
          )
    }
  
}
