import {createContext, useReducer} from 'react';

export const PlaceContext = createContext();

export const PlaceReducer = (state, action) => {
    
    switch(action.type) {

        case 'SET_PLACE':
            return{

                place: action.payload
            }

        case 'CREATE_PLACE':
            return{
                
                place: [action.payload, ...state.place]
            }

        case 'UPDATE_PLACE':
                return {
                  ...state, 
                  place: state.place.map((single_place) =>
                    single_place._id === action.payload._id ? action.payload : single_place
                  ),
            }
            
        case 'DELETE_PLACE':
            return{

                place:state.place.filter((p)=>p._id !== action.payload._id)
            }
            
            default:
                return state;
    }
}


export const PlaceContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(PlaceReducer, {

        place:null
    })
    
  
    

    return (

        <PlaceContext.Provider value={{...state, dispatch}}>
            {children}
        </PlaceContext.Provider>
    )
}