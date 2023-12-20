import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const Home = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update();
  }, [])
  return (
    <div>
        Home {a.state.name}        
    </div>
  )
}

export default Home