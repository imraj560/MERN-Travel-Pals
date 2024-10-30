import {createContext, useReducer} from 'react';

export const ReplyContext = createContext();

export const ReplyReducer = (state, action) => {
    
    switch(action.type) {

        case 'SET_REPLY':
            return{

                reply: action.payload
            }

        case 'CREATE_REPLY':
            return{
                
                reply: [action.payload, ...state.reply]
            }

        case 'CLEAR_REPLY':
            
            return{

                reply:null
            }

            case 'DELETE_REPLY':
                return{
    
                    reply:state.reply.filter((c)=>c._id !== action.payload._id)
                }    
            
            default:
                return state;
    }
}


export const ReplyContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(ReplyReducer, {

        reply:null
    })
    
    console.log('Reply Context Fired', state);
    

    return (

        <ReplyContext.Provider value={{...state, dispatch}}>
            {children}
        </ReplyContext.Provider>
    )
}