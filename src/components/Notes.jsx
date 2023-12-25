import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = ({showAlert}) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context
  const navigate = useNavigate()
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })
  const ref = useRef("")
  const refClose = useRef("")
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes()    
    }else{
      navigate("/login")
    }
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    })
  }

  //onChange functions
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  //Submit function
  const handleClick = (e) => {
    // e.preventDefault()
    // console.log("Updating note", note);
    editNote(note.id, note.etitle, note.edescription, note.etag)
    showAlert("Note Updated Succesfully", "primary")
    refClose.current.click()
  }
  return (
    <>
      <AddNote showAlert={showAlert}/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="col-12 my-4">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control"  id="etitle" name="etitle" value={note.etitle} placeholder="Enter your title" onChange={handleChange}/>
                </div>
                <div className="col-12 my-4">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} placeholder="Enter your description" onChange={handleChange}/>
                </div>
                <div className="col-12 my-4">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} placeholder="Enter your tag" onChange={handleChange}/>
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container mx-3 my-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note, i) => {
          return <NoteItem showAlert={showAlert} notes={note} updateNote={updateNote} key={i} />
        })}
      </div>
    </>
  )
}

export default Notes