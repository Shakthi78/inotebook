import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    let s1 = {
        name: "Suresh",
        age: 21
    }
    const [state, setState] = useState(s1)
    const update = ()=>{
        setTimeout(()=>{
            setState({
                name: "baby"
            })
        },1000)
    }
  return (
    <NoteContext.Provider value={{state, update}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;