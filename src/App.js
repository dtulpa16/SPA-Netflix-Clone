import { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import MoviePage from './Pages/MoviePage';

function App() {
  const [searchTerm, setsearchTerm] = useState()
  const [toggle,setToggle] = useState(false)
 
  return (
    <div className="bg-[#141414] h-screen text-white">
      <NavBar setsearchTerm={setsearchTerm} setToggle={setToggle} toggle={toggle}/>
      <MoviePage searchTerm={searchTerm} toggle={toggle}/>
    </div>
  );
}

export default App;
