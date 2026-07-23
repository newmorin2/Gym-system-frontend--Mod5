import {useState} from "react";
import api from "../api/axios";

function Login(){

    const [form,setForm]=useState({
        username:"",
        password:""
    });

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });

    };

    const login=(e)=>{

        e.preventDefault();
        api.get("csrf/")
    .then(()=>{

        api.post(
            "login/",
            form
        )
        .then(()=>{
         window.location.href="/"
        });

        });
    };


    return(

        <div>
            <h1>
                Login
            </h1>

            <form onSubmit={login}>

                <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                />

                <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                />

                <button>
                    Login
                </button>

            </form>
        </div>
    );
}


export default Login;