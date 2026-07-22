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

        </nav>

    )

}


export default Navbar;