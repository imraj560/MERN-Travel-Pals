import { ReplyContext } from "../context/ReplyContext";
import { useContext } from "react";

export const UseReplyContext = ()=>{

    const context = useContext(ReplyContext);

    if(!context){

        throw Error('Provider does not exist');
    }

    return context;


}