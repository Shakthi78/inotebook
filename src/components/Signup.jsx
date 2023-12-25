import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = ({showAlert}) => {
    const navigate = useNavigate()
    const [signup, setSignup] = useState({name: "", email: "", password: "", cpassword: ""})

    //onChange functions
    const handleChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const {name, email, password} = signup
    const handleSubmit = async (e) => {
        e.preventDefault()
        //API Call
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password})
        });
            const json = await response.json();
            if(json.success == true){
                showAlert("User created sucsessfully", "success")
            navigate("/login")
            }else{
                showAlert("Please Check Your inputs", "danger")
            }
        }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h2 style={{width: "50%", margin: "0 auto"}}>Signup</h2>
            <div className="mb-3 my-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={handleChange} minLength={3} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={handleChange} minLength={5} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} minLength={5} required/>
            </div>
            
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    </div>
  )
}

export default Signup