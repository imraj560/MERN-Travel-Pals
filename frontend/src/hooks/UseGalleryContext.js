import { GalleryContext } from "../context/GalleryContext";
import { useContext } from "react";

export const UseGalleryContext = ()=>{

    const context = useContext(GalleryContext);

    if(!context){

        throw Error('Provider does not exist');
    }

    return context;


}