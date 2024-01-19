import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './includes/header/Header';
import Exercise from './pages/exercise/Exercise';
import './App.css';


function App() {
  return (
   <>
      
      <BrowserRouter>
      <Header />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/exercise' element={<Exercise/>} />
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
