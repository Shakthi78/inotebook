import React, { useContext } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import noteContext from '../context/notes/noteContext';

const NoteItem = ({notes, updateNote, showAlert}) => {
  const context = useContext(noteContext)
  const {deleteNote} = context
  const handleDelete = () => {
    deleteNote(notes._id)
    showAlert("Note deleted successfully", "danger")
  }
  return (
    <div className="col-md-3">
    <div className="card mb-3 d-flex flex-row">
        <div className="card-body">
        <h5 className="card-title">{notes.title}</h5>
        <p className="card-text">{notes.description}</p>
        <DeleteIcon onClick={handleDelete} className="mx-2"/><ModeEditIcon onClick={()=>{updateNote(notes)}} />
        </div>
        <div style={{padding: "15px"}}>
        <p className="card-text" style={{fontWeight: 600, border: "1px solid #0d6efd", padding: "5px", borderRadius: "5px"}}>{notes.tag}</p>
        </div>
    </div>
    </div>
  )
}

export default NoteItem