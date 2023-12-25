const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Shakthiissecret"

//Create user using: POST "/api/auth/createuser":"No login required"
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be min 5').isLength({ min: 5 }),
], async(req, res)=>{
    let success = false
    //If errors return bad request
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors: result.array()})
    }

    //Checking wheather email already exist
    try {
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({success, error: "Email already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt) 

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })

    const data = {
        user: {
            id: user._id
        }
    }

    const authToken = jwt.sign(data, JWT_SECRET)
    success = true
    res.json({success,authToken})
    // res.json(user)
    } catch (error) {
        console.error(error.message) 
        res.status(500).send("Internal server error")   
    }
    // .then(user => res.json(user))
    // .catch(err => res.json({error: "Email already exist"}))
})


// Create user using: POST "/api/auth/login" :"No login required"
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async(req, res)=>{
    let success = false
    //If errors return bad request
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors: result.array()})
    }

    const {email, password} = req.body;

    //Checking wheather email exist or not
    try {
    let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({success, error:"User does not exist"})
    }

    //Comparing the entered password with the user password
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
        return res.status(400).json({success, error:"Wrong password"})
    }

    const data = {
        user: {
            id: user._id
        }
    }

    const authToken = jwt.sign(data, JWT_SECRET)
    success = true
    res.json({success, authToken})

    } catch (error) {
        console.error(error.message) 
        res.status(500).send("Internal server error")      
    }
})

// Create user using: POST "/api/auth/getuser" :"login required"
router.post('/getuser',fetchuser, async(req, res)=>{
    try {
       const userId = req.user.id;
       const user = await User.findById(userId).select("-password")
       res.send(user) 
    } catch (error) {
        console.error(error.message) 
        res.status(500).send("Internal server error")
    }
})

module.exports = router