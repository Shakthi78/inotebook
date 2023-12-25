import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/")
  }
  return (
    <div style={{display: "block"}}>
        <p>You are not allowed to come here</p>
        <button onClick={handleClick} type="submit" className="btn btn-primary" >Ok</button>
    </div>
  )
}

export default About