import { useEffect, useState } from "react";
import api from "../api/axios";

function Exercises(){

    const [exercises, setExercises] = useState([]);

    const [form, setForm] = useState({
        name: "",
        category: "",
        equipment_needed: false
    });

    const getExercises = () => {
        api.get("exercises/")
        .then(response => {
            setExercises(response.data);
        });
    };

    useEffect(() => {
        getExercises();
    }, []);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const addExercise = (e) => {

        e.preventDefault();

        api.post("exercises/", form)
        .then(() => {

            setForm({
                name: "",
                category: "",
                equipment_needed: false
            });

            getExercises();
        });
    };

    const deleteExercise = (id) => {

        api.delete(`exercises/${id}/`)
        .then(() => {
            getExercises();
        });
    };

    return(

        <div>

            <h2>Exercises</h2>
            <form onSubmit={addExercise}>

                <input
                    name="name"
                    placeholder="Exercise Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                />

                <label>

                    Equipment Needed

                    <input
                        type="checkbox"
                        name="equipment_needed"
                        checked={form.equipment_needed}
                        onChange={handleChange}
                    />

                </label>
                <button>Add Exercise</button>
            </form>

            <table>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Equipment</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {exercises.map(exercise => (

                        <tr key={exercise.id}>

                            <td>{exercise.name}</td>

                            <td>{exercise.category}</td>

                            <td>
                                {exercise.equipment_needed ? "Yes" : "No"}
                            </td>

                            <td>
                                <button
                                    onClick={() => deleteExercise(exercise.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )

}


export default Exercises;