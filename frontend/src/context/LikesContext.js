import {createContext, useReducer} from 'react';

export const LikesContext = createContext();

export const LikesReducer = (state, action) => {
    
    switch(action.type) {

        case 'SET_LIKES':
            return{

                likes: action.payload
            }

        case 'UPDATE_WORKOUT':
                return {
                  state, 
                  likes: state.likes.map((like) =>
                    like._id === action.payload._id ? action.payload : like
                  ),
            }

            
            default:
                return state;
    }
}


export const LikesContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(LikesReducer, {

        likes:null
    })
    
    console.log('Like Context Fired', state);
    

    return (

        <LikesContext.Provider value={{...state, dispatch}}>
            {children}
        </LikesContext.Provider>
    )
}