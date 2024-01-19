import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './includes/header/Header';
import Exercise from './pages/exercise/Exercise';
import Add from './pages/exercise/Add';
import './App.css';


function App() {
  return (
   <>
      
      <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/exercise' element={<Exercise/>} />
            <Route path='/add' element={<Add/>} />
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
