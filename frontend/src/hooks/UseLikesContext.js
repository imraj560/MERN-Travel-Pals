import { LikesContext } from "../context/LikesContext";
import { useContext } from "react";

export const UseLikesContext = ()=>{

    const context = useContext(LikesContext);

    if(!context){

        throw Error('Likes Provider does not exist');
    }

    return context;


}