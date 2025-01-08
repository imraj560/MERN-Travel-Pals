import { PlaceContext } from "../context/PlaceContext";
import { useContext } from "react";

export const UsePlaceContext = ()=>{

    const context = useContext(PlaceContext);

    if(!context){

        throw Error('Provider does not exist');
    }

    return context;


}