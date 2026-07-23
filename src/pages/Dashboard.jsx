import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard(){

    const [stats,setStats] = useState({});

    useEffect(()=>{
        api.get("dashboard/")
        .then(response=>{
            setStats(response.data);
        });

    },[]);

    return(

    <div>

        <h2>
             Gym Dashboard
        </h2>

        <div className="dashboard">
        <div className="card">
            <h3>
            Members
            </h3>
            <p>
            {stats.members}
            </p>
        </div>

        <div className="card">
            <h3>
            Trainers
            </h3>
            <p>
            {stats.trainers}
            </p>
        </div>

        <div className="card">
            <h3>
            Exercises
            </h3>
            <p>
            {stats.exercises}
            </p>
        </div>


        <div className="card">
            <h3>
            Workout Plans
            </h3>
            <p>
            {stats.workout_plans}
            </p>
        </div>

        <div className="card">
            <h3>
            Sessions
            </h3>
            <p>
            {stats.sessions}
            </p>
        </div>

    </div>

    </div>
)
}

export default Dashboard;