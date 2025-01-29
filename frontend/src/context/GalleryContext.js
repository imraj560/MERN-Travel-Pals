import {createContext, useReducer} from 'react';

export const GalleryContext = createContext();

export const GalleryReducer = (state, action) => {
    
    switch(action.type) {

        case 'SET_GALLERY':
            return{

                gallery: action.payload
            }

        case 'CREATE_GALLERY':
            return{
                
                gallery: [action.payload, ...state.gallery]
            }

        case 'UPDATE_GALLERY':
                return {
                  ...state, 
                  place: state.gallery.map((single_gallery) =>
                    single_gallery._id === action.payload._id ? action.payload : single_gallery
                  ),
            }
            
        case 'DELETE_GALLERY':
            return{

                gallery:state.gallery.filter((p)=>p._id !== action.payload._id)
            }
            
            default:
                return state;
    }
}


export const GalleryContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(GalleryReducer, {

        gallery:null
    })
    
  
    

    return (

        <GalleryContext.Provider value={{...state, dispatch}}>
            {children}
        </GalleryContext.Provider>
    )
}