import React, { useState } from 'react'
import styles from '../Register/Register.module.css'
import signUp from '../../Images/Sign up-amico.png'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Register() {
  let [err,setErr] = useState('')
  let [loader,setLoader] = useState(false)
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    name : Yup.string().min(5,'Too Short!').required('Name is Required') ,
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password : Yup.string().min(8,'Should be 8 Characters at least!').required('Password is Required'),
    age : Yup.number().required('Password is Required').min(10),
    phone: Yup.string().matches(/^01[1205][0-9]{8}/ , 'Number is not valid').required('Phone is Required')
  })

  async function callRegister(callBody){
    setLoader(true);
    setErr('')
    try {
      let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp` , callBody);
      if(data.msg =='done'){
        navigate('/login')
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
      name:"",
      email:"",
      password:"",
      age:"",
      phone:""
    },
    validationSchema,
    onSubmit: callRegister,
  })
  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Sign Up</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <section id='register'>
    <div className="container-fluid ">
        <div className="row vh-100">
            <div className="col-md-5 bg-main d-flex align-items-center justify-content-center">
            <img src={signUp} alt="" />
            </div>
            <div className="col-md-7 bg-sec d-flex justify-content-center  align-items-center">
                <div className="con d-flex flex-column align-items-center w-75">
                <h2 className='text-main fw-semibold mb-3'>CREATE ACCOUNT</h2>
                <ul className="list-unstyled d-flex">
                  <li className=" mx-2 rounded-circle"><i className='fab fa-x fa-facebook-f'></i></li>
                  <li className=" mx-2 rounded-circle"><i className='fab fa-x fa-google-plus-g'></i></li>
                  <li className=" mx-2 rounded-circle"><i className='fab fa-x fa-linkedin-in'></i></li>
                </ul>
                <form className='w-75' onSubmit={registerForm.handleSubmit} >
                  {err&&<div className="alert alert-danger">{err}</div>}
                  <div className="form-group mb-3">
                  <input type="text" placeholder='Name' value={registerForm.values.name} name='name' className='form-control w-100' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur}  />
                  {registerForm.errors.name && registerForm.touched.name ? <div className='text-danger my-1 ms-1'> {registerForm.errors.name} </div> :null}
                  </div>
                  <div className="form-group mb-3">
                  <input type="email" placeholder='Email' value={registerForm.values.email} name='email' className='form-control w-100' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                  {registerForm.errors.email && registerForm.touched.email ? <div className='text-danger my-1 ms-1'> {registerForm.errors.email} </div> :null}
                  </div>
                  <div className="form-group mb-3">
                  <input type="password" placeholder='Password' value={registerForm.values.password} name='password' className='form-control w-100' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                  {registerForm.errors.password && registerForm.touched.password ? <div className='text-danger my-1 ms-1'> {registerForm.errors.password} </div> :null}
                  </div>
                  <div className="form-group mb-3">
                  <input type="number" placeholder='Age' value={registerForm.values.age} name='age' className='form-control w-100' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                  {registerForm.errors.age && registerForm.touched.age ? <div className='text-danger my-1 ms-1'> {registerForm.errors.age} </div> :null}
                  </div>
                  <div className="form-group mb-3">
                  <input type="tel" placeholder='Phone' value={registerForm.values.phone} name='phone' className='form-control w-100' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
                  {registerForm.errors.phone && registerForm.touched.phone ? <div className='text-danger my-1 ms-1'> {registerForm.errors.phone} </div> :null}
                  </div>
                  <p className='ms-1'>Already have account?<Link to={'/login'} className='text-main mx-1'>Login Now</Link></p>
                  <button  type='submit' className='btn-main mx-auto d-block fw-semibold' disabled={!(registerForm.isValid && registerForm.dirty)}>{loader ?<i className="fas fa-spinner fa-spin" ></i> : 'REGISTER'}</button>
                </form>
                </div>
            </div>
        </div>
    </div>
  </section>
  </>
}
