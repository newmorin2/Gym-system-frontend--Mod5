import { useEffect, useState } from "react";
import api from "../api/axios";

function WorkoutPlans() {

    const [plans, setPlans] = useState([]);
    const [exercises, setExercises] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        difficulty: "",
        exercise_ids: []
    });

    useEffect(() => {
        getWorkoutPlans();
        getExercises();
    }, []);

    const getWorkoutPlans = () => {
        api.get("workout-plans/")
        .then(response => {
            setPlans(response.data);
        });
    };

    const getExercises = () => {
        api.get("exercises/")
        .then(response => {
            setExercises(response.data);
        });
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleExerciseChange = (e) => {

        const options = [...e.target.selectedOptions];

        const selectedExercises = options.map(option =>
            Number(option.value)
        );

        setForm({
            ...form,
            exercise_ids: selectedExercises
        });

    };

    const addWorkoutPlan = (e) => {

        e.preventDefault();

        api.post("workout-plans/", form)
        .then(() => {

            setForm({
                title: "",
                description: "",
                difficulty: "",
                exercises: []
            });

            getWorkoutPlans();

        });

    };

    const deleteWorkoutPlan = (id) => {

        api.delete(`workout-plans/${id}/`)
        .then(() => {
            getWorkoutPlans();
        });

    };

    return (
        <div>

            <h1>Workout Plans</h1>

            <form onSubmit={addWorkoutPlan}>
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                />
                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    name="difficulty"
                    placeholder="Difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                />
                <br /><br />

                <label>Select Exercises</label>
                <br />

                <select
                    multiple
                    onChange={handleExerciseChange}
                >
                    {
                        exercises.map(exercise => (

                            <option
                                key={exercise.id}
                                value={exercise.id}
                            >
                                {exercise.name}
                            </option>
                        ))
                    }

                </select>
                <br /><br />

                <button>Create Workout Plan</button>

            </form>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Difficulty</th>
                        <th>Exercises</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        plans.map(plan => (
                            <tr key={plan.id}>

                                <td>{plan.title}</td>

                                <td>{plan.description}</td>

                                <td>{plan.difficulty}</td>

                                <td>
                                    {plan.exercises
                                    .map(exercise => exercise.name)
                                    .join(", ")
                                    }
                                </td>

                                <td>
                                    <button
                                        onClick={() =>
                                            deleteWorkoutPlan(plan.id)
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
    )
}

export default WorkoutPlans;