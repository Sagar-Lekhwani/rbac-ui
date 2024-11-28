import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncAddTask } from "../../store/Actions/userActions";

const AddTaskPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, user } = useSelector((state) => state.user); // Get users and user from Redux state

    const [taskDetails, setTaskDetails] = useState({
        title: "",
        description: "",
        userId: "", // ID of the selected user
        date: new Date().toISOString().split("T")[0],
        status:'pending' // Default to current date
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Redirect unauthorized users
    useEffect(() => {
        if (user?.role !== "admin" && user?.role !== "manager") {
            navigate("/not-authorized"); // Redirect if user is not admin or manager
        }
    }, [user, navigate]);

    // Handle changes to form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails((prev) => ({ ...prev, [name]: value }));
    };

    // Filter users based on current user role
    const filterUsers = () => {
        if (user?.role === "admin") {
            // Admin can assign to anyone except themselves
            return users.filter((user) => user.role !== "admin");
        } else if (user?.role === "manager") {
            // Manager can only assign tasks to employees
            return users.filter((user) => user.role === "employee");
        }
        // Employees can't assign tasks to others
        return [];
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);

        const newTask = {
            ...taskDetails,
            id: Math.floor(Math.random() * 1000000), // Generate random task ID
        };

        try {
            await dispatch(asyncAddTask(taskDetails.userId, newTask)); // Use asyncAddTask with selected user ID
            navigate("/admin"); // Navigate to admin page after successful addition
        } catch (error) {
            setError("Failed to add the task. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Add New Task</h1>
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

                {user?.role !== "employee" && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Assign to User:</label>
                        <select
                            name="userId"
                            value={taskDetails.userId}
                            onChange={handleChange}
                            className="w-full p-2 mt-2 bg-white rounded border border-gray-300"
                            disabled={loading}
                        >
                            <option value="">Select a user</option>
                            {filterUsers().map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={taskDetails.date}
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
                        {loading ? "Saving..." : "Save Task"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTaskPage;
