import {createContext, useReducer} from 'react';

export const WorkoutsContext = createContext();

export const WorkoutsReducer = (state, action) => {
    
    switch(action.type) {

        case 'SET_WORKOUTS':
            return{

                workouts: action.payload
            }

        case 'CREATE_WORKOUTS':
            return{
                
                workouts: [action.payload, ...state.workouts]
            }    
    }
}


export const WorkoutsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(WorkoutsReducer, {

        workouts:null
    })
    

    

    return (

        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}