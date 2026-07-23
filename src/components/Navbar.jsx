import { Link } from "react-router-dom";


function Navbar(){

    return(

        <nav>

            <Link to="/">
                Dashboard
            </Link>

            <Link to="/members">
                Members
            </Link>

            <Link to="/trainers">
                Trainers
            </Link>

            <Link to="/exercises">
                Exercises
            </Link>

            <Link to="/workout-plans">
                Workout Plans
            </Link>

             <Link to="/sessions">
                Sessions
            </Link>
        </nav>

    )

}


export default Navbar;