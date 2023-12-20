import './App.css'
import About from './components/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About/>}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </NoteState>
    </>
  )
}

export default App
