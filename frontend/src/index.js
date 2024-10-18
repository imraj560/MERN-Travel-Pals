import React from 'react';
import ReactDOM from 'react-dom/client';
import { WorkoutsContextProvider } from './context/WorkoutsContext';
import { AuthContextProvider } from './context/AuthContext';
import { CommentsContextProvider } from './context/CommentsContext';
import { LikesContextProvider } from './context/LikesContext';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
       <WorkoutsContextProvider>
        <LikesContextProvider>
          <CommentsContextProvider>
          <ToastContainer/>
            <App />
       </CommentsContextProvider>
       </LikesContextProvider>
    </WorkoutsContextProvider>
    </AuthContextProvider>
   
   
  </React.StrictMode>
);

