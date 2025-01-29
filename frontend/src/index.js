import React from 'react';
import ReactDOM from 'react-dom/client';
import { PlaceContextProvider } from './context/PlaceContext';
import { AuthContextProvider } from './context/AuthContext';
import { CommentsContextProvider } from './context/CommentsContext';
import { ReplyContextProvider } from './context/ReplyContext';
import { LikesContextProvider } from './context/LikesContext';
import { GalleryContextProvider } from './context/GalleryContext';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import {APIProvider} from '@vis.gl/react-google-maps';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
       <PlaceContextProvider>
        <LikesContextProvider>
          <CommentsContextProvider>
            <ReplyContextProvider>
              <GalleryContextProvider>
              <ToastContainer/>
                  <APIProvider apiKey={'AIzaSyBi39B05xIVqJkoDR6j8OB3SaiCWDQYFGA'}>
                 <App />
                 </APIProvider>
              </GalleryContextProvider>  
            </ReplyContextProvider>
       </CommentsContextProvider>
       </LikesContextProvider>
    </PlaceContextProvider>
    </AuthContextProvider>
   
   
  </React.StrictMode>
);

