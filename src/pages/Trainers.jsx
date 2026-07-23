import { useEffect, useState } from "react";
import api from "../api/axios";


function Trainers(){

    const [trainers,setTrainers] = useState([]);
    
    const [form,setForm] = useState({
        name:"",
        email:"",
        specialization:"",
        experience:""
    });

    const getTrainers = ()=>{

        api.get("trainers/")
        .then(response=>{
            setTrainers(response.data);
        });
    };

    useEffect(()=>{
        getTrainers();
    },[]);

    const handleChange = (e)=>{

        setForm({

            ...form,
            [e.target.name]: e.target.value
        });
    };

    const addTrainer = (e)=>{

        e.preventDefault();
        api.post(
            "trainers/",
            form
        )
        .then(()=>{

            setForm({
                name:"",
                email:"",
                specialization:"",
                experience:""
            });

            getTrainers();
        });
    };

    const deleteTrainer = (id)=>{

        api.delete(`trainers/${id}/`)
        .then(()=>{
            getTrainers();
        });
    };

    return(

        <div>

            <h1>
                Trainers
            </h1>

            <form onSubmit={addTrainer}>

                <input
                    name="name"
                    placeholder="Trainer Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    name="specialization"
                    placeholder="Specialization"
                    value={form.specialization}
                    onChange={handleChange}
                />

                <input
                    name="experience"
                    placeholder="Experience (years)"
                    value={form.experience}
                    onChange={handleChange}
                />

                <button>
                    Add Trainer
                </button>
            </form>

            <table>

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Specialization</th>
                        <th>Experience</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                {
                    trainers.map(trainer=>(

                        <tr key={trainer.id}>

                            <td>
                                {trainer.name}
                            </td>

                            <td>
                                {trainer.email}
                            </td>

                            <td>
                                {trainer.specialization}
                            </td>

                            <td>
                                {trainer.experience} years
                            </td>

                            <td>
                                <button
                                onClick={()=>deleteTrainer(trainer.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>

                    ))
                }
                </tbody>
            </table>

        </div>

    )

}


export default Trainers;