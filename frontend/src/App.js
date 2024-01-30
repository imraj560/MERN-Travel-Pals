import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';

import Exercise from './pages/exercise/Exercise';
import Add from './pages/exercise/Add';
import EditForm from './pages/edit/EditForm';
import { Signup } from './pages/singup/Signup';
import './App.css';


function App() {
  return (
   <>
      
      <BrowserRouter>
     
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<Signup/>} />  
            <Route path='/exercise' element={<Exercise/>} />
            <Route path='/add' element={<Add/>} />
            <Route path='/editform/:id' element={<EditForm/>} />
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
