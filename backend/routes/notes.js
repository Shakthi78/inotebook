const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// Fetch all notes: get "/api/notes/fetchallnotes" :"login required"
router.get('/fetchallnotes',fetchuser, async(req, res)=>{ 
    try {
    const notes = await Notes.find({user:req.user.id})
    res.json(notes)
    } catch (error) {
        console.error(error.message) 
        res.status(500).send("Internal server error")    
    }
})

// Create new notes: get "/api/notes/addnote" :"login required"
router.post('/addnote',fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    body('tag', 'Enter a valid tag').isLength({ min: 3 }),
    
], async(req, res)=>{ 
    //If errors return bad request
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors: result.array()})
    }

    try {
    const {title, description, tag} = req.body
    const note = await Notes.create({
        title, description, tag, user: req.user.id
    })
    res.json(note)
    } catch (error) {
        console.error(error.message) 
        res.status(500).send("Internal server error")  
    }
})

// Update existing notes: get "/api/notes/updatenote/:id" :"login required"
router.put('/updatenote/:id',fetchuser, async(req, res)=>{    
    try {
    const {title, description, tag} = req.body
       //Create a new note
       const newNote = {};
       if(title){newNote.title = title} 
       if(description){newNote.description = description} 
       if(tag){newNote.tag = tag} 

       //Find note to be updated and update it
       let note = await Notes.findById(req.params.id)
       if(!note){return res.status(404).send("Not found")}

       //Verifying wheather the real creator of the note or not
       if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
       }  

       note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
       res.json(note)

    } catch (error) {
        console.error(error.message) 
        res.status(500).send("Internal server error")  
    }
})

// Deleting the existing notes: get "/api/notes/deletenote/:id" :"login required"
router.delete('/deletenote/:id',fetchuser, async(req, res)=>{ 
    try {
    //Find note to be updated and update it
    let note = await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Not found")}

    //Verifying wheather the real creator of the note or not
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }  

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({note: "Successfully deleted"})
         
    } catch (error) {
        console.error(error.message) 
        res.status(500).send("Internal server error")     
    }
})

module.exports = router