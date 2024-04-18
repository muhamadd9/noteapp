import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import signUp from '../../Images/Sign up-cuate.png'
import back from '../../Images/light-patten.svg'
import {Helmet} from "react-helmet";

export default function Login() {

  let [err,setErr] = useState('')
  let [loader,setLoader] = useState(false)
  let navigate = useNavigate();

  async function callLogin(callBody){
    setLoader(true);
    setErr('')
    try {
      let { data } =await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn` , callBody);
      if(data.msg =='done'){
        navigate('/')
        localStorage.setItem('userToken',data.token)
      }
      console.log(data);
    } 
    catch (error) {
      console.log(error.response.data.msg);
      setErr(error.response.data.msg);
      setLoader(false)
    }
  }
  const registerForm =useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    onSubmit: callLogin,
  })


  return <>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Sign in</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <section id='login'>
    <div className="container-fluid ">
        <div className="row vh-100">
            <div className="col-md-5 bg-main d-flex align-items-center justify-content-center">
              <div className="conn ">
                <h1 className='text-sec text-center'>WELCOME BACK</h1>
            <img src={signUp} alt="" />
              </div>
            </div>
            <div className="col-md-7 bg-sec d-flex justify-content-center  align-items-center" style={{backgroundImage : {back}}}>
                <div className="con d-flex flex-column align-items-center w-75">
                <h1 className='text-main fw-semibold mb-1 '>Log In</h1>
                <p className="fw-semibold mb-4 fs-6">
                  Enter your valid credential for logging in 
                </p>
                <form className='w-75' onSubmit={registerForm.handleSubmit} >
                  {err&&<div className="alert alert-danger">{err}</div>}
                 
                  <div className="form-group mb-3">
                  <input type="email" placeholder='Email' value={registerForm.values.email} name='email' className='form-control w-100' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                  {registerForm.errors.email && registerForm.touched.email ? <div className='text-danger my-1 ms-1'> {registerForm.errors.email} </div> :null}
                  </div>
                  <div className="form-group mb-3">
                  <input type="password" placeholder='Password' value={registerForm.values.password} name='password' className='form-control w-100' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                  {registerForm.errors.password && registerForm.touched.password ? <div className='text-danger my-1 ms-1'> {registerForm.errors.password} </div> :null}
                  </div>
                  <p className='ms-1'>Don't have account?<Link to={'/register'} className='text-main mx-1'>Register Now</Link></p>
                  <button  type='submit' className='btn-main mx-auto d-block fw-semibold'>{loader ?<i className="fas fa-spinner fa-spin" ></i> : 'Login'}</button>
                </form>
                </div>
            </div>
        </div>
    </div>
  </section>
  </>
}
