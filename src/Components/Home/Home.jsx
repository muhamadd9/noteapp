import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import Sidebarr from '../SideBar/SideBarr'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import Note from '../Note/Note';


export default function Home() {

  const [notess, setNotes] = useState([]);
  const [numOfNotes, setNumOfNotes] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function addNote(values){
    
   try {
    let {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes`,values , {
      headers:  { token : "3b8ny__" + localStorage.getItem('userToken')}
      
    }) 
    console.log(data);
    getUserNotes();
   } catch (error) {
    console.log(error);
   }
    handleClose();
  }
  
  const noteForm = useFormik({
    initialValues:{
      title: "",
      content:""
    },
    onSubmit : addNote
  })
  function resetForm(){
    noteForm.values.title='';
    noteForm.values.content='';
    handleShow();
  }
  async function getUserNotes(){
   try {
    let { data } = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,
    {headers:  { token : "3b8ny__" + localStorage.getItem('userToken')}})
    // console.log(data);
    setNotes(data)
    setNumOfNotes(data.notes.length )
    return data.notes.length
   } catch (error) {
    console.log("error",error);
    setNumOfNotes(0)
    setNotes([])
   }
  }


  useEffect(()=>{
    getUserNotes();
  },[])
  return <>
  <section className='bg-sec min-vh-100'>
    <div className="container-fluid ng-danger">
      <div className="row">
        <div className="col-md-2 ">
          <Sidebarr/>
        </div>
        <div className="col-md-10  ">
        <div className="my-5 me-5 ">
          <div className="container d-flex">
          <h3 className='h4'>Number Of Notes : <span className='text-main fw-semibold'>{numOfNotes}</span></h3>
          <button className='btn-main fs-6 px-3 ms-auto d-block me-5' onClick={resetForm}>ADD NOTE</button>
          </div>
          <div className="row my-3 g-4">
             {notess?.notes?.map((note)=>(
              <Note title={note.title} content={note.content} time={note.createdAt.split('T')[0]}  setNote={setNotes} noteId={note._id} getUserNotes={getUserNotes}/>
             ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>

  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='ms-auto text-main '>NEW NOTE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={noteForm.handleSubmit}>
            <input type="text" name='title' value={noteForm.values.title} className='form-control mb-2' onChange={noteForm.handleChange} placeholder='Note Title' />
            <textarea name='content' value={noteForm.values.content} className='form-control' id="content" onChange={noteForm.handleChange} placeholder='Note Content' cols="30" rows="10"></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn-main" className='modal-btn ' onClick={noteForm.handleSubmit}>
            ADD NOTE
          </Button>
        </Modal.Footer>
      </Modal>
  </>
}
