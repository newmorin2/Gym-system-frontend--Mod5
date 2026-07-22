import { useEffect } from "react";
import api from "./api/axios";


function App(){

    useEffect(()=>{

        api.get("members/")
        .then(response=>{
            console.log(response.data);
        })
        .catch(error=>{
            console.log(error);
        })

    },[]);


    return(
        <h1>
            Gym Management System
        </h1>
    )
}


export default App;