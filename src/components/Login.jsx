import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({showAlert}) => {
    const navigate = useNavigate()
    const [login, setLogin] = useState({email: "", password: ""})
    //onChange functions
    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //API Call
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({email: login.email, password: login.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success == true){
            localStorage.setItem('token', json.authToken)
            showAlert("Logged in sucsessfully", "success")
            navigate("/")
        }else{
            showAlert("Invalid credential", "danger")
        }
        }

    return (
        <div style={{width: "50%", margin: "0 auto"}}>
            <h2 style={{textAlign: "center"}}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-4">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp"  onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password"  onChange={handleChange} required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login