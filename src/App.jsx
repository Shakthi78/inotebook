import './App.css'
import About from './components/About';
import Header from './components/header';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      showAlert();
    }, 3000);
  }
  return (
    <>
    <NoteState>
    <BrowserRouter>
        <Header />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/login" element={<Login showAlert={showAlert}/>}></Route>
          <Route path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
