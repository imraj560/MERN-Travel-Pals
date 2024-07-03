import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import { Login } from './pages/login/Login';
import Exercise from './pages/exercise/Exercise';
import Add from './pages/exercise/Add';
import EditForm from './pages/edit/EditForm';
import { Signup } from './pages/singup/Signup';
import { UseAuthContext } from './hooks/UseAuthContext';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';


function App() {

  const { user } = UseAuthContext();
  

  return (
   <>
      
      <BrowserRouter>
     
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={user ? <Navigate to='/' />  : <Login/>} />  
            <Route path='/exercise' element={user ? <Exercise/> : <Navigate to='/login' />} />
            <Route path='/add' element={user ? <Add/> : <Navigate to='/login' />} />
            <Route path='/editform/:id' element={user ? <EditForm/> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
