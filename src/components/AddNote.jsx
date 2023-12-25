import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = ({showAlert}) => {
    const context = useContext(noteContext)
    const {addNote, getNotes} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})

    //onChange functions
    const handleChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    //Submit function
    const handleClick = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        getNotes()
        showAlert("Note added successfully", "success")
        setNote({title: "", description: "", tag: ""})
    }
  return (
    <div className="container">
      <h2>Add note</h2>
      <form>
        <div className="col-12 my-4">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" placeholder="Enter your title" onChange={handleChange} value={note.title} />
        </div>
        <div className="col-12 my-4">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" placeholder="Enter your description" onChange={handleChange} value={note.description} />
        </div>
        <div className="col-12 my-4">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter your tag" onChange={handleChange} value={note.tag} />
        </div>
        <div className="col-12 my-4">
          <button type="submit" onClick={handleClick} className="btn btn-primary" >Add note</button>
        </div>
      </form>
      <h2 className='my-2s'>Your note</h2>
      </div>
  )
}

export default AddNote