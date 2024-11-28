import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncAddUser, asyncDeleteUser } from "../../store/Actions/userActions";
import { updateTask } from "../../store/Reducers/taskSlice"; // Assuming tasks are managed in Redux

const AdminDashboard = () => {
    const { users, user } = useSelector((state) => state.user);
    const { tasks } = useSelector((state) => state.tasks); // Assuming tasks are managed in Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "employee",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // State for storing the selected task status filter
    const [taskStatusFilter, setTaskStatusFilter] = useState(null);

    const handleAddUser = () => {
        setShowForm(true); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (newUser.name && newUser.email && newUser.role && newUser.password) {
                const userToAdd = {
                    id: Math.floor(Math.random() * 1000000),
                    ...newUser,
                };
                await dispatch(asyncAddUser(userToAdd)); 
                setShowForm(false); 
                setNewUser({ name: "", email: "", role: "employee", password: "" }); 
            } else {
                alert("Please fill in all fields!");
            }
        } catch (error) {
            setError("Failed to add user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await dispatch(asyncDeleteUser(id)); 
        } catch (error) {
            setError("Failed to delete user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = (e, userId) => {
        if (e.target.tagName === "BUTTON") return;
        navigate(`/user-details/${userId}`);
    };

    const handleTaskStatusChange = (taskId, status) => {
        dispatch(updateTask({ taskId, updatedTask: { status } }));
        // After updating, set the filter based on the clicked status
        setTaskStatusFilter(status);
    };

    const filteredUsers = users.filter((u) => u.id !== user.id);

    // Get tasks assigned to the current employee
    const employeeTasks = tasks.filter((task) => user.tasks.includes(task.id));

    // Filter tasks based on the selected status filter
    const filteredTasks = taskStatusFilter
        ? employeeTasks.filter((task) => task.status === taskStatusFilter)
        : employeeTasks;

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Dashboard</h1>

                {user.role === "admin" ? (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <button
                                onClick={handleAddUser}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Add New User
                            </button>
                            <p className="text-gray-600">
                                Logged in as: <span className="font-semibold">{user.name}</span>
                            </p>
                        </div>

                        {/* Add User Form */}
                        {showForm && (
                            <form
                                onSubmit={handleFormSubmit}
                                className="bg-gray-100 p-4 rounded-lg shadow-md mb-6"
                            >
                                <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                                {error && <p className="text-red-600 mb-4">{error}</p>}
                                <div className="mb-4">
                                    <label className="block text-gray-700">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newUser.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newUser.email}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Role:</label>
                                    <select
                                        name="role"
                                        value={newUser.role}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                        required
                                    >
                                        <option value="employee">Employee</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={newUser.password}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-4 hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Users List */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-left border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border border-gray-200">Name</th>
                                        <th className="px-4 py-2 border border-gray-200">Email</th>
                                        <th className="px-4 py-2 border border-gray-200">Role</th>
                                        <th className="px-4 py-2 border border-gray-200">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((u) => (
                                        <tr
                                            key={u.id}
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={(e) => handleRowClick(e, u.id)}
                                        >
                                            <td className="px-4 py-2 border border-gray-200">{u.name}</td>
                                            <td className="px-4 py-2 border border-gray-200">{u.email}</td>
                                            <td className="px-4 py-2 border border-gray-200">{u.role}</td>
                                            <td className="px-4 py-2 border border-gray-200">
                                                <button
                                                    onClick={() => handleDeleteUser(u.id)}
                                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                    disabled={loading}
                                                >
                                                    {loading ? "Deleting..." : "Delete"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : user.role === "manager" ? (
                    <div>
                        <h2 className="text-xl font-semibold">Manager Dashboard</h2>
                        <p className="text-gray-600">You have limited access as a manager.</p>
                        {/* Show employees list but no delete button */}
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-left border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border border-gray-200">Name</th>
                                        <th className="px-4 py-2 border border-gray-200">Email</th>
                                        <th className="px-4 py-2 border border-gray-200">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((u) => (
                                        <tr key={u.id} className="hover:bg-gray-50 cursor-pointer">
                                            <td className="px-4 py-2 border border-gray-200">{u.name}</td>
                                            <td className="px-4 py-2 border border-gray-200">{u.email}</td>
                                            <td className="px-4 py-2 border border-gray-200">{u.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : user.role === "employee" ? (
                    <div>
                        <h2 className="text-xl font-semibold">Employee Dashboard</h2>
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={() => setTaskStatusFilter("completed")}
                                className={`px-4 py-2 rounded-lg ${taskStatusFilter === "completed" ? "bg-green-500" : "bg-gray-200"} hover:bg-green-600`}
                            >
                                Show Completed Tasks
                            </button>
                            <button
                                onClick={() => setTaskStatusFilter("failed")}
                                className={`px-4 py-2 rounded-lg ${taskStatusFilter === "failed" ? "bg-red-500" : "bg-gray-200"} hover:bg-red-600`}
                            >
                                Show Failed Tasks
                            </button>
                            <button
                                onClick={() => setTaskStatusFilter("pending")}
                                className={`px-4 py-2 rounded-lg ${taskStatusFilter === "pending" ? "bg-yellow-500" : "bg-gray-200"} hover:bg-yellow-600`}
                            >
                                Show Pending Tasks
                            </button>
                            <button
                                onClick={() => setTaskStatusFilter(null)}
                                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
                            >
                                Show All Tasks
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-left border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border border-gray-200">Task Name</th>
                                        <th className="px-4 py-2 border border-gray-200">Status</th>
                                        <th className="px-4 py-2 border border-gray-200">Task Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTasks.map((task) => (
                                        <tr key={task.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border border-gray-200">{task.title}</td>
                                            <td className="px-4 py-2 border border-gray-200">
                                                <div className="flex space-x-2">
                                                    {task.status === "pending" && (
                                                        <>
                                                        <button
                                                            onClick={() => handleTaskStatusChange(task.id, "completed")}
                                                            className="bg-green-500 text-white px-2 py-1 rounded"
                                                        >
                                                            Mark Completed
                                                        </button>
                                                        <button
                                                        onClick={() => handleTaskStatusChange(task.id, "failed")}
                                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Mark Failed
                                                    </button></>
                                                    )}
                                                    {task.status === "completed" && (
                                                        <span className="bg-green-500 text-white px-2 py-1 rounded">Completed</span>
                                                    )}
                                                    {task.status === "failed" && (
                                                        <span className="bg-red-500 text-white px-2 py-1 rounded">Failed</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 border border-gray-200">{task.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default AdminDashboard;
