import { CommentsContext } from "../context/CommentsContext";
import { useContext } from "react";

export const UseCommentsContext = ()=>{

    const context = useContext(CommentsContext);

    if(!context){

        throw Error('Provider does not exist');
    }

    return context;


}