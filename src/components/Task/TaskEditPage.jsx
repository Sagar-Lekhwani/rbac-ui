import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncDeleteTask, asyncUpdateTask } from "../../store/Actions/userActions";

const TaskEditPage = () => {
    const { taskId } = useParams();
    const { tasks } = useSelector((state) => state.tasks);
    const task = tasks.find((t) => t.id === parseInt(taskId));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [taskDetails, setTaskDetails] = useState({
        title: task?.title || "",
        description: task?.description || "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle changes to form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails((prev) => ({ ...prev, [name]: value }));
    };

    // Handle task save (update) using asyncUpdateTask
    const handleSave = async () => {
        setLoading(true);
        setError(null);
        try {
            await dispatch(asyncUpdateTask(task.id, taskDetails)); // Use asyncUpdateTask here
            navigate("/"); // Navigate to admin page after successful update
        } catch (error) {
            setError("Failed to update the task. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            // Dispatch asyncDeleteTask with task ID to delete
            await dispatch(asyncDeleteTask(task.id));
            navigate("/admin"); // Navigate after deletion
        } catch (error) {
            setError("Failed to delete the task. Please try again later.");
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    // Ensure task exists before rendering the form
    useEffect(() => {
        if (!task) {
            navigate("/admin"); // Redirect to admin if task doesn't exist
        }
    }, [task, navigate]);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Edit Task</h1>
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <div className="mb-4">
                    <label className="block text-gray-700">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={taskDetails.title}
                        onChange={handleChange}
                        className="w-full p-2 mt-2 bg-white rounded border border-gray-300"
                        disabled={loading}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        value={taskDetails.description}
                        onChange={handleChange}
                        className="w-full p-2 mt-2 bg-white rounded border border-gray-300"
                        disabled={loading}
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={handleSave}
                        className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${loading ? "cursor-wait" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                        onClick={handleDelete}
                        className={`bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ${loading ? "cursor-wait" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Delete Task"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskEditPage;
