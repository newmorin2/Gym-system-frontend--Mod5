import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Trainers from "./pages/Trainers";
import Exercises from "./pages/Exercises";


function App(){

    return(
        <>
            <Navbar>

            </Navbar>
        <Routes>

            <Route 
                path="/" 
                element={<Dashboard />}
            />

            <Route 
                path="/members" 
                element={<Members />}
            />

            <Route 
                path="/trainers" 
                element={<Trainers />}
            />

            <Route 
                path="/exercises" 
                element={<Exercises />}
            />

        </Routes>
        </>

    );

}


export default App;