import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Note(props) {
  const {title , content , noteId , getUserNotes ,time  } = props ;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function editNote(values,idd){
    console.log(noteId);
    console.log(values);
   try {
    let {data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,values , {
      headers:  { token : "3b8ny__" + localStorage.getItem('userToken')}
    }) 
    getUserNotes();
    handleClose();
   } catch (error) {
    console.log(error);
   }
    handleClose();
  }
  
  const noteEdit = useFormik({
    initialValues:{
      title: `${title}`,
      content:`${content}`
    },
    onSubmit : editNote
  })



  async function deleteNote(idd){
    try {
        
        let {data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${idd}`,
        {headers: {token : "3b8ny__" + localStorage.getItem('userToken')}});
        console.log(data);
         await getUserNotes();


    } catch (error) {
        console.log(error);
        
    }
  }

  return <>
  <div className="col-lg-4 col-md-6 " key={noteId}>
  <Card>
      <Card.Header className='bg-main text-sec fw-semibold fs-5'>{title}</Card.Header>
      <Card.Body>
        <Card.Title>{content}</Card.Title>
 
        <div className="btnstext d-flex justify-content-between">
        <div className="text">
          Created at : {time}
        </div>
        <div className="btns d-flex">
        <div className='mx-3' onClick={handleShow} ><i className="fa-regular text-main fa-pen-to-square"></i></div>
        <div className='' onClick={()=> deleteNote(noteId)} ><i className='fas  fa-trash text-danger'></i></div>
        </div>
        </div>
      </Card.Body>
    </Card>
  </div>



  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='ms-auto text-main '>EDIT NOTE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={noteEdit.handleSubmit}>
            <input type="text" name='title' value={noteEdit.values.title} className='form-control mb-2' onChange={noteEdit.handleChange} placeholder='Note Title' />
            <textarea name='content' value={noteEdit.values.content} className='form-control' id="content" onChange={noteEdit.handleChange} placeholder='Note Content' cols="30" rows="10"></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn-main" className='modal-btn ' onClick={ noteEdit.handleSubmit}>
            APPLAY CHANGES
          </Button>
        </Modal.Footer>
      </Modal>
  </>
}
