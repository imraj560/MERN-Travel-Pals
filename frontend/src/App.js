import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Find from './pages/find/Find';
import { Login } from './pages/login/Login';
import Place from './pages/place/Place';
import Add from './pages/place/Add';
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
            <Route path='/find' element={<Find/>} />
            <Route path='/signup' element={user ? <Navigate to='/' />  : <Signup/>} />
            <Route path='/login' element={user ? <Navigate to='/' />  : <Login/>} />  
            <Route path='/place' element={user ? <Place/> : <Navigate to='/login' />} />
            <Route path='/add' element={user ? <Add/> : <Navigate to='/login' />} />
            <Route path='/editform/:id' element={user ? <EditForm/> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
