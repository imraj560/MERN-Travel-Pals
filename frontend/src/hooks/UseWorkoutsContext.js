import { WorkoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react";

export const UseWorkoutsContext = ()=>{

    const context = useContext(WorkoutsContext);

    if(!context){

        throw Error('Provider does not exist');
    }

    return context;


}