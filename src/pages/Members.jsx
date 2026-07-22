import { useEffect, useState } from "react";
import api from "../api/axios";


function Members(){

    const [members,setMembers] = useState([]);


    useEffect(()=>{

        api.get("members/")
        .then(response=>{
            setMembers(response.data);
        })

    },[]);



    return(

        <div>

            <h1>
                Members
            </h1>


            <table>

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Membership</th>
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

                        </tr>

                    ))
                }

                </tbody>


            </table>


        </div>

    )

}


export default Members;