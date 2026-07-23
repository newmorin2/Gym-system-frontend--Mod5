import { useEffect, useState } from "react";
import api from "../api/axios";

function Sessions() {

    const [sessions,setSessions] = useState([]);
    const [members,setMembers] = useState([]);
    const [trainers,setTrainers] = useState([]);
    const [form,setForm] = useState({
        member:"",
        trainer:"",
        date:"",
        status:""

    });

    useEffect(()=>{
        getSessions();
        getMembers();
        getTrainers();

    },[]);

    const getSessions = ()=>{

        api.get("sessions/")
        .then(response=>{
            setSessions(response.data);
        });

    };

    const getMembers = ()=>{

        api.get("members/")
        .then(response=>{
            setMembers(response.data);
        });

    };

    const getTrainers = ()=>{
        api.get("trainers/")
        .then(response=>{
            setTrainers(response.data);
        });

    };

    const handleChange=(e)=>{

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const addSession=(e)=>{

        e.preventDefault();

        api.post(
            "sessions/",
            form
        )
        .then(()=>{

            setForm({
                member:"",
                trainer:"",
                date:"",
                status:""
            });

            getSessions();
        });
    };

    const deleteSession=(id)=>{

        api.delete(`sessions/${id}/`)
        .then(()=>{
            getSessions();
        });
    };

    return (
        <div>

            <h1>
                Sessions
            </h1>

            <form onSubmit={addSession}>

                <select
                    name="member"
                    value={form.member}
                    onChange={handleChange}
                >

                    <option value="">
                        Select Member
                    </option>

                    {
                        members.map(member=>(
                            <option
                                key={member.id}
                                value={member.id}
                            >
                                {member.name}
                            </option>
                        ))
                    }

                </select>

                <br/><br/>

                <select
                    name="trainer"
                    value={form.trainer}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Trainer
                    </option>

                    {
                        trainers.map(trainer=>(

                            <option
                                key={trainer.id}
                                value={trainer.id}
                            >
                                {trainer.name}
                            </option>
                        ))
                    }

                </select>

                <br/><br/>

                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}

                />
                <br/><br/>

                <input
                    name="status"
                    placeholder="Status"
                    value={form.status}
                    onChange={handleChange}

                />
                <br/><br/>

                <button>
                    Create Session
                </button>

            </form>

            <hr/>

            <table>

                <thead>
                    <tr>
                        <th>
                            Member ID
                        </th>

                        <th>
                            Trainer ID
                        </th>

                        <th>
                            Date
                        </th>

                        <th>
                            Status
                        </th>

                        <th>
                            Action
                        </th>
                    </tr>

                </thead>

                <tbody>

                {
                    sessions.map(session=>(

                        <tr key={session.id}>

                            <td>
                                {session.member}
                            </td>

                            <td>
                                {session.trainer}
                            </td>

                            <td>
                                {session.date}
                            </td>

                            <td>
                                {session.status}
                            </td>

                            <td>
                                <button
                                    onClick={()=>
                                        deleteSession(session.id)
                                    }
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

    );
}

export default Sessions;