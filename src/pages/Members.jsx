import { useEffect, useState } from "react";
import api from "../api/axios";


function Members(){

    const [members,setMembers] = useState([]);

    const [form,setForm] = useState({
        name:"",
        email:"",
        phone:"",
        membership_type:""
    });

    const getMembers = () => {
         api.get("members/")
        .then(response=>{
            setMembers(response.data);
        })
    }
    useEffect(()=>{
        getMembers();

    },[]);

    const handleChange = (e) => {
        setForm({

            ...form,
            [e.target.name]: e.target.value

        });
    }

    const addMember = (e)=>{

        e.preventDefault();
        api.post(
            "members/",
            form
        )
        .then(()=>{

            setForm({
                name:"",
                email:"",
                phone:"",
                membership_type:""
            });

            getMembers();
        });

    };

    const updateMember = (id)=>{

        api.put(
            `members/${id}/`,
            form
        )
        .then(()=>{

            getMembers();

        });

    };
    
    const deleteMember = (id)=>{

        api.delete(`members/${id}/`)
        .then(()=>{
            getMembers();
        });
    };

    return(

        <div>

            <h2>
                Members
            </h2>

            <form onSubmit={addMember}>

                <input
                    name="name"
                    placeholder="Name"
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
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                />
                <input
                    name="membership_type"
                    placeholder="Membership"
                    value={form.membership_type}
                    onChange={handleChange}
                />

                <button>
                    Add Member
                </button>

            </form>

            <table>

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Membership</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                {
                    members.map(member=>(

                        <tr key={member.id}>

                            <td>
                                {member.name}
                            </td>

                            <td>
                                {member.email}
                            </td>

                            <td>
                                {member.membership_type}
                            </td>

                            <td>
                                <button
                                onClick={()=>deleteMember(member.id)}
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

export default Members;